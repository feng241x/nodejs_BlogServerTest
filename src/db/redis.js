const redis = require('redis');
// 获取 redis 配置
const { REDIS_CONF } = require('../config/db');

const { port, host } = REDIS_CONF;

const redisClient = redis.createClient(port, host);

redisClient.on('error', error => {
    console.log(error);
})

const getSession = key => {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
            }
            try {
                val = JSON.parse(val);
            } catch (e) { }
            resolve(val)
        })
    })
    return promise
}

const setSession = (key, val) => {
    if (typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val);
}

module.exports = {
    getSession,
    setSession
}