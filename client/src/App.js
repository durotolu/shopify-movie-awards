import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom';
import MovieList from './Movies/MovieList';

function App() {
  return (
    <div>
      <Route exact path="/" component={MovieList} />
    </div>
  );
}

export default App;
