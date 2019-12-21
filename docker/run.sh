#!/bin/sh
set -euxo pipefail

echo '======================='
echo '脚本开始'
echo '======================='

if [ ! -f '/root/code/docker/installed-npm-g' ];then
    echo '安装全局依赖'
    npm install -g cnpm --registry=https://registry.npm.taobao.org
    cnpm i -g mocha pm2
    echo '' > /root/code/docker/installed-npm-g
fi
if [ ! -f '/root/code/docker/installed-npm' ];then
    echo '安装依赖'
    cnpm i 
    echo '' > /root/code/docker/installed-npm
fi
if [ -f '/root/code/docker/rmLogOnStart' ];then
    echo '删除pm2日志'
    rm -rf /root/.pm2/*.log
    rm -rf /root/.pm2/logs
fi

echo '启动服务'
pm2 start src/index.js --name app

echo '打印日志'
pm2 logs &

echo '单元测试'
mocha

tail -f /dev/null
