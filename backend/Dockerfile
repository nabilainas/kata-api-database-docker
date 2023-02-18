# Définition de l'image de base
FROM node:16-alpine

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de l'application dans le conteneur
COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY app.js .

# Installation des dépendances de l'application
RUN npm install

# Exposition du port utilisé par l'application
EXPOSE 80

# Commande pour démarrer l'application
CMD ["npm", "start"]