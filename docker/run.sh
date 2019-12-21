#!/bin/sh
set -euxo pipefail

echo '======================='
echo '脚本开始'
echo '======================='

if [ -f '/root/code/conf/docker-use-cnpm' ];then
    echo '使用cnpm'
    if [ ! -f '/root/code/docker/installed-cnpm' ];then
        npm install -g cnpm --registry=https://registry.npm.taobao.org
        echo '' > /root/code/docker/installed-cnpm
    fi
    alias npm='cnpm'
fi
if [ ! -f '/root/code/docker/installed-npm-g' ];then
    echo '安装全局依赖'
    npm i -g pm2
    echo '' > /root/code/docker/installed-npm-g
fi
if [ ! -f '/root/code/docker/installed-npm' ];then
    echo '安装依赖'
    npm i 
    echo '' > /root/code/docker/installed-npm
fi
if [ -f '/root/code/conf/docker-use-rmLogOnStart' ];then
    echo '删除pm2日志'
    rm -rf /root/.pm2/*.log
    rm -rf /root/.pm2/logs
fi

echo '启动服务'
pm2 start src/index.js --name app

echo '打印日志'
pm2 logs &

if [ -f '/root/code/conf/docker-use-test' ];then
    echo '使用测试'
    if [ ! -f '/root/code/docker/installed-mocha' ];then
        npm i -g mocha
        echo '' > /root/code/docker/installed-mocha
    fi
    mocha
fi

tail -f /dev/null
