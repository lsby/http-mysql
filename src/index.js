import express from 'express'
import app_config from '../config/app'
import db_config from '../config/db'
import mysql from 'mysql'
import os from 'os'
import util from 'util'

var port = app_config.port
var pool = mysql.createPool(db_config)

var app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.send('http_mysql')
})
app.post('/runsql', async function (req, res) {
    try {
        var { sql, args } = req.body
        var data = await new Promise((res, rej) => pool.query(sql, args, (err, results, fields) => err ? rej(err) : res({ results, fields })))
        res.send({ err: null, data: data })
    } catch (e) {
        console.error(e)
        res.send({ err: e, data: null })
    }
})

app.listen(port, _ => console.log(`start:\n${Object.values(os.networkInterfaces()).flat().map(a => `http://${a.address}:${port}`).join('\n')}`))
