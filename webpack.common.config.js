const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // mode: 'development',
    entry: './src/index.tsx',
    output:{
        path : path.resolve(__dirname,'./dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
        // publicPath: '/dist/'
    },
    devtool:'source-map',
    // devtool: 'cheap-module-eval-source-map', //dev
    // devtool:'cheap-module-source-map', //prod 
    resolve:{
        extensions:['.ts','.tsx','.js','.json']
    },
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                loader:'ts-loader',
                exclude:/node_modules/
            },
            {
                enforce:'pre',
                test:/\.js$/,
                loader:'source-map-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|csv|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }

        ]
    },
    // externals:{
    //     'react':'React',
    //     'react-dom':'ReactDom'
    // },
    plugins:[
        new HtmlWebpackPlugin({
            template: '!!ejs-loader!./template.html'
        })
    ]
}