# http-mysql

使用http协议操作mysql数据库.

- 为什么
  - 这样可以减少后端复杂度,后端不需要关心数据库细节,只需要发送post请求即可.
  - 数据库与后端解耦也有利于实现分布式.
- 安全问题
  - 将后端和本模块部署在一台机器上,不暴露接口地址给外部,可以避免安全问题.
  - 使用https或鉴权机制也可以避免安全问题(todo).
- 性能
  - 需要测试.

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

## TODO

- https
- ip白名单
- 鉴权
