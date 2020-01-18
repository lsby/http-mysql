#!/bin/sh
set -euxo pipefail

echo '======================='
echo '运行时'
echo '======================='

echo '修改配置文件'

echo "
    module.exports = {
        端口: '$appprot',
    }
" > config/app.js

echo "
    module.exports = {
        host: '$mysql_host',
        user: '$mysql_user',
        password: '$mysql_pwd',
        database: '$mysql_db',
        connectionLimit: '$mysql_link_limit',
    }
" > config/mysql.js

if [ "$on_start_del_pm2log" = "true" ]
then
    echo '删除pm2日志'
    rm -rf /root/.pm2/*.log
    rm -rf /root/.pm2/logs
fi

echo '启动服务'
pm2 start src/index.js --name app

echo '打印日志'
pm2 logs &

if [ "$on_start_run_test" = "true" ]
then
    echo '使用测试'
    ./node_modules/mocha/bin/mocha --delay
fi

tail -f /dev/null
