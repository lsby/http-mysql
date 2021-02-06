var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var toAsync = require('../lib/toAsync')
var mysqlConfig = require('../config/mysql')
var appConfig = require('../config/app')

var port = appConfig.port

var pool = mysql.createPool(mysqlConfig)
var app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.post('/runsql', async function (req, res) {
    try {
        var sql = req.body.sql
        var values = req.body.values
        var data = await toAsync(pool.query.bind(pool))(sql, values)
        res.send({ err: null, data: data })
    } catch (e) {
        console.error(e)
        res.send({ err: e, data: null })
    }
})

app.listen(port, _ => console.log(`start:\n${Object.values(os.networkInterfaces()).flat().map(a => `http://${a.address}:${port}`).join('\n')}`))
