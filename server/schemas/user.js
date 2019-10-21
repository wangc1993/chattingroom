/*
 * @Author: Carrey Wang
 * @Date: 2019-10-21 16:47:30
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-10-21 16:50:49
 */

 /*定义用户的数据结构（表）*/
let mongoose = require('mongoose');
let moment = require('moment');

module.exports = new mongoose.Schema({
    username: String,
    password: String,
    avatar: {
        type: String,
        default: ''
    },
    addTime: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
});