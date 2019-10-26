/*
* @Author: Carrey Wang
* @Date:   2019-10-16 21:48:23
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-25 22:49:00
*/
import { getCookie } from '../utils/util';
// const baseURL = 'http://10.254.2.95:7002/mock/450';
const baseURL = 'http://localhost:3005';

const register = (username,password) => {
    return fetch(`${baseURL}/register`,{
        method: 'POST',
        headers: new Headers({
            'Content-Type':'application/json;charset=utf-8',
        }),
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => {
        return res.json();
    }).then(json => {
        return json;
    }).catch(e => {
        throw new Error(e.message);
    })
}

const login = (username,password) => {
    return fetch(`${baseURL}/login`,{
        method: 'POST',
        headers: new Headers({
            'Content-Type':'application/json;charset=utf-8',
        }),
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => {
        return res.json();
    }).then(json => {
        return json;
    }).catch(e => {
        throw new Error(e.message);
    })
}

const getOnlineUserList = () => {
    return fetch(`${baseURL}/getOnlineUserList`,{
        method: 'GET',
        headers: new Headers({
            'Content-Type':'application/json;charset=utf-8',
            'token': getCookie('token') || ''
        })
    }).then(res => {
        return res.json();
    }).then(json => {
        return json;
    }).catch(e => {
        throw new Error(e.message);
    })
}

const uploadAvatar = (file) => {
    return fetch(`${baseURL}/modifyUserAvatar`,{
        method: 'POST',
        headers: new Headers({
            'token': getCookie('token') || ''
        }),
        body: file
    }).then(res => {
        return res.json();
    }).then(json => {
        return json;
    }).catch(e => {
        throw new Error(e.message);
    })
}

export {
    register,
    login,
    getOnlineUserList,
    uploadAvatar
}