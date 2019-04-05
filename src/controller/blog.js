// 引入数据库查询方法
const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
    let sql = `select * from blogs where state=1 `;
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
    const sql = `select * from blogs where id=${id} and state=1`;
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // // blogData 对象是一个博客对象 包含 title content 属性
    // return {
    //     id: 3
    // }
    // const author = 'shunfeng.zhou'; // 假数据 等待注册登录验证完成后替换；
    const { title = '', content = '',  createtime = Date.now(), author = 'shunfeng.zhou' } = blogData;
    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', '${createtime}', '${author}')
    `
    return exec(sql).then( insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (blogData = {}) => {
    // return true
    const { title, content, author, id } = blogData;
    let sql = `
        update blogs set 
    `;
    if (title) {
        sql += `title='${title}'`
    }
    if (content) {
        if (title) sql += ',';
        sql += `content='${content}'`
    }
    sql += ` where id=${id} and author='${author}'`
    return exec(sql).then(result => {
        if (result.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (bodyObj = {}) => {
    // return true
    const { id } = bodyObj;
    const author = 'shunfeng.zhou';
    const sql = `
        update blogs set state=0 where id=${id} and author='${author}'
    `
    return exec(sql).then(result => {
        if (result.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}