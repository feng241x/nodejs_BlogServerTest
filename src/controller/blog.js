const getList = (author, keyword) => {
    // 先返回假数据
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: '张三'
        },
        {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1546610493156,
            author: '李四'
        }
    ]
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