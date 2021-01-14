import React from 'react';

const MovieCard = props => {
  const {title, year, poster, type} = props;
  return (
    <div className="movie-card">
      <h2>{title}</h2>
      <div className="movie-director">
        Year: <em>{year}</em>
      </div>
      <div className="movie-metascore">
        Type: <strong>{type}</strong>
      </div>
    </div>
  )
};

export default MovieCard;