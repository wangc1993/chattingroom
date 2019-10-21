/*
* @Author: Carrey Wang
* @Date:   2019-10-19 13:29:57
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:05:34
*/

const Koa = require('koa');
const server = new Koa();
const bodyParser = require('koa-bodyparser');
server.use(bodyParser());
/*加载数据库模块*/
let mongoose = require('mongoose');
//路由权限控制
const koaJwt = require('koa-jwt') 
// 跨域设置 
// server.use(convert(cors));
server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});
// 由于做了跨域,所以前端用post请求后台接口的时候,会有预检,及时options请求,解决的方法,在nodejs里对options的请求直接返回200
server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});
const index = require('./routes/index');
//校验请求的方法
server.use(index.routes(), index.allowedMethods())


// server.use(async ctx => {
//     ctx.body = {www: 'hello world'}
// })

/*连接数据库*/
mongoose.connect('mongodb://localhost:27017/chattingroom', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log("数据库连接失败！");
    } else {
        console.log("数据库连接成功！");
        /*警告：app.listen（80）在这里socket不起作用！*/
        // http.listen(8081);
        server.listen(3005, () => {
            console.log('服务启动在3005端口！')
        })
    }
});