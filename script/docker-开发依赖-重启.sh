#!/bin/bash

docker-compose -f ./docker/docker-compose/开发依赖.yml stop
docker-compose -f ./docker/docker-compose/开发依赖.yml up -d --remove-orphans
docker-compose -f ./docker/docker-compose/开发依赖.yml logs -f --tail="100"
