/*
 * @Author: Carrey Wang
 * @Date: 2019-10-22 18:50:37
 * @LastEditors: Carrey Wang
 * @LastEditTime: 2019-10-22 18:52:05
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

export {
    setCookie,
    getCookie,
    delCookie
}