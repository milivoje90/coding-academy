# coding-academy

## copy .env.sample to new file .env and add your mysql credetails

DATABASE_HOST=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE=

## install packages

npm install

## create tables

node database/createSportsTable.js
node database/createTeamsTable.js
node database/createEventTable.js

## run application

npm run dev

