var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var toAsync = require('../lib/toAsync')
var mysql配置 = require('../config/mysql')
var app配置 = require('../config/app')

var pool = mysql.createPool(mysql配置)
var app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/query', async function (req, res) {
    try {
        var sql = req.body.sql
        var values = req.body.values
        if (sql == null || sql == '') throw 'sql不能为空'
        var [results, fields] = await toAsync(pool.query.bind(pool))(sql, values)
        res.send({ err: null, data: { results, fields } })
    } catch (e) {
        console.error(e)
        res.send({ err: e, data: null })
    }
})

app.listen(app配置.端口, _ => console.log(`启动完成 端口:${app配置.端口}`))
