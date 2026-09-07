"use client";

import { useState } from "react";

export default function SearchBar({ onSearch, loading }) {

    const [movie, setMovie] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!movie.trim()) return;

        onSearch(movie);

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 flex w-full max-w-2xl gap-3"
        >

            <input
                type="text"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Search for a movie..."
                className="
                    flex-1
                    rounded-xl
                    border border-zinc-800
                    bg-zinc-900
                    px-5 py-4
                    text-white
                    outline-none
                    placeholder:text-zinc-600
                    focus:border-zinc-500
                "
            />

            <button
                type="submit"
                disabled={loading}
                className="
                    rounded-xl
                    bg-white
                    px-6
                    font-semibold
                    text-black
                    transition
                    hover:bg-zinc-200
                    disabled:opacity-50
                "
            >
                {loading ? "Loading..." : "Recommend"}
            </button>

        </form>
    );
}