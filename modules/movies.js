const axios = require('axios');

let cache = {};


async function getMovies(req,res, next){
  try {
    let {place} = req.query;
    let key = {place} + 'Data';

    let timeNow = Date.now();
    let acceptableTimeToCache = 1000 * 60 * 60 * 24 * 7 * 4;

    if(cache[key] && (timeNow - cache[key].timeStamp < acceptableTimeToCache)){
      console.log('the data is in the cache, lets use it');
      res.status(200).send(cache[key].data);
    }
    else{
      console.log('the data is not in the cache');
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${place}`;
      let data = await axios.get(url);
      let movieParsed = data.data.results.map(specific => new Movie(specific));
      res.send(movieParsed);

      cache[key] = {
        data: movieParsed,
        timeStamp: Date.now()
      };
    }
  } catch (error) {
    //create a new instance of an error
    next(error);
  }
}

class Movie{
  constructor(specific) {
    this.title = specific.title;
    this.release = specific.release_date;
    this.poster = 'https://image.tmdb.org/t/p/w500'+specific.poster_path;
  }
}


module.exports = getMovies;
