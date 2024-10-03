FROM node:16-alpine

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY app.js .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]