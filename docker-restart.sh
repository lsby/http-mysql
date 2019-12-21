docker-compose stop
docker-compose up -d --remove-orphans
docker-compose logs -f --tail="100"
