// "use client";
// import { useState } from "react";

// import SearchBar from "@/components/SearchBar";
// import MovieGrid from "@/components/MovieGrid";

// import { getRecommendations } from "@/services/api";

// export default function Home() {

//     const [recommendations, setRecommendations] = useState([]);
//     const [searchedMovie, setSearchedMovie] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [selectedMovie, setSelectedMovie] = useState(null);


//     const handleSearch = async () => {

//         // Make sure user selected a movie
//         if (!selectedMovie) {
//             setError("Please select a movie from the suggestions.");
//             return;
//         }

//         try {

//             setLoading(true);
//             setError("");

//             // selectedMovie is an object:
//             // { movie_id: ..., title: ... }

//             const data = await getRecommendations(
//                 selectedMovie.title
//             );
//             setSearchedMovie(data.searched_movie_id)
//             setRecommendations(data.recommendations);

//         } catch (error) {

//             console.error(error);

//             setError(
//                 "Something went wrong while getting recommendations."
//             );

//             setMovies([]);

//         } finally {

//             setLoading(false);

//         }
//     };


//     return (
//         <main className="min-h-screen bg-black text-white">


//             <section className="px-6 pt-3 pb-7 text-center">

//                 <h1 className="mt-5 text-5xl md:text-6xl font-bold">
//                     Find your next
//                     <br />

//                     <span className="text-zinc-500">
//                     favorite movie
//                     </span>
//                 </h1>

//                 <p className="mx-auto mt-4 max-w-xl text-zinc-400 font-bold">
//                     Discover movies similar to the ones
//                     you already love.
//                 </p>


//                 <SearchBar
//                     onSearch={handleSearch}
//                     loading={loading}
//                     onSelect={setSelectedMovie}
//                 />

//             </section>


//             {error && (
//                 <p className="text-center text-red-400">
//                     {error}
//                 </p>
//             )}


//             {recommendations.length > 0 && (
//                 <section className="mx-auto max-w-7xl px-6 pb-20">

               

//                     {/* Pass both props directly into MovieGrid */}
//                     <MovieGrid 
//                         searchedMovie={searchedMovie} 
//                         recommendations={recommendations} 
//                     />

//                 </section>
//             )}

//         </main>
//     );
// }


"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import { getRecommendations } from "@/services/api";

export default function Home() {
    const [recommendations, setRecommendations] = useState([]);
    const [searchedMovie, setSearchedMovie] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (movieTitle) => {
        // Make sure user actually typed something
        if (!movieTitle || !movieTitle.trim()) {
            setError("Please enter a movie name.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setRecommendations([]);

            // Search using whatever the user typed
            const data = await getRecommendations(movieTitle.trim());

            console.log("Recommendation response:", data);

            // Backend found the movie
            setSearchedMovie(data.searched_movie_id);
            setRecommendations(data.recommendations || []);

        } catch (error) {
            console.error("Recommendation error:", error);

            // Handle different types of errors
            if (error.message === "MOVIE_NOT_FOUND") {
                setError(
                    `"${movieTitle}" was not found. Please check the movie name and try again.`
                );
            } else if (error.message === "BACKEND_UNAVAILABLE") {
                setError(
                    "The recommendation server is waking up. Please wait a few seconds and try again."
                );
            } else {
                setError(
                    "Unable to connect to the recommendation server. It may be waking up. Please wait and try again."
                );
            }

            setSearchedMovie("");
            setRecommendations([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white">

            <section className="px-6 pt-3 pb-7 text-center">

                <h1 className="mt-5 text-5xl md:text-6xl font-bold">
                    Find your next
                    <br />

                    <span className="text-zinc-500">
                        favorite movie
                    </span>
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-zinc-400 font-bold">
                    Discover movies similar to the ones
                    you already love.
                </p>

                <SearchBar
                    onSearch={handleSearch}
                    loading={loading}
                />

            </section>


            {error && (
                <div className="mx-auto max-w-xl px-6">

                    <div className="rounded-xl border border-yellow-900/50 bg-yellow-950/30 p-4 text-center">

                        <p className="text-yellow-400 font-semibold">
                            {error}
                        </p>

                    </div>

                </div>
            )}


            {recommendations.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-20">

                    <MovieGrid
                        searchedMovie={searchedMovie}
                        recommendations={recommendations}
                    />

                </section>
            )}

        </main>
    );
}