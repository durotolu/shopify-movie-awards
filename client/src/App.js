import './App.css';

import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import Nominees from './Movies/Nominees';
import cinema from "./image/cinema.jpg";

function App() {
  const savedNominees = localStorage.getItem('nominees');
  const [nomineesList, setNomineesList] = useState(JSON.parse(savedNominees) || []);
  const [nomineesID, setNomineesID] = useState([]);
  const [nominationFull, setNominationFull] = useState(false);

  useEffect(() => {
    localStorage.setItem('nominees', JSON.stringify(nomineesList))
    if (nomineesList.length >= 5) {
      setNominationFull(true)
    } else {
      setNominationFull(false)
    }
  }, [nomineesList])

  const notify = (message) => toast(message);

  const addToNomineesList = movie => {
    if (nomineesList.length < 5) {
      setNomineesList([...nomineesList, movie])
      setNomineesID([...nomineesID, movie.imdbID])
      notify(`${movie.title} (${movie.year}) added to nominees list`);
    } else {
      notify(`Cannot add ${movie.title} (${movie.year}), maximum nominees reached`);
    }
  };

  const removeFromNomineesList = movie => {
    setNomineesList(
      [...nomineesList.filter((nominee) => movie.imdbID !== nominee.imdbID)]
    );
    setNomineesID(
      [...nomineesID.filter((nominee) => movie.imdbID !== nominee)]
    );
    notify(`${movie.title} (${movie.year}) removed from nominees list`);
  }

  return (
    <div>
      <ToastContainer 
        style={{color: "red"}}
      />
      <div className='banner' hidden={nomineesList.length < 5 ? true : false}>
        <img className='banner-img' src={cinema} alt="cinema" />
        <div class="centered">Nomination Complete</div>
      </div>
      <div className='App'>
        <Nominees list={nomineesList} removeFromNomineesList={removeFromNomineesList} />
        <Route exact path="/" render={props => <MovieList {...props} nomineesID={nomineesID} addToNomineesList={addToNomineesList} nominationFull={nominationFull} nomineesList={nomineesList} notify={notify} />} />
        <Route path='/:movie' render={props => <Movie {...props} notify={notify} addToNomineesList={addToNomineesList} nomineesList={nomineesList} nominationFull={nominationFull} />} />
      </div>
    </div>
  );
}

export default App;
