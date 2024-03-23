import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie, addToFavourites, favourites, isFavourites }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
      />
      <h3>{movie.title}</h3>
      <button onClick={() => addToFavourites(movie.id)}>
        {isFavourites ? "Remove from Favourites" : "Add to Favourites"}
      </button>
      <Link to={`/movie/${movie.id}`}>Read More</Link>
    </div>
  );
};

export default MovieCard;
