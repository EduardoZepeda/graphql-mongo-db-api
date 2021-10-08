
# Graphql Mongodb API

  

## Demo

This is a basic class enrollment app it allows the creation of courses, students an monitors.
The project consist of a backend graphql endpoint running on vercel and express, using mongodb as the database.
It consist of two endpoints:
* [Graphiql console, docs included](https://graphql-mongo-db-api.vercel.app/api/graphql)
* [Api (Graphiql console deactivated)](https://graphql-mongo-db-api.vercel.app/api)
  

## Installation

  

Install with npm


```bash

git clone https://github.com/EduardoZepeda/graphql-mongo-db-api

cd graphql-mongo-db-api/

npm install

```

This project requires a .env file at the root of the project with the following environmental variables. The file will be loaded using the [dotenv](https://www.npmjs.com/package/dotenv) package.

    DB_USER=yourDatabaseUser
    DB_PASSWD=yourDnPassword
    DB_HOST=your.cluster.mongodb.net
    DB_NAME=yourDatabaseName


## Docs 

Please refer to the [automatic graphiql docs](https://graphql-mongo-db-api.vercel.app/api/graphql) and click on the right upper corner.