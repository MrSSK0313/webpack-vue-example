const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const setEnv = require('./plugins/setEnv')
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');
const fs=require("fs");
const config = {
    entry: {
        index: './src/main.js'
    },
    output: {
        filename: 'assets/js/[name]_[hash].js',
        assetModuleFilename: "[name][ext]",
        path: path.resolve(__dirname, 'dist'),
        environment: {
            arrowFunction: false, //true默认箭头函数
        }

    },
    module: {

        rules: [
            // vue-loader必须写在第一个位置
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                // 用来处理html里面img引入的图片(负责引入img，从而能被url-loader处理)
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            // Disables attributes processing
                            sources: true,
                        },
                    }
                ],
                generator: {
                    filename: "[name][ext]",
                },

            },

            // babel-polyfill已经被移除了
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    
                    // es6转es5
                    options: {
                        exclude: 'node_modules',//必须排除掉node_modules否则会冲突到其他loader
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "modules": false
                                }
                            ]
                        ],
                        plugins: [
                            [
                              "@babel/plugin-transform-runtime",
                              {
                                // corejs 3版本提供的内置函数，例如Promise,Set和Map，不然部分浏览器不兼容
                                "corejs": {
                                  "version": 3,
                                  "proposals": true
                                },
                                "useESModules": true
                              }
                            ]
                          ]
                    }
                },
                
            },

            // 处理图片
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[name]_[hash].[ext]',
                            // 问题：由于url-loader默认使用es6模块化解析，而html-loader引入的图片是commonjs
                            // 解析时会出现问题：<img src="[object Module]" alt="webpack-img">
                            // 解决：关闭url-loader的es6模块化，使用commonjs解析
                            esModule: false,
                        },
                    },
                ],
            },
            // 处理字体文件
            {
                test: /\.(woff2|eot|svg|ttf|woff)$/,
                loader: 'url-loader',
                options: {
                    // 图片大小处理，limit:30*1024表示小于30kb就会被处理成base64
                    // 优点：变少请求数量，减轻服务器压力
                    // 缺点：图片体积会更大（文件请求速度更慢）
                    limit: 3 * 1024,
                    esModule: false,
                    // 给图片进行重命名
                    // [hash:10]取图片的hash的前10位
                    // [ext]取文件原来的扩展名
                    name: 'assets/font/[name]_[hash].[ext]'
                    // 打包图片的时候同一份图片只会打包一次
                }
            },


        ],
    },
    resolve: {
        // 设置别名
        alias: {
            // '@/utils':path.resolve(__dirname,'./src/utils')
        }
    },
    plugins: [

        new setEnv({
            env: process.env.NODE_ENV
        }),
        new webpack.DefinePlugin({
            'process.env': {
                BASE_URL: (()=>{
                    const getEnv=path.join(__dirname,'./env.config.js');
                    let DEV_BASE_URL='';
                    let PROD_BASE_URL='';
                    if(fs.existsSync(getEnv)){
                        const envs=require(getEnv);
                        DEV_BASE_URL=envs.DEV_BASE_URL;
                        PROD_BASE_URL=envs.PROD_BASE_URL;
                    }
                    return JSON.stringify(process.env.NODE_ENV==='development'?DEV_BASE_URL:PROD_BASE_URL)
                })()
            }
        }),
        new CleanWebpackPlugin(),

        new webpack.ProgressPlugin(),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i,
            exclude: /\/node_modules/,
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: "body",
            scriptLoading: "blocking"
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // css单独打包到文件里面
            new MiniCssExtractPlugin({
                filename: 'assets/css/[name].[hash].css'
            }),
            new CssMinimizerPlugin(),
            new HtmlMinimizerPlugin(),

        ],
        splitChunks: {
            chunks: 'all',
        },
    },
};
module.exports = config;