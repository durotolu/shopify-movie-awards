import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import Nominees from './Movies/Nominees';

function App() {
  const savedNominees = localStorage.getItem('nominees');
  const [nomineesList, setNomineesList] = useState(JSON.parse(savedNominees) || []);
  const [nomineesID, setNomineesID] = useState([]);

  useEffect(() => {
    localStorage.setItem('nominees', JSON.stringify(nomineesList))
  }, [nomineesList])

  const addToNomineesList = movie => {
    if (nomineesList.length < 5) {
      setNomineesList([...nomineesList, movie])
      setNomineesID([...nomineesID, movie.imdbID])
    }
  };

  const removeFromNomineesList = movie => {
    setNomineesList(
      [...nomineesList.filter((nominee) => movie.imdbID !== nominee.imdbID)]
    );
    setNomineesID(
      [...nomineesID.filter((nominee) => movie.imdbID !== nominee)]
    );
  }

  return (
    <div>
      <div className='App'>
        <Nominees list={nomineesList} removeFromNomineesList={removeFromNomineesList} />
        <Route exact path="/" render={props => <MovieList {...props} nomineesID={nomineesID} addToNomineesList={addToNomineesList} />} />
        <Route path='/:movie' component={Movie} />
      </div>
    </div>
  );
}

export default App;
