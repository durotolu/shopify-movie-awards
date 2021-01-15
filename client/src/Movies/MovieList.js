import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { DebounceInput } from 'react-debounce-input';
import './MovieList.css';

const MovieList = props => {
  const [movies, setMovies] = useState([])
  const [responseString, setResponseString] = useState("")

  const onChangeSearch = e => {
    const input = e.target.value;

    const getMovies = () => {
      axios
        .get(`http://www.omdbapi.com/?apikey=af7fae7c&s=${input}`)
        .then(response => {
          input.length <= 2 ? setResponseString("") : setResponseString(response.data.Response)
          if (response.data.Response === "True") {
            setMovies(response.data.Search);
          } else {
            setMovies([]);
          }
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }

  return (
    <div className="movie-list">
      <div className="search">{responseString}
        <DebounceInput minLength={2} debounceTimeout={300} placeholder="Search movie" onChange={onChangeSearch} />
      </div>
      {movies.length ? movies.map(movie => (
        <div key={movie.imdbID}><MovieDetails movie={movie} nomineesID={props.nomineesID} addToNomineesList={props.addToNomineesList} /></div>
      )) : responseString === "False" ? <div>No movies found for that search parameter...</div> : <div>Start typing in the search bar above</div>}
    </div>
  );
}

function MovieDetails({ movie, nomineesID, addToNomineesList }) {
  const { Title, Year, imdbID, Poster } = movie;
  return (
    <MovieCard title={Title} year={Year} imdbID={imdbID} poster={Poster} nomineesID={nomineesID} addToNomineesList={addToNomineesList} />
  );
}

export default MovieList;