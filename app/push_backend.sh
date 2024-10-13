#!/bin/sh
TAG=$1
cd database

docker build --platform linux/amd64 -t nabilainas.azurecr.io/database:$TAG .
docker push nabilainas.azurecr.io/database:$TAG

cd ../api

docker build --platform linux/amd64 -t nabilainas.azurecr.io/api:$TAG .
docker push nabilainas.azurecr.io/api:$TAG