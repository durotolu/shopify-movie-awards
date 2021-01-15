import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import {DebounceInput} from 'react-debounce-input';

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
      <DebounceInput minLength={3} debounceTimeout={300} placeholder="Search movie" onChange={onChangeSearch} onClick={null} />
      {/* <input onChange={onChangeSearch} /> */}
       {movies.map(movie => (
          <div key={movie.imdbID}><MovieDetails movie={movie} nomineesID={props.nomineesID} addToNomineesList={props.addToNomineesList} /></div>
        ))}
    </div>
  );
}

function MovieDetails({ movie, nomineesID, addToNomineesList }) {
  // debugger
  const { Title, Year, imdbID, Poster } = movie;
  return (
    <MovieCard title={Title} year={Year} imdbID={imdbID} poster={Poster} nomineesID={nomineesID} addToNomineesList={addToNomineesList} />
  );
}

export default MovieList;