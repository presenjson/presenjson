var path = require('path');

var clientConfig = {
    entry: './example/index.js',
    output: {
       path: path.join(__dirname, 'example/build/'),
       filename: 'bundle.js',
       publicPath: './'
     },
     module: {
       loaders: [
         {
           test: /\.js$/,
           exclude: /(node_modules|bower_components)/,
           loader: 'babel-loader?cacheDirectory=true'
         }
       ]
     },
    node: {
        console: true,
        module: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
 }

module.exports = clientConfig;
