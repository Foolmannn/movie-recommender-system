"use client";

import MovieCard from "./MovieCard";
import MovieDetailsCard from "./MovieDetailsCard";
import MovieCastCard from "./MovieCastCard";
import { useState, useEffect } from "react";
import { getRecommendations } from "@/services/api";

export default function MovieGrid({
  searchedMovie: initialSearchedMovie,
  recommendations: initialRecommendations = [],
}) {
  const [searchedMovie, setSearchedMovie] = useState(initialSearchedMovie);
  const [recommendations, setRecommendations] = useState(
    initialRecommendations
  );
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const movieId =
    typeof searchedMovie === "object"
      ? searchedMovie?.id || searchedMovie?.movie_id
      : searchedMovie;

  // Fetch trailer whenever selected movie changes
  useEffect(() => {
    if (!movieId) return;

    async function fetchTrailer() {
      try {
        const res = await fetch(`/api/movies/${movieId}/trailer`);

        if (res.ok) {
          const data = await res.json();
          setTrailerUrl(data.url);
        } else {
          setTrailerUrl(null);
        }
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
        setTrailerUrl(null);
      }
    }

    fetchTrailer();
  }, [movieId]);

  // When recommendation is clicked
  const handleRecommendationClick = async (movie) => {
    try {
      setLoadingRecommendations(true);

      // Make clicked movie the new searched movie
      setSearchedMovie(movie);

     // Get recommendations
      const data = await getRecommendations(
        movie.title 
      );

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      setRecommendations([]);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  return (
    <div className="w-full space-y-10">

      {/* Recommendations */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">
          Recommended Movies
        </h2>

        {loadingRecommendations ? (
          <p className="text-slate-400">
            Loading recommendations...
          </p>
        ) : recommendations.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

            {recommendations.map((movie) => (
              <div
                key={movie.movie_id || movie.id}
                onClick={() => handleRecommendationClick(movie)}
                className="cursor-pointer"
              >
                <MovieCard movie={movie} />
              </div>
            ))}

          </div>
        ) : (
          <p className="text-slate-400 text-sm">
            No recommendations available.
          </p>
        )}
      </section>


      {/* Searched Movie Info */}
      {searchedMovie && (
        <section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">

          <h2 className="text-xl font-bold text-white mb-6">
            Searched Movie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* Left Column */}
            <div className="w-full max-w-xs mx-auto md:max-w-none md:col-span-1">

              <MovieCard
                movie={
                  typeof searchedMovie === "object"
                    ? searchedMovie
                    : { movie_id: searchedMovie }
                }
              />

              <div className="mt-10">
                {trailerUrl && (
                  <a
                    href={trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-4 rounded-lg transition-colors"
                  >
                    ▶ Watch Trailer on YouTube
                  </a>
                )}
              </div>

            </div>


            {/* Right Column */}
            <div className="w-full md:col-span-2 flex flex-col gap-4 self-stretch justify-between">

              <div className="flex-1 min-h-0">
                <MovieDetailsCard
                  movie={
                    typeof searchedMovie === "object"
                      ? searchedMovie
                      : { movie_id: searchedMovie }
                  }
                />

                <MovieCastCard
                  movie={
                    typeof searchedMovie === "object"
                      ? searchedMovie
                      : { movie_id: searchedMovie }
                  }
                />
              </div>

            </div>

          </div>
        </section>
      )}

    </div>
  );
}