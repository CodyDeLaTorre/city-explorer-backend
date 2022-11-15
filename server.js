'use strict';

const express = require('express');
let data = require('./data/weather.json');

// need to bring in the .env file
require('dotenv').config();

const cors = require('cors');

//USE
const app = express();

//define the PORT
const PORT = process.env.PORT || 3002;

app.use(cors());


app.get('/weather', (request, response) => {
  let place = request.query.place;
  let selectedPlace = data.find(loc => loc.city_name === place);
  console.log(selectedPlace);
  let weatherParsed = selectedPlace.data.map(day => new Forecast(day));
  response.send(weatherParsed);
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


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = day.weather.description;
  }
}

//LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
