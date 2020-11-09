docker stop simple-postgresql
docker rm simple-postgresql
docker run --name simple-postgresql -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=test -p 127.0.0.1:5433:5432 -d postgres