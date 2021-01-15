import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = movie => {
  const { title, year, imdbID, addToNomineesList, nominationFull } = movie;
  const savedNominees = localStorage.getItem('nominees');
  const [nomineesList, setNomineesList] = useState(JSON.parse(savedNominees) || []);

  useEffect(() => {
    const nominees = JSON.parse(localStorage.getItem('nominees'))
    setNomineesList(nominees)
  }, [nomineesList])

  const nominateMovie = () => {
    addToNomineesList(movie)
  }

  return (
    <div className="movie-card">
        <Link key={imdbID} to={`/${imdbID}`}>
          <h2>{title} (<em>{year}</em>)</h2>
        </Link>
        <button disabled={nominationFull ? true : nomineesList.find((nominee) => nominee.imdbID === imdbID) ? true : false} className="nom-button" onClick={nominateMovie}>Nominate</button>
    </div>
  )
};

export default MovieCard;