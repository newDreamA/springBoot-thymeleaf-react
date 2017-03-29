var debug = process.env.NODE_ENV !== "production";
var webpack =require('webpack');
var path = require('path');


module.exports = {
    context : __dirname,
    entry:path.join(__dirname, 'src/main/js/root.js'),

    output: {
        path: path.join(__dirname,'src/main/webapp/resources/public'),
        filename: 'bundle.js',
    },
    module: {

        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置
                }
            },
//下面是       使用 ant-design 的配置文件
            { test: /\.css$/, loader: 'style-loader!css-loader' }

        ]
    }
};