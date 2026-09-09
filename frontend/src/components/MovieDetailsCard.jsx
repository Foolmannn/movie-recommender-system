"use client";

import { useState, useEffect } from "react";
import { getMovieDetails } from "@/services/details";
import DirectorCard from "./DirectorCard";


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
<div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-left flex flex-col md:flex-row gap-6 items-stretch">
  
  {/* Single Left Column: All Details Stacked Vertically */}
  <div className="flex-1 flex flex-col justify-between gap-3 min-w-0">
    
    {/* Header: Title, Tagline, Badges */}
    <div>
      <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight line-clamp-1">
        {details.title}{" "}
        <span className="text-slate-400 font-normal">({releaseYear})</span>
      </h2>

      {details.tagline && (
        <p className="text-xm italic text-slate-400 mt-0.5 line-clamp-1">
          &quot;{details.tagline}&quot;
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-300">
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

    {/* Overview Section */}
    <div className=" border-t border-slate-800/60">
      <h3 className="text-[13px] font-bold uppercase tracking-wider text-slate-400 mb-1">
        Overview
      </h3>
      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
        {details.overview || "No overview available for this movie."}
      </p>
    </div>

    {/* Inline Key Info & Production Badges */}
    <div className="flex flex-wrap items-center gap-2 text-xs pt-2 border-t border-slate-800/60">
      <div className="bg-slate-800/40 border border-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
        <span className="text-slate-400 text-[14px] font-medium">Lang:</span>
        <span className="text-slate-200 font-semibold uppercase text-[13px]">
          {details.original_language || "N/A"}
        </span>
      </div>

      <div className="bg-slate-800/40 border border-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
        <span className="text-slate-400 text-[14px] font-medium">Revenue:</span>
        <span className="text-slate-200 font-semibold text-[14px]">
          {formatCurrency(details.revenue)}
        </span>
      </div>

      {/* Production Companies Badges */}
      {details.production_companies?.length > 0 && (
        <div className="flex flex-wrap gap-1 items-center">
          {details.production_companies.slice(0, 3).map((company) => (
            <span
              key={company.id}
              className="bg-slate-800/60 text-slate-300 px-2 py-1 rounded-md text-[12px] border border-slate-700/50 truncate max-w-[130px]"
            >
              {company.name}
            </span>
          ))}
        </div>
      )}
    </div>

    {/* Genres */}
    {details.genres?.length > 0 && (
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-800/60">
        {details.genres.map((genre) => (
          <span
            key={genre.id}
            className="text-[13px] font-medium text-slate-300 bg-slate-800/80 border border-slate-700/60 px-2 py-0.5 rounded-full"
          >
            {genre.name}
          </span>
        ))}
      </div>
    )}
  </div>

  {/* Right Column: Director Card */}
  <div className="flex-shrink-0 flex items-center justify-center">
    <DirectorCard movie={movie} />
  </div>

</div>
  );
}