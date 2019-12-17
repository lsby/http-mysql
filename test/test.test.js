var expect = require('chai').expect
var 工具 = require('../node_tools/index')
var 扩展 = require('../node_api/index')

it('post测试', async function () {
    var { data } = await 工具.网络.post('http://127.0.0.1:80/test')({})
    expect(data.body).eq('ok')
})
