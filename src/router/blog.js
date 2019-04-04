const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');

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
        return new SuccessModel(getDetail(req.query.id));
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/new') {
        const blogData = req.body;
        return new SuccessModel(newBlog(blogData))
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id);
        if (result) {
            return new SuccessModel(result)
        } else {
            return new ErrorModel('更新博客信息失败!')
        }
    }

    // 更新博客
    if (method === 'POST' && req.path === '/api/blog/del') {
        const result = delBlog(id);
        if (result) {
            return new SuccessModel(result)
        } else {
            return new ErrorModel('删除博客信息失败!')
        }
    }
}

module.exports = serverBlogHandle