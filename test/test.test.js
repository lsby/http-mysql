var expect = require('chai').expect
var 工具 = require('../node_tools/index')
var 扩展 = require('../node_api/index')

var post = 工具.网络.post_urlencoded

it('post', async function () {
    var { data } = await post('http://127.0.0.1:80/test')({ data: 'hello' })
    expect(data.body).eq('hello')
})
it('select', async function () {
    var { data } = await post('http://127.0.0.1:80/query')({ sql: 'select 1 as a' })
    var { results, fields } = data.body.调用(JSON.parse).data
    console.log(fields)
    expect(results.调用(扩展.对象扩展.到字符串)).eq([{ "a": 1 }].调用(扩展.对象扩展.到字符串))
})
