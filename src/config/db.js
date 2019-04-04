const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'bian241X',
        port: '3306',
        database: 'myblog'
    }
} else if (env === 'production') {
    MYSQL_CONF = {
        host: '47.97.221.216',
        user: 'root',
        password: 'bian241X',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = { MYSQL_CONF };

