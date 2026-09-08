"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";


export default function SearchBar({ onSelect, onSearch, loading }) {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        // Don't search when input is empty
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        // Wait 300ms after user stops typing
        const timer = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${API_URL}/movies/search?q=${encodeURIComponent(query)}`
                );

                if (!response.ok) {
                    throw new Error("Failed to search movies");
                }

                const data = await response.json();

                setSuggestions(data);
            } catch (error) {
                console.error("Movie search error:", error);
                setSuggestions([]);
            }
        }, 300);

        // Cancel previous timer when user types again
        return () => clearTimeout(timer);

    }, [query]);


    const handleSelect = (movie) => {
        // Put selected movie name in input
        setQuery(movie.title);

        // Hide suggestions
        setSuggestions([]);

        // Send selected movie to parent
        onSelect(movie);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        // Search only if a valid movie was selected
        onSearch();
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="relative mx-auto mt-10 flex max-w-xl gap-2"
        >

            <div className="relative flex-1">

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..."
                    className="
                        w-full
                        rounded-xl
                        bg-zinc-900
                        px-4
                        py-3
                        text-white
                        outline-none
                        ring-1
                        ring-zinc-800
                        placeholder:text-zinc-500
                        focus:ring-zinc-600
                    "
                />

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <div
                        className="
                            absolute
                            left-0
                            right-0
                            top-full
                            z-50
                            mt-2
                            overflow-hidden
                            rounded-xl
                            bg-zinc-900
                            shadow-xl
                            ring-1
                            ring-zinc-800
                        "
                    >

                        {suggestions.map((movie) => (
                            <button
                                type="button"
                                key={movie.movie_id}
                                onClick={() => handleSelect(movie)}
                                className="
                                    block
                                    w-full
                                    px-4
                                    py-3
                                    text-left
                                    text-white
                                    transition
                                    hover:bg-zinc-800
                                "
                            >
                                {movie.title}
                            </button>
                        ))}

                    </div>
                )}

            </div>


            <button
                type="submit"
                disabled={loading}
                className="
                    rounded-xl
                    bg-white
                    px-5
                    py-3
                    font-semibold
                    text-black
                    transition
                    hover:bg-zinc-200
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                {loading ? "..." : "Search"}
            </button>

        </form>
    );
}
