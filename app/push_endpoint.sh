#!/bin/sh
API_URL=$1
TAG=$2

FRONTEND_IMAGE=nabilainas.azurecr.io/frontend:$TAG
PROMETHEUS_IMAGE=nabilainas.azurecr.io/prometheus:$TAG
GRAFANA_IMAGE=nabilainas.azurecr.io/grafana:$TAG


cd frontend
docker build --platform linux/amd64 --build-arg "API_URL=${API_URL}" -t "$FRONTEND_IMAGE" .
docker push "$FRONTEND_IMAGE"

cd ../api
docker build --platform linux/amd64 --build-arg "API_URL=${API_URL}" -t "$PROMETHEUS_IMAGE" .
docker push "$PROMETHEUS_IMAGE"

docker pull grafana/grafana:latest  
docker tag grafana/grafana:latest "$GRAFANA_IMAGE" 
docker push "$GRAFANA_IMAGE"

echo "Build et push terminés pour frontend, prometheus, et grafana."
