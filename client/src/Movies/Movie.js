import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movie.css';

const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
console.log(REACT_APP_API_KEY)

const Movie = (props) => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false)
  const id = props.match.params.movie;


  useEffect(() => {
    setLoading(true)
    axios
      .get(`https://www.omdbapi.com/?apikey=${REACT_APP_API_KEY}&i=${id}`)
      .then(response => {
        setMovie(response.data);
        setLoading(false)
      })
      .catch(error => {
        alert(error);
      });
  }, [id]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  const { Title, Year, Poster, Genre, Actors, Director, Released, Rated, Plot } = movie;
  return (
    movie && <div className="movie-wrapper">
      <div className="movie-card">
        <img src={Poster} alt={Title} />
        <h2>{Title}</h2>
        <div className="movie-director">
        <p>Year: {Year}</p>
        <p>Genre: {Genre}</p>
        <p>Actors: {Actors}</p>
        <p>Director: {Director}</p>
        <p>Released: {Released}</p>
        <p>Rated: {Rated}</p>
        <p>Plot: {Plot}</p>
        </div>
        {/* <button className="save-button" onClick={nominateMovie}>{nomineesID.includes(imdbID) ? 'Remove' : 'Nominate'}</button> */}
      </div>
    </div>
  );
}

export default Movie;