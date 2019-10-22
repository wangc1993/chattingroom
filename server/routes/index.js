/*
* @Author: Carrey Wang
* @Date:   2019-10-19 13:52:54
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:11:48
*/
const { setResponse, setToken } = require('../utils/util');
const router = require('koa-router')();
/*通过用户模型类操作数据库*/
let User = require('../models/user.js');

router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  /*判断用户名是否存在*/
  const serchInfo = await User.findOne({
    username
  });
  if(serchInfo){
    setResponse(ctx, 'fail', '用户名已存在');
  }else{
    /*用户名不存在,保存数据库*/
    let user = new User({
      username,
      password
    });
    const saveInfo = user.save();
    /*判断是否保存成功*/
    if(saveInfo){
      setResponse(ctx, 'success', '注册成功');
    }else{
      setResponse(ctx, 'fail', '注册失败');
    }
  }
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const serchInfo = await User.findOne({
    username
  });
  if(serchInfo){
    if(serchInfo.password === password){
      const authToken = setToken(username);
      setResponse(ctx, 'success', '登录成功', {token: authToken});
    }else{
      setResponse(ctx, 'fail', '密码不正确');
    }
  }else{
    setResponse(ctx, 'fail', '用户名不存在');
  }
});

module.exports = router;