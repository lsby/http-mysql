var expect = require('chai').expect
var 工具 = require('../lib/node_tools/index')
var 扩展 = require('../lib/node_api/index')

var post = 工具.网络.post_urlencoded

it('错误sql的情况', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `aaaaaaaaaa`
    })
    var { err, data } = data.body.调用(JSON.parse)
    expect(err.code).eq('ER_PARSE_ERROR')
    expect(data).eq(null)
})
it('创建表', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `
            CREATE TABLE IF NOT EXISTS tablename(
            id INT UNSIGNED AUTO_INCREMENT,
            data VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
            )
        `
    })
    var { results, fields } = data.body.调用(JSON.parse).data
})
it('插入', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `INSERT INTO tablename SET ?`,
        values: {
            data: 'a',
        }
    })
    var { results, fields } = data.body.调用(JSON.parse).data
    expect(results.insertId).eq(1)
    expect(results.affectedRows).eq(1)
})
it('批量插入', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `INSERT INTO tablename (??) VALUES ?`,
        values: ['data',
            [['b'],
            ['c'],
            ['d'],]
        ]
    })
    var { results, fields } = data.body.调用(JSON.parse).data
    expect(results.insertId).eq(2)
    expect(results.affectedRows).eq(3)
})
it('条件查询', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `select * from ?? where id=? and data=?`,
        values: ['tablename', 1, 'a']
    })
    var { results, fields } = data.body.调用(JSON.parse).data
    expect(
        results.调用(扩展.对象扩展.到字符串)
    ).eq([
        { id: 1, data: 'a' },
    ].调用(扩展.对象扩展.到字符串))
})
it('查询全部', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `select * from ??`,
        values: ['tablename']
    })
    var { results, fields } = data.body.调用(JSON.parse).data
    expect(
        results.调用(扩展.对象扩展.到字符串)
    ).eq([
        { id: 1, data: 'a' },
        { id: 2, data: 'b' },
        { id: 3, data: 'c' },
        { id: 4, data: 'd' },
    ].调用(扩展.对象扩展.到字符串))
})
it('更新', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `UPDATE tablename SET ? WHERE ?`,
        values: [{ data: 'e' }, { id: 1 }]
    })
    var { results, fields } = data.body.调用(JSON.parse).data
})
it('验证更新', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `select * from ??`,
        values: ['tablename']
    })
    var { results, fields } = data.body.调用(JSON.parse).data
    expect(
        results.调用(扩展.对象扩展.到字符串)
    ).eq([
        { id: 1, data: 'e' },
        { id: 2, data: 'b' },
        { id: 3, data: 'c' },
        { id: 4, data: 'd' },
    ].调用(扩展.对象扩展.到字符串))
})
it('删除记录', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `DELETE FROM tablename WHERE ?`,
        values: { data: 'e' }
    })
    var { results, fields } = data.body.调用(JSON.parse).data
})
it('验证删除', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `select * from ??`,
        values: ['tablename']
    })
    var { results, fields } = data.body.调用(JSON.parse).data
    expect(
        results.调用(扩展.对象扩展.到字符串)
    ).eq([
        { id: 2, data: 'b' },
        { id: 3, data: 'c' },
        { id: 4, data: 'd' },
    ].调用(扩展.对象扩展.到字符串))
})
it('删除表', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({
        sql: `DROP TABLE ??`,
        values: ['tablename']
    })
    var { results, fields } = data.body.调用(JSON.parse).data
})

// setTimeout(run, 1000)
