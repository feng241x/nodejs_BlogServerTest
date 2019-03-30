const { SuccessModel, ErrorModel } = require('../model/resModel');
const { loginCheck } = require('../controller/user');

const serverUserHandle = (req, res) => {
    const method = req.method;

    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body; 
        const result = loginCheck(username, password);
        if (result) {
            return new SuccessModel(result, '登录成功');
        } else {
            return new ErrorModel(result, '登录失败,请重新登录');
        }
    } 
}

module.exports = serverUserHandle