const env = process.env.NODE_ENV;

// mysql 配置
let MYSQL_CONF;
// redis 配置
let REDIS_CONF;

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'bian241X',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
} else if (env === 'production') {
    MYSQL_CONF = {
        host: '47.97.221.216',
        user: 'root',
        password: 'bian241X',
        port: '3306',
        database: 'myblog'
    }

    REDIS_CONF = {
        port: 6379,
        host: '47.97.221.216'
    }
}

module.exports = { 
    MYSQL_CONF,
    REDIS_CONF
};

