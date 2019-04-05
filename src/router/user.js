const { SuccessModel, ErrorModel } = require('../model/resModel');
const { login } = require('../controller/user');

const serverUserHandle = (req, res) => {
    const method = req.method;

    if (method === 'GET' && req.path === '/api/user/login') {
        // const { username, password } = req.body; 
        const { username, password } = req.query; 
        const result = login(username, password);
        return result.then( data => {
            if (data.username) {
                // 设置 session
                req.session.username = data.username;
                req.session.realname = data.realname;
                return new SuccessModel(data, '登录成功');
            } else {
                return new ErrorModel(data, '登录失败,请重新登录');
            }
        })
    } 
}

module.exports = serverUserHandle