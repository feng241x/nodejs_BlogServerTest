const mysql = require('mysql');

const loginCheck = (username, password) => {
    if (username === 'zhangsan', password === 123) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    loginCheck
}