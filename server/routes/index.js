/*
* @Author: Carrey Wang
* @Date:   2019-10-19 13:52:54
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:11:48
*/
const { setResponse, setToken } = require('../utils/util');
const router = require('koa-router')();
const fs = require('fs');
/*通过用户模型类操作数据库*/
let User = require('../models/user.js');

router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  /*判断用户名是否存在*/
  const serchInfo = await User.findOne({
    username
  });
  if (serchInfo) {
    setResponse(ctx, 'fail', '用户名已存在');
  } else {
    /*用户名不存在,保存数据库*/
    let user = new User({
      username,
      password
    });
    const saveInfo = user.save();
    /*判断是否保存成功*/
    if (saveInfo) {
      setResponse(ctx, 'success', '注册成功');
    } else {
      setResponse(ctx, 'fail', '注册失败');
    }
  }
})

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const serchInfo = await User.findOne({
    username
  });
  if (serchInfo) {
    if (serchInfo.password === password) {
      const authToken = setToken(username);
      setResponse(ctx, 'success', '登录成功', {
        token: authToken,
        avatar: serchInfo.avatar,
        username: serchInfo.username
      });
    } else {
      setResponse(ctx, 'fail', '密码不正确');
    }
  } else {
    setResponse(ctx, 'fail', '用户名不存在');
  }
});
//获取当前在线用户
router.get('/getOnlineUserList', async (ctx, next) => {
  setResponse(ctx, 'success', '在线用户获取成功', ctx.onlineUserList);
})
//上传头像
router.post('/modifyUserAvatar', async (ctx, next) => {
  const { username } = ctx.request.body;
  // 获取上传文件
  const file = ctx.request.files.file;
  const serchInfo = await User.findOne({
    username
  });
  //判断用户是否存在
  if (serchInfo) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    const ext = file.name.split('.').pop();
    let filePath = path.join(__dirname, 'avatar/user/') + `${username + '.' + ext}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    setResponse(ctx, 'success', '头像上传成功');
  } else {
    setResponse(ctx, 'fail', '用户名不存在');
  }
});
module.exports = router;