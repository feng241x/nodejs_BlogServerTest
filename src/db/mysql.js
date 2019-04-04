// 获取 mysql
const mysql = require('mysql');
// 引入配置
const { MYSQL_CONF } = require('../config/db');

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 开始连接数据库
con.connect();

con.on('error', function(err) {
    console.log("[mysql error]",err);
});

function exec (sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) { 
                reject(err)
            } else {
                resolve(result);
            }
        })
    })
    return promise;
}

module.exports = {
    exec
};