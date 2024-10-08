FROM postgres:latest

ENV POSTGRES_USER=username
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=mydatabase

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432