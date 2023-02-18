### Project to contenerise and do ci/cd of a full app

> git clone https://github.com/nabilainas/kata-api-database-docker.git cd kata-api-database-docker && docker-compose up

## 1 - I first pu my apps in containers, the frontend (user interface), the database and an app for database user interface :

this looked like this : 

![schema-app-ui-db](./assets/schema-app-ui-db.png)

## 2 - I'm building the api and the unit tests 

go to the backend repository and :
> npm install

create the file and install jest and supertest do do testing

> npm i -D jest supertest