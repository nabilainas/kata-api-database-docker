FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY app.js .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]