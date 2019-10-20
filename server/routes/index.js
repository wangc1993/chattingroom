/*
* @Author: Carrey Wang
* @Date:   2019-10-19 13:52:54
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:11:48
*/
const { responseMsg } = require('../utils/util');
const router = require('koa-router')();

router.get('/register', async (ctx, next) => {
    ctx.body = responseMsg('success','');
})

router.get('/login', async (ctx, next) => {
  ctx.body = responseMsg('success',ctx.request.query.name,201);
});

module.exports = router;