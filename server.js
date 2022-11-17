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
    let {lat, lon} = request.query;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let data = await axios.get(url);
    let weatherParsed = data.data.data.map(day => new Forecast(day));
    response.send(weatherParsed);
  } catch (error) {
    //create a new instance of an error
    next(error);
  }
});


app.get('/movies', async (request, response, next) => {
  try {
    let {place} = request.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${place}`;

    let data = await axios.get(url);
    let movieParsed = data.data.results.map(specific => new Movie(specific));
    response.send(movieParsed);
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


class Movie{
  constructor(specific) {
    this.title = specific.title;
    this.release = specific.release_date;
    this.poster = 'https://image.tmdb.org/t/p/w500'+specific.poster_path;
  }
}

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
