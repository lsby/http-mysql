#!/bin/sh
set -euxo pipefail

echo '======================='
echo '脚本开始'
echo '======================='

echo '定义变量'
appPath=/root/code
dockerFlag=/root/code/config/flag

# echo '替换配置文件'
# \cp -rf $appPath/docker/config/* $appPath/config/

if [ -f "$dockerFlag/使用cnpm" ];then
    echo '使用cnpm'
    if [ ! -f "$dockerFlag/已安装cnpm" ];then
        npm install -g cnpm --registry=https://registry.npm.taobao.org
        echo '' > $dockerFlag/已安装cnpm
    fi
    alias npm='cnpm'
fi
if [ ! -f "$dockerFlag/已安装全局依赖" ];then
    echo '安装全局依赖'
    npm i -g pm2
    echo '' > $dockerFlag/已安装全局依赖
fi
if [ ! -f "$dockerFlag/已安装依赖" ];then
    echo '安装依赖'
    npm i 
    echo '' > $dockerFlag/已安装依赖
fi
if [ -f "$dockerFlag/启动时删除pm2日志" ];then
    echo '删除pm2日志'
    rm -rf /root/.pm2/*.log
    rm -rf /root/.pm2/logs
fi

echo '启动服务'
pm2 start src/index.js --name app

echo '打印日志'
pm2 logs &

if [ -f "$dockerFlag/使用测试" ];then
    echo '使用测试'
    ./node_modules/mocha/bin/mocha --delay
fi

tail -f /dev/null
