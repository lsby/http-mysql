var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var 扩展 = require('../node_api/index')
var mysql = require('mysql')
var mysqlConf = require('../conf/mysql')
var pool = mysql.createPool(mysqlConf)

app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/query', async function (req, res) {
    var sql = req.body.sql
    if (sql == null || sql == '')
        return res.send({ err: true, data: 'sql不能为空' })

    var { data: conn } = await 扩展.其他工具.回调包装(back => pool.getConnection(back))
    var { err, data } = await 扩展.其他工具.回调包装_fin(back => conn.query(req.body,
        (err, results, fields) => {
            if (err) return back(err)
            return back(null, { results, fields })
        }
    ), conn.release)

    return res.send({ err, data })
})

app.listen(80, _ => console.log('启动完成'))
