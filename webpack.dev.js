const path = require('path');
const { merge } = require('webpack-merge');
// less-loader 的版本可能会跟devServer冲突，造成打包不成功
// 出现以下提示
// Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
//  - options has an unknown property 'overlay'. These properties are valid:
//  object { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, setupExitSignals?, static?, watchFiles?, webSocketServer? }
// - options.allowedHosts should be a non-empty array.
// 需要更换webpack-dev-server的版本号或者less-loader的版本号
const config = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,//开启gzip压缩
        // publicPath: '/',
        port: 8080,//服务器端口号
        hot: true,//启用模块热更新HMR
        host: '0.0.0.0', //默认localhost,想外部可访问用'0.0.0.0',
        useLocalIp: true,  //使用本地ip地址
        disableHostCheck: true,////使得本机ip地址可以通过外部设备访问,不设置的话会没办法使用本地ip
        open: true, //默认打开浏览器
        inline: true, // 可以监控js变化
        historyApiFallback: true, //当vue-router 的mode: 'history'时，也就是当使用 HTML5 History API 时，可以用来切换不同路由
        // historyApiFallback 当vue-router 的mode: 'history'时，也就是当使用 HTML5 History API 时，可以用来切换不同路由
        // historyApiFallback: {
        //     rewrites: [
        //       { from: /^\/$/, to: '/views/landing.html' },
        //       { from: /^\/subpage/, to: '/views/subpage.html' },
        //       { from: /./, to: '/views/404.html' }
        //     ]
        //   }
        before: function (app, server, compiler) {
            // before 所有中间件执行之前
            // app.get('/getdata', function (req, res) {
            //     // console.log("before 执行", res)
            // });
        },
        after: function (app, server, compiler) {
            // 服务器内部的 所有中间件执行完成之后执行
            console.log("执行after中间件")
        },
        // allowedHosts服务器的服务列入白名单。
        // allowedHosts: [
        //     'host.com',
        //     'subdomain.host.com',
        //     'subdomain2.host.com',
        //     'host2.com',
        // ],
        // overlay: false,//出现编译器错误或警告时，在浏览器中显示全屏覆盖  默认为false
        proxy: [
            {
                context: ['/api'],//可代理多个目标
                target: 'http://192.168.233.10:20000',
                pathRewrite: { '^/': '' },
                changeOrigin: true,
            },
        ],
        headers: {
            // 为所有请求添加响应标头：
            'X-Custom-Foo': 'bar',
        },

    },
    module: {
        rules: [
            // 处理sass
            {
                test: /\.s[ac]ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    },
                    'sass-loader'
                ]
            },
            // 处理less
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    },
                    'less-loader'
                ]
            },
            // 处理css文件
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    }
                ]
            },
        ]
    },
    devtool: 'eval-source-map', //定位代码错误位置
    mode: "development",
    optimization: {
        usedExports: true,
    },
};
module.exports = merge(require('./webpack.common'), config);