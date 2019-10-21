/*
* @Author: Carrey Wang
* @Date:   2019-10-20 16:04:30
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:11:31
*/

const jwt = require('jsonwebtoken');
// 定义签名
const secret = 'chattingroom';
// 返回body
const setResponse = (ctx, state, msg = '',data = '', code = 200)=> {
    ctx.body = JSON.stringify({
        code,
        state,
        msg,
        data
    })
}
// 生成token
const setToken = username => {
    return jwt.sign({
        name: username
    }, secret, {
        expiresIn: '7d' //秒到期时间
    });
}

module.exports = {
    setResponse,
    setToken
}