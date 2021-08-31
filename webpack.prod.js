const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = {
    module: {
        rules: [
            // 处理sass
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
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
                ],
                
            },
            // 处理less
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader',
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
                use: [MiniCssExtractPlugin.loader, 'css-loader',
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
    plugins:[
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            defaultSizes: 'gzip',
            // analyzerPort: 8888,
        })
    ],
    mode: "production",
};
module.exports = merge(require('./webpack.common'), config)