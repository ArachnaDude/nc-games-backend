# Northcoders House of Games API

## Project Summary

This is a REST API backend service for "NC House of Games", a community-based game review site. The user of the API can interact with the PSQL database, making GET, PATCH, POST and DELETE request to a variety of endpoints. A full list of available endpoints is provided within the API.

## Links

### Backend:

- Repo: https://github.com/ArachnaDude/nc-games-backend
- Live Version: https://matts-nc-games-backend.herokuapp.com/api

### Frontend:

- Repo: Coming soon!
- Live Version: Coming soon!

# Setup Instructions for Running Locally

## Minimum Requirements:

- Node.js v17.x
- Postgres v14.x

## Cloning Repository:

Input the following command into your terminal's CLI:

```
$ git clone https://github.com/ArachnaDude/nc-games-backend.git
$ cd nc-ngames-backend
```

## Installing Dependencies:

A full list of dependencies for the project is available in `package.json`.  
To install them, use the command:

```
$ npm install
```

## Setting up Enviroment:

In a real world use-case, the creation and setup of `.env` files would be dealt with privately, as these can contain sensitive information that should not be made publically available.  
For the purpose of demonstrating this project, set up your enviroment files locally using the following commands in the project's root folder.

```
$ touch .env.test .env.development
$ echo PGDATABASE=nc_games_test > .env.test
$ echo PGDATABASE=nc_games > .env.development
```

## Creating Tables and Seeding:

To test or use the API locally, we create local copies of the database which need to be populated with data.  
To do this, run the following commands:

```
$ npm run setup-dbs
$ npm run seed
```

## Testing:

The testing framework used in this project is Jest.  
The test suite can be found in the `__tests__` folder.  
Run it with the command:

```
$ npm test
```
