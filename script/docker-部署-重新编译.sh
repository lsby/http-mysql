#!/bin/bash

docker-compose -f ./docker/部署.yml stop
docker-compose -f ./docker/部署.yml rm -f
docker-compose -f ./docker/部署.yml down
docker rmi lsby/http_mysql
docker build -f ./Dockerfile -t lsby/http_mysql .
