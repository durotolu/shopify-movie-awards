import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nominees.css';
import {
  FacebookShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon
} from "react-share";

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
                  <div>
                    <FacebookShareButton
                      url={`https://shopify-movie-awards.durotolu.vercel.app/${movie.imdbID}`}
                      hashtag={`#${movie.title}`}
                      quote="Get in!"
                    >
                      <FacebookIcon size={30} round={true} />
                    </FacebookShareButton>
                    <LinkedinShareButton
                      url={`https://shopify-movie-awards.durotolu.vercel.app/${movie.imdbID}`}
                      title={`Awesome Movie! #${movie.title}`}
                      summary="Go check it out"
                      source="https://shopify-movie-awards.durotolu.vercel.app/"
                    >
                      <LinkedinIcon size={30} round={true} />
                    </LinkedinShareButton>
                    <TwitterShareButton
                      url={`https://shopify-movie-awards.durotolu.vercel.app/${movie.imdbID}`}
                      hashtags={["omdbapi", `${movie.title}`]}
                      title="Awesome Movie!"
                    >
                      <TwitterIcon size={30} round={true} />
                    </TwitterShareButton>
                  </div>
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