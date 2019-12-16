var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var 扩展 = require('../node_api/index')

var mysqlConf = require('../conf/mysql')

router.post('/query', async function (req, res, next) {
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
router.post('/exec', function (req, res, next) {
    res.send('respond with a resource')
})

module.exports = router
