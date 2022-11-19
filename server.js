'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherHandler = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');
const app = express();
const PORT = process.env.PORT || 3002;


app.use(cors());
app.get('/weather', weatherHandler);
app.get('/movies', getMovies);


app.listen(PORT, () => console.log(`Server up on ${PORT}`));
