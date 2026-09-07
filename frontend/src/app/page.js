"use client";

import { useState } from "react";

import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";

import { getRecommendations } from "@/services/api";


export default function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleSearch = async (movie) => {

        try {

            setLoading(true);
            setError("");

            const data = await getRecommendations(movie);

            setMovies(data.recommendations);

        } catch (error) {

            setError(
                "Something went wrong while getting recommendations."
            );

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
                        favorite movie.
                    </span>

                </h1>

                <p className="mx-auto mt-6 max-w-xl text-zinc-400">

                    Discover movies similar to the ones
                    you already love.

                </p>


                <SearchBar
                    onSearch={handleSearch}
                    loading={loading}
                />

            </section>


            {error && (

                <p className="text-center text-red-400">
                    {error}
                </p>

            )}


            {movies.length > 0 && (

                <section className="mx-auto max-w-7xl px-6 pb-20">

                    <h2 className="mb-6 text-2xl font-bold">
                        Recommended Movies
                    </h2>

                    <MovieGrid movies={movies} />

                </section>

            )}

        </main>
    );
}