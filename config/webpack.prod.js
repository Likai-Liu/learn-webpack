/**
 * 生产环境下打包配置
 */
const path = require('path')
// 此插件可以自动在html文件中引入生成的chunk
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 此插件可以在每次打包前清理之前一次打包的目录（包含所有文件）
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 此插件可以将css从js中分离出来，单独打包
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 此插件可以压缩css 用于生产环境
const OptimizeCssAssertsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩并去除无用js代码
const TerserJsPlugin = require('terser-webpack-plugin')

module.exports = {
    // 生产环境下mode应配置为production
    mode: 'production',
    // source-map配置
    devtool: 'source-map',
    // 入口配置
    entry: {
        main: path.resolve(__dirname, '../src/index.js'),
        // asyncModule: path.resolve(__dirname, '../src/app/asyncModule/index.js')
    },
    // 输出配置
    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].js',
        path: path.resolve(__dirname, '../dist')
    },
    // 配置loader
    module: {
        rules: [{
            test: /\.js$/,
            use: [
                'babel-loader'
            ] 
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name].[contenthash:8].[ext]',
                    limit: 2000,
                    outputPath: '../dist/img',
                    publicPath: '../img'
                }
            }
        }]
    },
    optimization: {
        // runtimeChunk: {
        //     name: 'runtime'
        // },
        minimizer: [
            new TerserJsPlugin({
                sourceMap: true,
                extractComments: false
            }),
            new OptimizeCssAssertsPlugin({
                assetNameRegExp: /\.css$/g
            }) 
        ],
        // usedExports: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors'
                }
            }
        }
    },
    // 可消除webpack警告
    performance: false,
    // 配置插件
    plugins: [
        // 这里指定了src下index.html文件为模板文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        }),
        // 每次打包前都需要清除dist目录
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
        }),
        // 分离css
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].chunk.css'
        })
    ]
}