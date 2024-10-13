#!/bin/sh
REGISTRY=$1
cd database

echo "Building and pushing database image to $REGISTRY.azurecr.io/database:latest"
docker build --platform linux/amd64 -t $REGISTRY.azurecr.io/database:latest .
docker push $REGISTRY.azurecr.io/database:latest

cd ../api

echo "Building and pushing api image to $REGISTRY.azurecr.io/api:latest"
docker build --platform linux/amd64 -t $REGISTRY.azurecr.io/api:latest .
docker push $REGISTRY.azurecr.io/api:latest