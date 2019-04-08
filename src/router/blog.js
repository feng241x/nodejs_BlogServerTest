const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');

const loginCheck = (req) => {
    if (!req.session.username) {
        return new Promise.resolve(
            new ErrorModel('尚未登录!')
        )
    }
}

const serverBlogHandle = (req, res) => {
    const method = req.method;
    const id = req.query.id;
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        const { author = '', keyword = '' } = req.query;
        const result = getList(author, keyword);
        return result.then(datalist => {
            return new SuccessModel(datalist);
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // return new SuccessModel(getDetail(req.query.id));
        const result = getDetail(id);
        return result.then(data => {
            return new SuccessModel(data);
        })
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        // const blogData = req.body;
        // return new SuccessModel(newBlog(blogData))
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(result => {
            return new SuccessModel(result)
        })
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        // const result = updateBlog(id);
        // if (result) {
        //     return new SuccessModel(result)
        // } else {
        //     return new ErrorModel('更新博客信息失败!')
        // }
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username;
        const result = updateBlog(req.body);
        return result.then( result => {
            if (result) {
                return new SuccessModel(result)
            } else {
                return new ErrorModel('更新博客信息失败!')
            }
        })
    }

    // 删除博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const loginCheckResult = loginCheck(req);
        if (loginCheckResult) {
            return loginCheckResult
        }
        req.body.author = req.session.username;
        const result = delBlog(req.body);
        return result.then(res => {
            if (res) {
                return new SuccessModel(res)
            } else {
                return new ErrorModel('删除博客信息失败!')
            }
        })
    }
}

module.exports = serverBlogHandle