var express = require('express')
var app = express()
var mysql = require('mysql')
var 扩展 = require('../node_api/index')

app.all('/test', function (req, res) {
    res.send('ok')
})
app.post('/query', async function (req, res) {
    var sql = req.body.sql
    if (sql == null || sql == '')
        return res.send({ err: true, data: '无效的sql' })

    var conn = mysql.createConnection(mysqlConf)
    var { err, data } = await 扩展.其他工具.回调包装(back => conn.query(sql, (err, results, fields) => {
        if (err) return back(err)
        return back(null, { results, fields })
    }))
    return res.send({ err, data })
})
app.post('/exec', function (req, res) {
    res.send('ok')
})

app.listen(80, _ => console.log('启动完成'))
