"use client";

import { useState, useEffect } from "react";

import { getMovieDetails } from "@/services/details";
import { getMovieCast } from "@/services/cast";

export default function MovieDetailsCard({ movie }) {
    const movie_id = movie?.movie_id;

    const [details, setDetails] = useState(null);
    const [cast, setCast] = useState([]);

    useEffect(() => {
        if (!movie_id) return;

        async function fetchDetails() {
            try {
                const data = await getMovieDetails(movie_id);
                const castData = await getMovieCast(movie_id);

                setDetails(data);
                setCast(castData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchDetails();
    }, [movie_id]);

    if (!details) {
        return (
            <div className="w-full h-80 animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
        );
    }

    const releaseYear = details.release_date
        ? new Date(details.release_date).getFullYear()
        : "N/A";

    const runtimeHours = Math.floor(details.runtime / 60);
    const runtimeMinutes = details.runtime % 60;

    return (
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-left">

            <div className="flex flex-col space-y-6">

                {/* Header & Tagline */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {details.title}{" "}
                        <span className="text-slate-400 font-normal">
                            ({releaseYear})
                        </span>
                    </h2>

                    {details.tagline && (
                        <p className="text-sm italic text-slate-400 mt-1">
                            &quot;{details.tagline}&quot;
                        </p>
                    )}

                    {/* Quick Stats */}
                    <div className="flex flex-wrap items-center gap-2.5 mt-3 text-xs sm:text-sm text-slate-300">

                        {details.vote_average > 0 && (
                            <span className="flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                                ★ {details.vote_average.toFixed(1)}
                            </span>
                        )}

                        {details.runtime > 0 && (
                            <span className="bg-slate-800/80 border border-slate-700/50 px-2.5 py-1 rounded-md">
                                {runtimeHours}h {runtimeMinutes}m
                            </span>
                        )}

                        {details.status && (
                            <span className="bg-slate-800/80 border border-slate-700/50 px-2.5 py-1 rounded-md capitalize">
                                {details.status}
                            </span>
                        )}
                    </div>

                    {/* Genres */}
                    {details.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {details.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2.5 py-1 rounded-full"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Overview Section */}
                <div className="pt-4 border-t border-slate-800/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Overview
                    </h3>

                    <p className="text-slate-300 text-sm leading-relaxed max-h-36 overflow-y-auto pr-1">
                        {details.overview ||
                            "No overview available for this movie."}
                    </p>
                </div>

                {/* Technical Details Grid */}
                <div className="pt-4 border-t border-slate-800/80">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Key Info
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">

                        <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">
                            <span className="text-slate-400 font-medium block">
                                Original Language
                            </span>

                            <span className="text-slate-200 font-semibold uppercase mt-0.5 block">
                                {details.original_language || "N/A"}
                            </span>
                        </div>

                        <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">
                            <span className="text-slate-400 font-medium block">
                                TMDB ID
                            </span>

                            <span className="text-slate-200 font-semibold mt-0.5 block">
                                {details.id}
                            </span>
                        </div>

                        {details.production_companies?.length > 0 && (
                            <div className="sm:col-span-2 bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">

                                <span className="text-slate-400 font-medium block mb-1">
                                    Production Companies
                                </span>

                                <div className="flex flex-wrap gap-1.5">
                                    {details.production_companies.map(
                                        (company) => (
                                            <span
                                                key={company.id}
                                                className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[11px] border border-slate-700/50"
                                            >
                                                {company.name}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Cast Section */}
                {cast?.length > 0 && (
                    <div className="pt-4 border-t border-slate-800/80">

                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                            Cast
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">

                            {cast.map((person) => (
                                <div
                                    key={person.id}
                                    className="group bg-slate-800/40 border border-slate-800 rounded-xl overflow-hidden"
                                >

                                    {/* Profile Image */}
                                    <div className="aspect-[2/3] w-full overflow-hidden bg-slate-800">
                                        {person.profile_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                                                alt={person.name}
                                                className="
                                                    h-full
                                                    w-full
                                                    object-cover
                                                    transition-transform
                                                    duration-300
                                                    group-hover:scale-105
                                                "
                                            />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-slate-500 text-xs">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* Cast Information */}
                                    <div className="p-2.5">

                                        <p className="text-sm font-semibold text-slate-200 truncate">
                                            {person.name}
                                        </p>

                                        <p className="text-xs text-slate-400 truncate mt-0.5">
                                            {person.character || "Unknown role"}
                                        </p>

                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

