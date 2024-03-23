import React from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const MovieList = ({ movies, addToFavourites, favourites, isFavourites }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie.id}
          addToFavourites={addToFavourites}
          favourites={favourites}
          isFavourites={isFavourites(movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
