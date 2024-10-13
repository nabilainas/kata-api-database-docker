#!/bin/sh
API_URL=$1
REGISTRY=$2

FRONTEND_IMAGE=$REGISTRY.azurecr.io/frontend:latest
PROMETHEUS_IMAGE=$REGISTRY.azurecr.io/prometheus:latest
GRAFANA_IMAGE=$REGISTRY.azurecr.io/grafana:latest


cd frontend
docker build --platform linux/amd64 --build-arg "API_URL=${API_URL}" -t "$FRONTEND_IMAGE" .
docker push "$FRONTEND_IMAGE"

cd ../api
docker build --platform linux/amd64 --build-arg "API_URL=${API_URL}" -t "$PROMETHEUS_IMAGE" .
docker push "$PROMETHEUS_IMAGE"

docker pull grafana/grafana:latest  
docker tag grafana/grafana:latest "$GRAFANA_IMAGE" 
docker push "$GRAFANA_IMAGE"

echo "Build and push complete"
