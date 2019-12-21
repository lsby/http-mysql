# http-mysql

使用http协议操作mysql数据库

## 启动

### 本地

```shell
sh git-init-submodule.sh
npm i
node src/index.js

# 要测试的话
npm i -g mocha
mocha
```

### docker

```shell
# 需要写好docker-compose.yml文件
sh docker-rebuild.sh
sh docker-restart.sh
```

## 使用

- 使用`urlencoded`发送`post`请求到`/query`
- 形式参考`test/test.test.js`文件和[mysql库](https://www.npmjs.com/package/mysql)

## 配置

通用:

- conf/mysql.js:数据库相关,形式参考[mysql库](https://www.npmjs.com/package/mysql#pool-options)

docker用:

- conf/docker-use-cnpm:是否使用cnpm(文件存在即使用,下同)
- conf/docker-use-rmLogOnStart:启动时是否删除日志文件
- conf/docker-use-test:启动时是否运行测试
