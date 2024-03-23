import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [MovieDetails, setMovieDetails] = useState(null);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjBkMjNiNWU5OTE4NDYyZjllNmZjZDIzMGRiOGNjNSIsInN1YiI6IjY1YjkwMWY3ZGE5ZWYyMDE2M2E1OGJhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IpaYb-17ZWkq1DnAMbkZJ1Auq_aIYPxfB-AmD7s1FqE",
    },
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.request(options);
        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };
    fetchMovieDetails();
  }, [id, options]);

  if (!MovieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{MovieDetails.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${MovieDetails.poster_path}`}
        alt={MovieDetails.title}
      />
      <p>{MovieDetails.overview}</p>
      <p>Release Date: {MovieDetails.release_date}</p>
      <p>Genres: {MovieDetails.genres.map((genre) => genre.name).join(", ")}</p>
      <p>Runtime: {MovieDetails.runtime} minutes</p>
      <p>Vote Average: {MovieDetails.vote_average}</p>
      <p>Tagline: {MovieDetails.tagline}</p>
      <p>Status: {MovieDetails.status}</p>
      <p>Original Language: {MovieDetails.original_language}</p>
      <p>
        Homepage:{" "}
        <a
          href={MovieDetails.homepage}
          target="_blank"
          rel="noopener noreferrer"
        >
          {MovieDetails.homepage}
        </a>
      </p>
      <p>IMDB ID: {MovieDetails.imdb_id}</p>
      <p>Popularity: {MovieDetails.popularity}</p>
      <p>Budget: {MovieDetails.budget}</p>
      <p>Revenue: {MovieDetails.revenue}</p>
      <p>Adult: {MovieDetails.adult ? "Yes" : "No"}</p>
      <p>Video: {MovieDetails.video ? "Yes" : "No"}</p>
      <p>
        Production Companies:{" "}
        {MovieDetails.production_companies
          .map((company) => company.name)
          .join(", ")}
      </p>
      <p>
        Production Countries:{" "}
        {MovieDetails.production_countries
          .map((country) => country.name)
          .join(", ")}
      </p>
      <p>
        Spoken Languages:{" "}
        {MovieDetails.spoken_languages
          .map((language) => language.name)
          .join(", ")}
      </p>
    </div>
  );
};

export default MovieDetails;
