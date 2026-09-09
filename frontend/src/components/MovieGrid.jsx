import MovieCard from "./MovieCard";
import MovieDetailsCard from "./MovieDetailsCard";
import MovieCastCard from "./MovieCastCard";
import DirectorCard from "./DirectorCard";
import Link from "next/link";
import { getMovieTrailerUrl } from "@/services/trailer";
import { useState } from "react";
import { useEffect } from "react";

export default function MovieGrid({ searchedMovie, recommendations = [] }) {
  const [trailerUrl, setTrailerUrl] = useState(null);

    const movieId = typeof searchedMovie === "object" 
        ? searchedMovie?.id || searchedMovie?.movie_id 
        : searchedMovie;

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
    // console.log(trailerUrl)
  return (
    <div className="w-full space-y-10">
            {/*  Recommendations */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">Recommended Movies</h2>
     
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {recommendations.map((movie) => (
              <MovieCard
                key={movie.movie_id || movie.id}
                movie={movie}
              />
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">No recommendations available.</p>
        )}
      </section>
{/*   Searched Movie Info */}
{searchedMovie && (
<section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
  <h2 className="text-xl font-bold text-white mb-6">Searched Movie</h2>
  
  {/* Main Grid: items-start allows the container height to be driven by the left poster */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
    
    {/* Left Column: Natural-sized Poster (1 col on desktop) */}
    <div className="w-full max-w-xs mx-auto md:max-w-none md:col-span-1">
      <MovieCard movie={{ movie_id: searchedMovie }} />
      <div className="mt-10">
            {/* Your component JSX */}
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

    {/* Right Column: Details (Top) + Cast (Bottom) fitting within the poster's height */}
    <div className="w-full md:col-span-2 flex flex-col gap-4 self-stretch justify-between">
      
      {/* Top Half: MovieDetailsCard */}
      <div className="flex-1 min-h-0">
        <MovieDetailsCard movie={{ movie_id: searchedMovie }} />
      {/* </div> */}

      {/* Bottom Half: MovieCastCard */}
      {/* <div className="flex-1 min-h-0"> */}
        <MovieCastCard movie={{ movie_id: searchedMovie }} />
      </div>

    </div>

  </div>
</section>
)}


    </div>
  );
}