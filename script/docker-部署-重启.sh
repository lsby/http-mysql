#!/bin/bash

docker-compose -f ./docker/docker-compose/部署.yml stop
docker-compose -f ./docker/docker-compose/部署.yml up -d --remove-orphans
docker-compose -f ./docker/docker-compose/部署.yml logs -f --tail="100"
