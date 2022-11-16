'use strict';

const express = require('express');

// need to bring in the .env file
require('dotenv').config();

const cors = require('cors');

//USE
const app = express();

app.use(cors());

const axios = require('axios');

//define the PORT
const PORT = process.env.PORT || 3002;

//ROUTES

app.get('/weather', async (request, response, next) => {
  try {
    let {lat, lon, place} = request.query;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    console.log(url);
    let data = await axios.get(url);
    let weatherParsed = data.data.data.map(day => new Forecast(day));
    response.send(weatherParsed);
  } catch (error) {
    //create a new instance of an error
    next(error);
  }
});

app.get('/', (request, response) => {
  response.send('Hello from our server');
});


app.get('*', (request, response) => {
  response.send('That route does not exist homie');
});


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp} celsius and a high of ${day.high_temp} celsius with ${day.weather.description}`;
  }
}

//handle errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

//LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
