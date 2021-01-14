import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import MovieList from './Movies/MovieList';
import  Movie from './Movies/Movie';

const addToSavedList = movie => {
  // setSavedList( [...savedList, movie] );
};

function App() {
  return (
    <div>
      <Route exact path="/" component={MovieList} />
      <Route path='/:movie' render={props => <Movie {...props} onclick={addToSavedList} />} />
    </div>
  );
}

export default App;
