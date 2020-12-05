work_path=$(dirname $(readlink -f $0))
npm run pm2_start
npm run pm2_log
