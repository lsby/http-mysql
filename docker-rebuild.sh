bash docker-stop.sh
docker-compose rm -f
docker-compose down
docker rmi lsby/http-mysql
docker build -t lsby/http-mysql .