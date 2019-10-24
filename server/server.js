/*
* @Author: Carrey Wang
* @Date:   2019-10-19 13:29:57
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:05:34
*/
const R = require('ramda');
const Koa = require('koa');
const server = new Koa();
const bodyParser = require('koa-bodyparser');
server.use(bodyParser());
/*加载数据库模块*/
let mongoose = require('mongoose');
//路由权限控制
const koaJwt = require('koa-jwt')
// 定义签名
const jwtSecret = 'chattingroom';
/*socket.io公式*/
let http = require('http').createServer(server);
let io = require('socket.io')(http);

// 跨域设置 
// 由于做了跨域,所以前端用post请求后台接口的时候,会有预检,及时options请求,解决的方法,在nodejs里对options的请求直接返回200
server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Token, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

/*设置路由中间件，静态页面。将静态资源文件所在的目录作为参数传递给static 中间件就可以提供静态资源文件的访问了,就像apache里的www下的文件*/
const static = require('koa-static');
server.use(static(__dirname + '/avatar'));

//权限错误处理
server.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    })
})
//jwt验证(需放在路由前)
server.use(koaJwt({
    secret: jwtSecret,
    getToken: function fromHeader(ctx) {
        if (ctx.request.header.token) {
            return ctx.request.header.token;
        }
        return null;
    }
}).unless({
    path: [/\/register/, /\/login/]
}))

//路由引入
const index = require('./routes/index');
//校验请求的方法
server.use(index.routes(), index.allowedMethods())

//在线用户,koa.context是从其创建ctx的原型。您可以通过编辑koa.context为ctx添加其他属性。
server.context.onlineUserList = [];
// 监听连接事件
io.on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('userLogin', data => {
        const equalUser = R.filter((user) => {
            return user.username === data.username
        }, server.context.onlineUserList);
        if (equalUser.length < 1) {
            server.context.onlineUserList.push(data);
            socket.emit("onlineUserChange", server.context.onlineUserList);
        }
    })
});

/*连接数据库*/
mongoose.connect('mongodb://localhost:27017/chattingroom', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log("数据库连接失败！");
    } else {
        console.log("数据库连接成功！");
        /*警告：server.listen在这里socket不起作用！会报404*/
        // http.listen(8081);
        server.listen(3005, () => {
            console.log('服务启动在3005端口！')
        })
        http.listen(3006, () => {
            console.log('websocket启动在3006端口！')
        })
    }
});