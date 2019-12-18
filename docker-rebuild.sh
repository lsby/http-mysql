bash docker-stop.sh
docker-compose rm -f
docker-compose down
docker rmi lsby/nodejs
docker build -t lsby/nodejs .