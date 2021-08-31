const path=require("path");
const fs=require("fs");
const webpack = require('webpack'); // 访问内置的插件
class setEnv {
    constructor(options = {}){
        console.log("外面传递进来的参数",options)
        this.env=options.env||"development"
    }
    // 内部有立即执行函数
    apply(compiler) {
        compiler.hooks.emit.tapAsync(//异步操作的例子
            "setEnv",
            (compilation,callback) => {
                // compilation.assets["copyright.txt"] = {  //打包后创建一个新文件 打包后会在dist下多一个copyright.txt文件  内容为 hello copy
                //     source:function(){
                //         return "hello copy"
                //     },
                //     size:function(){
                //         return 20;
                //     }
                // };
                // console.log("compilation",compilation)
                
                callback()
            }
        )
        //同步的例子
        compiler.hooks.compile.tap(
            "setEnv",
            compilation => {
                // console.log("传递进来的name:",this.name)
                // console.log("NODE_ENV",process.env)
                // process.env.BASE_URL=this.env

            }
        )  
    }

}
module.exports = setEnv;