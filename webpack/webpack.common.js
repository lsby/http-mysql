var path = require('path')
var fs = require('fs')
var { CleanWebpackPlugin } = require('clean-webpack-plugin')
var package = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString())
var nodeExternals = require('webpack-node-externals')

var name = package.name

var entry = path.resolve(__dirname, '../src/index.js')
var plugins = [
    new CleanWebpackPlugin(),
]
var output = {
    filename: `${name}.js`,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: name
}
var externals = [
    nodeExternals()
]
var webpack_module = {
    rules: [
        { test: /\.(js|mjs)$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" },
        { test: /\.(js|mjs)$/, use: ["source-map-loader"], enforce: "pre" },
    ]
}

module.exports = {
    target: 'node',
    entry,
    plugins,
    output,
    externals,
    module: webpack_module,
}
