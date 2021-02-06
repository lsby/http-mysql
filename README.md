# http-mysql

使用http协议操作mysql数据库.

## 快速开始

1 在`config/db`配置数据库的用户名,密码,地址.

2 安装依赖.

3 启动.

启动有多种方法.

简单启动:

```shell
npm i
npm run start
```

使用pm2:

```shell
npm run pm2_setlog
npm run pm2_start
```

使用docker:

使用docker:

```shell
npm run docker_build
npm run docker_start
```

或使用[镜像](https://hub.docker.com/r/lsby/http_mysql)

4 使用.

使用`urlencoded`发送`post`请求到`/runsql`即可.

形式参考`test/index.js`文件和[库](https://www.npmjs.com/package/mysql)

## TODO

- [ ] https
- [ ] ip白名单

## [Change Log](https://github.com/lsby/http_mysql/blob/master/CHANGELOG.md)
