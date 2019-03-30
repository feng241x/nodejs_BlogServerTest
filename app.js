const serverBlogHandle = require('./src/router/blog');
const serverUserHandle = require('./src/router/user');

// 获取请求参数
const querystring = require('querystring');

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
    
    getPostData(req).then( postData => {

        req.body = postData

        // 处理博客路由
        const blogData = serverBlogHandle(req, res);
        if (blogData) {
            res.end(
                JSON.stringify(blogData)
            )
            return
        }

        // 处理 user 路由
        const userData = serverUserHandle(req, res);
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
        }

        // 处理异常
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('404 Not Found\n');
        res.end();
    })
}

module.exports = serverHandle;