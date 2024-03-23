import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import MovieList from "./MovieList";
import Favourites from "./Favourites";
import SearchBar from "./SearchBar";
import MovieDetails from "./MovieDetails";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const isFavourites = (movieId) => {
    return favourites.includes(movieId);
  };

  const options = {
    method: "GET",
    url: "https://api.themoviedb.org/3/movie/popular",
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjBkMjNiNWU5OTE4NDYyZjllNmZjZDIzMGRiOGNjNSIsInN1YiI6IjY1YjkwMWY3ZGE5ZWYyMDE2M2E1OGJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IpaYb-17ZWkq1DnAMbkZJ1Auq_aIYPxfB-AmD7s1FqE",
    },
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        axios
          .request(options)
          .then(function (response) {
            console.log(response.data);
            setMovies(response.data.results);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log("Error Fetching Movies:", error);
      }
    };
    fetchMovies();
  }, []);

  const addToFavourites = (movieId) => {
    if (favourites.includes(movieId)) {
      setFavourites(favourites.filter((id) => id !== movieId));
    } else {
      setFavourites([...favourites, movieId]);
    }
  };

  const searchMovies = async (query) => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/search/movie",
      params: {
        query: query,
        include_adult: "false",
        language: "en-US",
        page: "1",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjBkMjNiNWU5OTE4NDYyZjllNmZjZDIzMGRiOGNjNSIsInN1YiI6IjY1YjkwMWY3ZGE5ZWYyMDE2M2E1OGJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IpaYb-17ZWkq1DnAMbkZJ1Auq_aIYPxfB-AmD7s1FqE",
      },
    };

    try {
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setSearchResults(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("Error Searching Movies:", error);
    }
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li>
              <Link to="/" className="home-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favourites" className="favourites-link">
                Favourites
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={searchResults.length > 0 ? searchResults : movies}
                favourites={favourites}
                addToFavourites={addToFavourites}
                searchMovies={searchMovies}
                isFavourites={isFavourites}
              />
            }
          />
          <Route
            path="/favourites"
            element={
              <Favourites
                favourites={favourites}
                movies={movies}
                addToFavourites={addToFavourites}
                isFavourites={isFavourites}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = ({
  movies,
  addToFavourites,
  favourites,
  searchMovies,
  isFavourites,
}) => {
  return (
    <div className="home">
      <SearchBar onSearch={searchMovies} />
      <MovieList
        movies={movies}
        addToFavourites={addToFavourites}
        favourites={favourites}
        isFavourites={isFavourites}
      />
    </div>
  );
};

export default App;
