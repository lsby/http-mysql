var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var 扩展 = require('../lib/node_api/index')
var mysql配置 = require('../config/mysql')
var app配置 = require('../config/app')

var pool = mysql.createPool(mysql配置)
var app = express()

app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/query', async function (req, res) {
    try {
        var sql = req.body.sql
        if (sql == null || sql == '')
            throw 'sql不能为空'

        var { data: conn } = await 扩展.其他工具.回调包装(back => pool.getConnection(back))
        var { err, data } = await 扩展.其他工具.回调包装_fin(back => conn.query(req.body,
            (err, results, fields) => {
                if (err) return back(err)
                return back(null, { results, fields })
            }
        ), _ => conn.release())

        res.send({ err, data })
    } catch (e) {
        res.send({ err: e, data: null })
    }
})

app.listen(app配置.端口, _ => console.log(`启动完成 端口:${app配置.端口}`))
