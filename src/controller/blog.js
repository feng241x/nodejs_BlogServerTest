// 引入数据库查询方法
const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title,content like '%${keyword}%' `
    }
    sql += `order by createtime desc`;
    return exec(sql);
}

const getDetail = (id) => {
    // 获取假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: '张三'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 对象是一个博客对象 包含 title content 属性
    return {
        id: 3
    }
}

const updateBlog = (id, blogData = {}) => {
    return true
}

const delBlog = (id) => {
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}