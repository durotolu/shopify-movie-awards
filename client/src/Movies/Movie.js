import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Movie.css';

const Movie = (props) => {
  const [movie, setMovie] = useState(null);
  const id = props.match.params.movie;

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?apikey=af7fae7c&i=${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  console.log(movie)
  const { imdbID, Title, Year, Poster, Genre, Actors, Director, Released, Rated, Writer, Plot } = movie;
  return (
    <div className="movie-wrapper">
      <div className="movie-card">
        <img src={Poster} />
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