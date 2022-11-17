const axios = require('axios');

async function getWeather(req,res) {
  try {
    let {lat, lon} = req.query;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;
    let data = await axios.get(url);
    let weatherParsed = data.data.data.map(day => new Forecast(day));
    res.send(weatherParsed);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    }).catch(next);
  }
}


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp} celsius and a high of ${day.high_temp} celsius with ${day.weather.description}`;
  }
}



module.exports = getWeather;
