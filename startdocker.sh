docker rm some-postgres
docker run --name some-postgres -e POSTGRES_PASSWORD=test -e POSTGRES_USER=test -e POSTGRES_DB=test -p 127.0.0.1:5432:5432 -d postgres
