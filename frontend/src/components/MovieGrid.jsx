import MovieCard from "./MovieCard";
import MovieDetailsCard from "./MovieDetailsCard";
import MovieCastCard from "./MovieCastCard";

export default function MovieGrid({ searchedMovie, recommendations = [] }) {
    console.log(recommendations)
    console.log(searchedMovie)
  return (
    <div className="w-full space-y-10">
{/* Upper Half: Searched Movie Info */}
{searchedMovie && (
  <section className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-sm">
    <h2 className="text-xl font-bold text-white mb-6">Searched Movie</h2>

    {/* Main Grid: Stacks on mobile, 3-column layout on desktop */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      
      {/* Left Column: Poster on top, Details below (1 column on desktop) */}
      <div className="flex flex-col gap-6 md:col-span-1">
        <div className="w-full max-w-xs mx-auto md:max-w-none">
          <MovieCard movie={{ movie_id: searchedMovie }} />
        </div>
        <MovieDetailsCard movie={{ movie_id: searchedMovie }} />
      </div>

      {/* Right Column: Cast Card (2 columns on desktop) */}
      <div className="w-full md:col-span-2">
        <MovieCastCard movie={{ movie_id: searchedMovie }} />
      </div>

    </div>
  </section>
)}

      {/* Bottom Half: Recommendations */}
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
    </div>
  );
}