const merge = require('webpack-merge')
const common = require('./webpack.common.js')
var webpack = require('webpack')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: []
})
