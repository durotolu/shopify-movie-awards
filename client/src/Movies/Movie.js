import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movie = (props) => {
  console.table(props);
  const {onclick} = props;
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
  
  // Uncomment this only when you have moved on to the stretch goals
  const saveMovie = () => {
    // const addToSavedList = props.addToSavedList;
    //addToSavedList(movie)
    onclick(movie)
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const {Title, Year, Poster, Type} = movie;
  return (
    <div className="save-wrapper">
      <MovieCard title={Title} year={Year} poster={Poster} type={Type} />
      <div className="save-button" onClick={saveMovie}>Save</div>
    </div>
  );
}

export default Movie;