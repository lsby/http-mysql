# http-mysql

使用http协议操作mysql数据库.

- 为什么
  - 这样可以减少后端复杂度,后端不需要关心数据库细节,只需要发送post请求即可.
  - 数据库与后端解耦也有利于实现分布式.
- 安全问题
  - 将后端和本模块部署在一台机器上,不暴露接口地址给外部,可以避免安全问题.
  - 使用https可以避免执行的sql语句被明文传输(todo).
  - 使用ip白名单或鉴权机制也可以避免安全问题(todo).
- 性能
  - 需要测试.

## 启动

### 简单启动

```shell
npm i
npm run start
```

### 使用pm2

```shell
npm run pm2_setlog
npm run pm2_start
```

### 使用docker

手动编译并启动

```shell
npm run docker_build
npm run docker_start
```

或使用[镜像](https://hub.docker.com/r/lsby/http_mysql)

## 测试

先弄个mysql,
手动建个数据库,
相关信息写到config/mysql.js配置文件中.

执行:

```shell
npm run start
```

再开一个终端, 执行:

```shell
npm run test
```

## 使用

- 使用`urlencoded`发送`post`请求到`/query`
- 形式参考`test/test.test.js`文件和[mysql库](https://www.npmjs.com/package/mysql)

## 配置

见`config`文件夹.

## TODO

- https
- ip白名单
- 更好的日志
