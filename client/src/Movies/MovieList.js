import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';

const MovieList = props => {
  const [movies, setMovies] = useState([])

  const onChangeSearch = e => {
    const input = e.target.value;
    console.log(input)

    if (input.length > 2) {

      const getMovies = () => {
      axios
      .get(`http://www.omdbapi.com/?apikey=af7fae7c&s=${input}`)
      .then(response => {
          setMovies(response.data.Search);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
      }
      console.log(movies);
      getMovies();
    }
  }
    
  return (
    <div className="movie-list">
      {/* <DebounceInput minLength={1} debounceTimeout={300} list="locations" placeholder="Your Address" onChange={onChangeSearch} onClick={null} /> */}
      <input onChange={onChangeSearch} />
       {movies.map(movie => (
          <Link key={movie.imdbID} to={`/${movie.imdbID}`}><MovieDetails movie={movie} /></Link>
        ))}
    </div>
  );
}

function MovieDetails({ movie }) {
  const { Title, Year, Poster, Type } = movie;
  return (
    <MovieCard title={Title} year={Year} poster={Poster} type={Type} />
  );
}

export default MovieList;