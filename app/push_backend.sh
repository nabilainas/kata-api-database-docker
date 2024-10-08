#!/bin/sh

cd database

docker build --platform linux/amd64 -t nabilainas.azurecr.io/database:latest .
docker push nabilainas.azurecr.io/database:latest

cd ../api

docker build --platform linux/amd64 -t nabilainas.azurecr.io/api:latest .
docker push nabilainas.azurecr.io/api:latest