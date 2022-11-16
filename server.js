'use strict';

const { response } = require('express');
const express = require('express');
let data = require('./data/weather.json');

// need to bring in the .env file
require('dotenv').config();

const cors = require('cors');

//USE
const app = express();

app.use(cors());

//define the PORT
const PORT = process.env.PORT || 3002;



app.get('/weather', (request, response, next) => {
  try {
    let {lat, lon, place} = request.query;
    let selectedPlace = data.find(loc => loc.city_name === place);
    let weatherParsed = selectedPlace.data.map(day => new Forecast(day));
    response.send(weatherParsed);
  } catch (error) {
    //create a new instance of an error
    next(error);
  }
});

app.get('/', (request, response) => {
  response.send('Hello from our server');
});

app.get('/sayHello', (request, response) => {
  response.send(`Hi ${request.query.name}`);
});

app.get('*', (request, response) => {
  response.send('That route does not exist homie');
});

//handle errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp} and a high of ${day.high_temp} with ${day.weather.description}`;
  }
}

//LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
