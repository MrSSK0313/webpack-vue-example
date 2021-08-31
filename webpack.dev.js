const path = require('path');
const { merge } = require('webpack-merge');
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
        proxy: [
            {
                context: ['/api'],//可代理多个目标
                target: 'http://192.168.233.10:20000',
                pathRewrite: { '^/': '' },
                changeOrigin: true,
            },
        ]

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