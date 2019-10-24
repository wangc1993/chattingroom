/*
 * @Author: Carrey Wang
 * @Date: 2019-10-22 18:50:37
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-10-24 17:10:24
 */
import Cookies from 'js-cookie';
/*设置cookie*/
const setCookie = (key, value) => {
    Cookies.set(key, value, {
        expires: 7
    });
}
/*获取cookie*/
const getCookie = (key) => {
    return Cookies.get(key);
}

/*删除cookie*/
const delCookie = (key) => {
    Cookies.remove(key);
}

//在线用户排序-当前用户置顶
const sortToTop = (userList) => {
    let index = 0;
    userList.forEach((user, i) => {
        if (user.username === getCookie('username')) {
            index = i;
        }
    });
    userList.unshift(userList.splice(index, 1)[0]);
    return userList;
}

export {
    setCookie,
    getCookie,
    delCookie,
    sortToTop
}