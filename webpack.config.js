/**
 * Created by cinque on 2017/5/16.
 */
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {LoaderOptionsPlugin, DefinePlugin} = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyes-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const del = require("del");
const webpack = require("webpack");
const node_env = process.env.NODE_ENV; //dev-开发（热加载）;test-测试；product-生产
const distPath = node_env == "develop"? "../webapp/vue2/" + node_env:"./" + node_env;
const pathSrc = path.resolve(__dirname, "src");
const pathHtml = path.resolve(distPath, 'html');
const pathNodeModules = path.resolve(__dirname, 'node_modules');

console.log(`本次编译环境是: ${node_env}`);
console.log("path"+distPath);

const entry = function() {
    return {
        app:resolve(__dirname, 'src/js/router/router.js')
    }
};

const output = () => {
    let output = {
        path: resolve(__dirname, distPath),       //输出路径
        filename: 'js/[name].js',                 //生成的js路径和名称配置
    };
    if (node_env != 'develop') {
        output.path = resolve(__dirname, distPath);
        output.filename = 'js/[name]-[chunkhash:8].js';
    }
    return output;
};

const plugins = () => {
    let commonPlugins = [ //任何环境下都要用的插件
        new HtmlWebpackPlugin({                                       //生成新的html，自动引用css、js、images
            filename: pathHtml + "/index.html",                       //生成的html路径和名称配置
            template: path.resolve(pathSrc, "html/index.html"),       //生成的html的模板，以此模板为基础添加js、css、images的连接
            title:"vue2自己搭建框架试试的",                            //设置新的HTML的title，需要HTML配合设置
            chunks: ["app"]                                           //指定引入的js
        }),
        new DefinePlugin({                                            //允许创建一个在编译时可以配置的全局常量
            "process.env": {
                NODE_ENV: JSON.stringify(node_env)
            }
        }),
    ], devPlugins = [
        new ExtractTextPlugin('css/[name].css'),                   //把css单独分离出来的插件，需要和modules配合使用
    ], testPlugins = [
        new ExtractTextPlugin('css/[name]_[hash:8].css'),
    ], prodPlugins = [
        new ExtractTextPlugin('css/[name]_[hash:8].css'),
        new LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new UglifyJsPlugin({                                       //压缩js文件
            beautify: false,
            mangle: {                                               //压缩跳过这些
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {                                             //
                screw_ie8: true,
                reduce_vars: false
            },
            comments: false                                         //版权注释:false,取消版权注释。
        })
    ];
    if (node_env === 'develop') {
        return [...commonPlugins, ...devPlugins];
    } else if (node_env === 'test') {
        return [...commonPlugins, ...testPlugins];
    } else if (node_env === 'product') {
        return [...commonPlugins, ...prodPlugins];
    } else {
        return [...commonPlugins];
    }

};

const modules = () => ({
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
        {
            test: /\.js?$/,                                //正则匹配js文件
            exclude: /node_modules/,                       //正则忽略打包文件
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        presets: ['es2015',"stage-0"],
                        plugins: [
                            'transform-runtime',
                            'syntax-async-functions',
                            'syntax-decorators'
                        ]
                    }
                }
            ]
        },
        {
            test: /\.(less|css)$/,                            //正则匹配css和less文件，less现阶段只存在于antd的css引入
            use: ExtractTextPlugin.extract({                  //配合插件分离css，通过link引入文件，而不是内联
                use: [
                    {
                        loader: "css-loader"
                    }
                ],
                fallback: "style-loader"
            })
        },
        {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,     //正则匹配图片、字体文件
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'images/[hash:8].[name].[ext]'
                    }
                },
                'image-webpack-loader'
            ]
        }
    ]
});

const resolveModules = ()=>({                                    //解析
    modules: ['node_modules', pathNodeModules],
    extensions: [ '.web.js', '.jsx', '.js', '.json',".vue"],             //解析,可以使得文件后缀名匹配，不需要写全
    alias:{
        'vue$':"vue/dist/vue.common.js"
    }
});

// 删除文件
function delFiles() {
    console.log("执行：清空原文件");
    del([distPath+"/**/*"],{force:true})
}

const isNotDev = ()=>{
    return node_env != "develop"
};
if (isNotDev()){
    delFiles();
}

let config = {
    entry: entry(),
    output: output(),
    plugins: plugins(),
    module: modules(),
    resolve: resolveModules(),
    devServer: {
        port: 6002,
        host: '127.0.0.1',
        contentBase: distPath+"/html",
        historyApiFallback: true,
        open: true,
        openPage: "",
    },
    devtool: (node_env === 'develop') ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',   //开发者调试设置
};

module.exports = config;
