docker-compose stop
docker-compose rm -f
docker-compose down
docker rmi lsby/http_mysql
docker build -t lsby/http_mysql .