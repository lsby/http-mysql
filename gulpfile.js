var cross_spawn = require('cross-spawn')
var fs = require('fs')
var path = require('path')
var util = require('util')
var webpack = require('webpack')

var name = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json')).toString()).name
var isWindows = /^win/.test(process.platform)
var webpack_promise = util.promisify(webpack)

function 执行命令(cmd, opt = { stdio: 'inherit' }) {
    if (isWindows) {
        return cross_spawn('cmd', ['/c', cmd], opt)
    } else {
        return cross_spawn('bash', ['-c', cmd], opt)
    }
}
function 杀进程(pid) {
    if (isWindows) {
        cross_spawn("taskkill", ["/PID", pid, "/T", "/F"])
    } else {
        process.kill(pid, 'SIGTERM')
    }
}
function 执行多行命令(cmds, opt) {
    return 执行命令(cmds.join(' && ').trim(), opt)
}

exports.start = async function (cb) {
    var webpackConf = require('./webpack/webpack.prod')
    webpackConf.plugins.push(new webpack.DefinePlugin({
        'process.env': JSON.stringify({
            'NODE_ENV': 'production',
            'PORT': process.env.PORT
        })
    }))

    await webpack_promise(webpackConf)
    执行命令(`node ./dist/${name}.js`)
    cb()
}
exports.dev = function (cb) {
    var webpackConf = require('./webpack/webpack.dev')
    webpackConf.plugins.push(new webpack.DefinePlugin({
        'process.env': JSON.stringify({
            'NODE_ENV': 'development',
            'PORT': process.env.PORT
        })
    }))

    var cmd = {}
    webpack(webpackConf)
        .watch({}, (err, data) => {
            if (err) return console.error('构建失败', err)
            console.log('已重新构建')
            if (cmd.pid != null) 杀进程(cmd.pid)
            cmd = 执行命令(`node ./dist/${name}.js`)
        })
    cb()
}
exports.test = function (cb) {
    执行命令('npx mocha -r esm')
    cb()
}
exports.pm2_start = async function (cb) {
    var webpackConf = require('./webpack/webpack.prod')
    await webpack_promise(webpackConf)
    执行多行命令([
        `npx pm2 start node -e ./logs/error.log -l ./logs/out.log --name http_oracle ./dist/${name}.js`
    ])
    cb()
}

exports.default = function (cb) {
    console.log('hello, world!')
    cb()
}
