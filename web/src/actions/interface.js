/*
* @Author: Carrey Wang
* @Date:   2019-10-16 21:48:23
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-16 22:30:34
*/

const baseURL = 'http://10.254.2.95:7002/mock/450';

const register = (username,password) => {
    return fetch(`${baseURL}/register`,{
        method: 'POST',
        header: {
            'Content-Type':'application/json;charset=utf-8',
        },
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
        header: {
            'Content-Type':'application/json;charset=utf-8',
        },
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

export {
    register,
    login
}