const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path  = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = merge(commonConfig,{
    mode: 'production',
    devtool: 'cheap-module-source-map'
})