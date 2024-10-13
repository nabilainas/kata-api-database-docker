# Application Web Conteneurisée

## Sommaire

- I - Vue d'ensemble
  - A - Structure du projet
  - B - Composants de l'application
- II - Prérequis
- III - Mise en pratique
  - A - Connexion à Azure
  - B - Construction et push des images
  - C - Déploiement de l'application
- IV - Développement local
- V - Monitoring

## I - Vue d'ensemble

### A - Structure du projet

Le projet est organisé comme suit :

- `app/` : Contient tous les composants de l'application
  - `frontend/` : Application React
  - `api/` : API Node.js
  - `database/` : Configuration PostgreSQL
  - `monitoring/` : Configuration Prometheus

### B - Composants de l'application

1. Frontend : Application React
2. Backend : API Node.js
3. Base de données : PostgreSQL
4. Monitoring : Prometheus et Grafana

## II - Prérequis

Avant de commencer, assurez-vous d'avoir :

1. Docker installé et en cours d'exécution sur votre machine
2. Azure CLI installé et configuré
3. Un compte Azure avec les permissions nécessaires
4. Git installé sur votre machine

## III - Mise en pratique

### A - Connexion à Azure

Avant de lancer les scripts, connectez-vous à Azure :

```bash
az login
az acr login --name <ACR_NAME>
```

### B - Construction et push des images
1. Pour le backend (database et API) :
```bash
./push_backend.sh
```
2. Pour les endpoints (frontend, Prometheus, Grafana) :


```bash
./push_endpoint.sh <API_URL>
```

Remplacez `<API_URL>` par l'URL de votre API déployée.

### C - Déploiement de l'application

Le déploiement se fait via la pipeline CI/CD définie dans le fichier `.gitlab-ci.yml` du dossier DEPLOY. Assurez-vous que la pipeline est correctement configurée avant de la lancer.

## IV - Développement local

Pour exécuter l'application localement :

```bash
docker compose up -d 
```

Cela lancera tous les services définis dans le fichier `docker-compose.yml`.

## V - Monitoring

Le monitoring de l'application est assuré par Prometheus et Grafana. 

- Prometheus collecte les métriques de l'API Node.js.
- Grafana fournit des tableaux de bord pour visualiser ces métriques.

Pour accéder à Prometheus : http://localhost:9090
Pour accéder à Grafana : http://localhost:3001

N'oubliez pas de configurer Grafana pour utiliser Prometheus comme source de données.