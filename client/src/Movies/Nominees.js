import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Nominees.css';

const Nominees = ({ list, removeFromNomineesList }) => {

  return (
    <div className="nav">
      <NavLink to="/"><div className="home-button">Home</div></NavLink>
      <div className="saved-list">
        <h3>Nominees:</h3>
        <div>
          {list.map(movie => {
            return (
              <div className='nominee-card' key={movie.imdbID}>
                <NavLink to={`/${movie.imdbID}`}>
                  <div className="saved-movie">{movie.title}</div>
                  <div className="saved-movie"><em>{movie.year}</em></div>
                  {/* <div className="saved-movie">{movie.Released}</div> */}
                </NavLink>
                <button onClick={() => removeFromNomineesList(movie)}>Remove</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
};

export default Nominees;