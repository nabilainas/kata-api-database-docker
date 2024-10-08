#!/bin/sh

# Remplace la variable ${TARGET} dans le modèle et écris le résultat dans prometheus.yml
TARGET=${TARGET:-"node-api:80"}  # Valeur par défaut si TARGET n'est pas définie
export TARGET

envsubst < /etc/prometheus/prometheus.template.yml > /etc/prometheus/prometheus.yml

# Démarre Prometheus avec la configuration dynamique
exec prometheus "$@"