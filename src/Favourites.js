import React from "react";
import MovieCard from "./MovieCard";
import "./Favourites.css";

const Favourites = ({ favourites, addToFavourites, isFavourites, movies }) => {
  const favouriteMovies = movies.filter((movie) =>
    favourites.includes(movie.id)
  );

  return (
    <div>
      <h2>Favourites</h2>
      <div className="favourites-list">
        {favouriteMovies.map((movie) => (
          <div key={movie.id} className="favourite-card">
            <MovieCard
              movie={movie}
              addToFavourites={addToFavourites}
              isFavourites={isFavourites(movie.id)}
              favourites={favourites}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
