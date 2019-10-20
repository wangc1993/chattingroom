/*
* @Author: Carrey Wang
* @Date:   2019-10-19 13:29:57
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:05:34
*/

const Koa = require('koa');
const server = new Koa();
const index = require('./routes/index');
//校验请求的方法
server.use(index.routes(), index.allowedMethods())

// server.use(async ctx => {
//     ctx.body = {www: 'hello world'}
// })

server.listen(3005, ()=>{
    console.log('服务启动在3005端口！')
})