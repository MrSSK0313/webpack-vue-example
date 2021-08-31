module.exports = (source)=> {
    // console.log("源代码",source)
    // 必须把源代码return 出去，否则报错
    return source.replace(/你的/g, 'Loader');
};