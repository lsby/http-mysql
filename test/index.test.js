var request = require('request')

function post(url, data) {
    return new Promise((res, rej) => request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: data
    }, (err, response, body) => err ? rej(err) : res(body)))
}
function 断言相等(变量, 值) {
    if (变量 != 值) throw `断言失败: 期待: ${值} 实际: ${变量}`
}

var 服务地址 = 'http://127.0.0.1:3000/runsql'

it('错误sql的情况', async function () {
    var { err, data } = await post(服务地址, {
        sql: `aaaaaaaaaa`
    })
    断言相等(err.code, 'ER_PARSE_ERROR')
    断言相等(data, null)
})
it('创建表', async function () {
    var { err, data } = await post(服务地址, {
        sql: `
            CREATE TABLE IF NOT EXISTS tablename(
            id INT UNSIGNED AUTO_INCREMENT,
            data VARCHAR(100) NOT NULL,
            PRIMARY KEY (id)
            )
        `
    })
    断言相等(err, null)
})
it('插入', async function () {
    var { err, data } = await post(服务地址, {
        sql: `INSERT INTO tablename SET ?`,
        args: { data: 'a' }
    })
    断言相等(err, null)
    断言相等(data.results.insertId, 1)
    断言相等(data.results.affectedRows, 1)
})
it('查询', async function () {
    var { err, data } = await post(服务地址, {
        sql: `select * from ??`,
        args: ['tablename']
    })
    断言相等(err, null)
    断言相等(
        JSON.stringify(data.results),
        JSON.stringify([{ id: 1, data: 'a' }])
    )
})
it('删除表', async function () {
    var { err, data } = await post(服务地址, {
        sql: `DROP TABLE ??`,
        args: ['tablename']
    })
    断言相等(err, null)
})
