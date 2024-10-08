FROM node:16 AS build

ARG API_URL

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
ENV REACT_APP_API_URL=$API_URL
RUN npm install

COPY . ./


RUN npm run build
RUN npm install -g serve  build

EXPOSE 3000

CMD ["serve", "-s", "build"]