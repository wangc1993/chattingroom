/*
 * @Author: Carrey Wang
 * @Date: 2019-10-21 16:51:59
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-10-21 16:52:37
 */

let mongoose = require('mongoose');
/*用户模型类*/
module.exports = mongoose.model('user', require('../schemas/user.js'));