"use client";

import { useEffect, useState, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function SearchBar({ onSelect, onSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // Debounced API Fetching
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_URL}/movies/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) throw new Error("Failed to search movies");

        const data = await response.json();
        setSuggestions(data);
        setIsOpen(data.length > 0);
      } catch (error) {
        console.error("Movie search error:", error);
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (movie) => {
    setQuery(movie.title);
    setSuggestions([]);
    setIsOpen(false);
    onSelect(movie);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSuggestions([]);
    setIsOpen(false);
    onSearch();
  };

  return (
    <form
      ref={searchRef}
      onSubmit={handleSubmit}
      className="relative mx-auto mt-10 flex max-w-xl gap-2"
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
          className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-white outline-none ring-1 ring-zinc-800 placeholder:text-zinc-500 focus:ring-zinc-600"
        />

        {/* Suggestions */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl bg-zinc-900 shadow-xl ring-1 ring-zinc-800">
            {suggestions.map((movie) => (
              <button
                type="button"
                key={movie.movie_id}
                onClick={() => handleSelect(movie)}
                className="block w-full px-4 py-3 text-left text-white transition hover:bg-zinc-800"
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
        className="rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "..." : "Search"}
      </button>
    </form>
  );
}