const axios = require('axios');


async function getMovies(req,res){
  try {
    let {place} = req.query;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${place}`;

    let data = await axios.get(url);
    let movieParsed = data.data.results.map(specific => new Movie(specific));
    res.send(movieParsed);
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
