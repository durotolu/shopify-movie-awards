import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { DebounceInput } from 'react-debounce-input';
import './MovieList.css';

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

const MovieList = props => {
  const [movies, setMovies] = useState([])
  const [responseString, setResponseString] = useState("")

  const onChangeSearch = e => {
    const input = e.target.value;

    const getMovies = () => {
      axios
        .get(`http://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&s=${input}&type=movie`)
        .then(response => {
          input.length <= 2 ? setResponseString("") : setResponseString(response.data.Response)
          if (response.data.Response === "True") {
            setMovies(response.data.Search);
          } else {
            setMovies([]);
          }
        })
        .catch(error => {
          alert('Server Error occured, Checkconnection and try again', error);
        });
    }
    getMovies();
  }

  return (
    <div className="movie-list">
      <div className="search">
        <DebounceInput minLength={2} debounceTimeout={300} placeholder="Search movie" onChange={onChangeSearch} />
      </div>
      {movies.length ? movies.map(movie => (
        <div key={movie.imdbID}><MovieDetails movie={movie} nomineesList={props.nomineesList} addToNomineesList={props.addToNomineesList} nominationFull={props.nominationFull}/></div>
      )) : responseString === "False" ? <div className='default-message'>No movies found for that search parameter...</div> : <div className='default-message'>Start typing movie name in the search bar above</div>}
    </div>
  );
}

function MovieDetails({ movie, nomineesList, addToNomineesList, nominationFull }) {
  const { Title, Year, imdbID, Poster } = movie;
  return (
    <MovieCard title={Title} year={Year} imdbID={imdbID} poster={Poster} nomineesList={nomineesList} addToNomineesList={addToNomineesList} nominationFull={nominationFull} />
  );
}

export default MovieList;