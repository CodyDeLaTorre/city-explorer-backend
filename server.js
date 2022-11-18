'use strict';

const express = require('express');

// need to bring in the .env file
require('dotenv').config();

const cors = require('cors');

//USE
const app = express();

app.use(cors());

const getWeather = require('./weather.js');
const getMovies = require('./movies.js');

//define the PORT
const PORT = process.env.PORT || 3002;

//ROUTES

app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('/weather', getWeather);


app.get('/movies', getMovies);


app.get('*', (request, response) => {
  response.send('That route does not exist homie');
});

//handle errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
