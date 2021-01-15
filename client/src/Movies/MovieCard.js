import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = movie => {
  const { title, year, imdbID, nomineesID, addToNomineesList } = movie;

  const nominateMovie = () => {
    addToNomineesList(movie)
  }

  return (
    <div className="movie-card">
        <Link key={imdbID} to={`/${imdbID}`}>
          <h2>{title}</h2>
          <p className="movie-director">
            Year: <em>{year}</em>
          </p>
        </Link>
        <button disabled={nomineesID.includes(imdbID) ? true : false} className="nom-button" onClick={nominateMovie}>Nominate</button>
    </div>
  )
};

export default MovieCard;