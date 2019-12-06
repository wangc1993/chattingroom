/*
 * @Author: Carrey Wang
 * @Date: 2019-10-21 16:47:30
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-10-21 16:50:49
 */

 /*定义聊天信息的数据结构（表）*/
const mongoose = require('mongoose');
const moment = require('moment');

module.exports = new mongoose.Schema({
    username: String,
    info: {
        type: String,
        default: ''
    },
    infoType: Number,//信息类型（信息1、图片2）
    picAddress:  {
        type: String,
        default: ''
    },
    addTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
});