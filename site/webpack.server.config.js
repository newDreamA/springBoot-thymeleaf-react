/**
 * Created by tangxiewen on 2017/3/13.
 */

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config=require('./webpack.config.js')


new WebpackDevServer(webpack(config), {
    contentBase: __dirname + '/src',
    hot: true,
    proxy: {
        "*": "http://localhost:8000"
    },
    historyApiFallback: true
}).listen(8000, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:8000');
});
