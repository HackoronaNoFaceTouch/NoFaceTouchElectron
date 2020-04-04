const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})
module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname +'/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env","@babel/preset-react"]
            }
            
        },
        {
            test: /\.css/,
            loaders: [ 'style-loader', 'css-loader' ]
        },
        
    ]
    },
    mode: 'production',
    performance: {
        hints: false
    }
    ,
    plugins: [HtmlWebpackPluginConfig]
}