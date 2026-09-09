"use client";

import { useState, useEffect } from "react";
import { getMovieDetails } from "@/services/details";

export default function MovieDetailsCard({ movie }) {
  const movie_id = movie?.movie_id;
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!movie_id) return;

    async function fetchDetails() {
      try {
        const data = await getMovieDetails(movie_id);
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchDetails();
  }, [movie_id]);

  if (!details) {
    return (
      <div className="w-full h-full min-h-[220px] animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
    );
  }

  const releaseYear = details.release_date
    ? new Date(details.release_date).getFullYear()
    : "N/A";

  const runtimeHours = Math.floor(details.runtime / 60);
  const runtimeMinutes = details.runtime % 60;

  const formatCurrency = (amount) =>
    amount > 0
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(amount)
      : "N/A";

  return (
<div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-left flex flex-col md:flex-row gap-6">
  
  {/* Left Column: Title, Stats, Overview, Genres */}
  <div className="w-full md:w-1/2 flex flex-col gap-3 pr-0 md:pr-4 md:border-r border-slate-800/80">
    <div>
      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight line-clamp-2">
        {details.title}{" "}
        <span className="text-slate-400 font-normal">({releaseYear})</span>
      </h2>

      {details.tagline && (
        <p className="text-xs italic text-slate-400 mt-1 line-clamp-1">
          &quot;{details.tagline}&quot;
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-slate-300">
        {details.vote_average > 0 && (
          <span className="flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            ★ {details.vote_average.toFixed(1)}
          </span>
        )}

        {details.runtime > 0 && (
          <span className="bg-slate-800/80 border border-slate-700/50 px-2 py-0.5 rounded">
            {runtimeHours}h {runtimeMinutes}m
          </span>
        )}

        {details.status && (
          <span className="bg-slate-800/80 border border-slate-700/50 px-2 py-0.5 rounded capitalize">
            {details.status}
          </span>
        )}
      </div>
    </div>

    {/* Overview moved here to fill left column space */}
    <div className="pt-2 border-t border-slate-800/60">
      <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
        Overview
      </h3>
      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3 overflow-y-auto pr-1">
        {details.overview || "No overview available for this movie."}
      </p>
    </div>

    {/* Genres at bottom of left column */}
    {details.genres?.length > 0 && (
      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60 mt-auto">
        {details.genres.map((genre) => (
          <span
            key={genre.id}
            className="text-[11px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-full"
          >
            {genre.name}
          </span>
        ))}
      </div>
    )}
  </div>

  {/* Right Column: Key Info & Production Companies */}
  <div className="w-full md:w-1/2 flex flex-col justify-center gap-2.5">
    <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
      Key Info
    </h3>

    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">
        <span className="text-slate-400 text-[10px] font-medium block">Language</span>
        <span className="text-slate-200 font-semibold uppercase block mt-0.5">
          {details.original_language || "N/A"}
        </span>
      </div>

      <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg">
        <span className="text-slate-400 text-[10px] font-medium block">Revenue</span>
        <span className="text-slate-200 font-semibold block truncate mt-0.5">
          {formatCurrency(details.revenue)}
        </span>
      </div>
    </div>

    {details.production_companies?.length > 0 && (
      <div className="bg-slate-800/40 border border-slate-800 p-2.5 rounded-lg text-xs">
        <span className="text-slate-400 text-[10px] font-medium block mb-1.5">
          Production
        </span>
        <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-1">
          {details.production_companies.map((company) => (
            <span
              key={company.id}
              className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] border border-slate-700/50 truncate max-w-[150px]"
            >
              {company.name}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>

</div>
  );
}