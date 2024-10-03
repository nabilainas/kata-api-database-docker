FROM node:16 AS build

ARG API_URL
ENV API_URL=$API_URL
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./


RUN npm run build
RUN npm install -g serve  build

EXPOSE 80

CMD ["serve", "-s", "build"]