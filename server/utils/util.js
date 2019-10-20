/*
* @Author: Carrey Wang
* @Date:   2019-10-20 16:04:30
* @Last Modified by:   Carrey Wang
* @Last Modified time: 2019-10-20 16:11:31
*/

const responseMsg = (state, msg = '', code = 200)=> {
    return {
        code,
        state,
        msg
    }
}

module.exports = {
    responseMsg
}