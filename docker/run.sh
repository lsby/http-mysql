work_path=$(dirname $(readlink -f $0))

echo '设置源'
bash ${work_path}/setMirror.sh

echo '安装npm依赖'
npm i --verbose

echo '设置日志'
npm run pm2_setlog
