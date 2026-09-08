"use client";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";

import { getRecommendations } from "@/services/api";

export default function Home() {

    const [recommendations, setRecommendations] = useState([]);
    const [searchedMovie, setSearchedMovie] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);


    const handleSearch = async () => {

        // Make sure user selected a movie
        if (!selectedMovie) {
            setError("Please select a movie from the suggestions.");
            return;
        }

        try {

            setLoading(true);
            setError("");

            // selectedMovie is an object:
            // { movie_id: ..., title: ... }

            const data = await getRecommendations(
                selectedMovie.title
            );
            setSearchedMovie(data.searched_movie_id)
            setRecommendations(data.recommendations);

        } catch (error) {

            console.error(error);

            setError(
                "Something went wrong while getting recommendations."
            );

            setMovies([]);

        } finally {

            setLoading(false);

        }
    };


    return (
        <main className="min-h-screen bg-black text-white">

            {/* <Navbar /> */}

            <section className="px-6 pt-24 pb-16 text-center">

                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    AI Movie Recommender
                </p>

                <h1 className="mt-5 text-5xl md:text-7xl font-bold">
                    Find your next
                    <br />

                    <span className="text-zinc-500">
                    favorite movie
                    </span>
                </h1>

                <p className="mx-auto mt-6 max-w-xl text-zinc-400 font-bold">
                    Discover movies similar to the ones
                    you already love.
                </p>


                <SearchBar
                    onSearch={handleSearch}
                    loading={loading}
                    onSelect={setSelectedMovie}
                />

            </section>


            {error && (
                <p className="text-center text-red-400">
                    {error}
                </p>
            )}


            {recommendations.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-20">

               

                    {/* Pass both props directly into MovieGrid */}
                    <MovieGrid 
                        searchedMovie={searchedMovie} 
                        recommendations={recommendations} 
                    />

                </section>
            )}

        </main>
    );
}
