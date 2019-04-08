const serverBlogHandle = require('./src/router/blog');
const serverUserHandle = require('./src/router/user');

// redis 操作
const { setSession, getSession } = require('./src/db/redis');

// 获取请求参数
const querystring = require('querystring');

// session 数据
// let SESSION_DATA = {};

const getCookieExpires = () => {
    const d = new Date();
    d.setTime(d.getTime() + ( 24 * 60 * 60 * 1000 ));
    return d.toGMTString()
}

// get postData
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = '';
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            try {
                postData = JSON.parse(postData);
            } catch (e) {
                postData = {}
            }
            resolve(
                postData
            )
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json');

    const url = req.url;
    req.path = url.split('?')[0];

    // 解析参数
    req.query = querystring.parse(url.split('?')[1]);

    // 解析 cookie
    req.cookie = {};
    const cookStr = req.headers.cookie || '';
    cookStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val;
    })

    // // 解析 session
    // let needSetCookie = false;
    // let userId = req.cookie.userid;
    // if (userId) {
    //     if (!SESSION_DATA[userId]) {
    //         SESSION_DATA[userId] = {}
    //     }
    // } else {
    //     needSetCookie = true;
    //     userId = `${Date.now()}_${Math.random()}`;
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`;
        setSession(userId, {});
    }
    req.sessionId = userId;
    getSession(userId).then( val => {
        if (val == null) {
            // 初始化 redis 中的 session 值
            setSession(userId, {});
            req.session = {};
        } else {
            req.session = val;
        }
        return getPostData(req)
    })
    .then( postData => {

        req.body = postData

        // 处理博客路由
        const blogResult = serverBlogHandle(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        // 处理 user 路由
        const userResult = serverUserHandle(req, res);
        if (userResult) {
            userResult.then( userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        // 处理异常
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
    })
}

module.exports = serverHandle;