"use client";

import { useState, useEffect } from "react";
import { getMovieDetails } from "@/services/details";


export default function MovieDetailsCard({ movie}) {
     const movie_id = movie.movie_id;
     console.log(movie_id)
 
     const [details, setDetails] = useState(null);
 
     useEffect(() => {
 
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
             <div className="aspect-[2/3] animate-pulse rounded-xl bg-zinc-900" />
         );
     }

  // Loading Skeleton




  // Extract release year & genres
  const releaseYear = details.release_date
    ? new Date(details.release_date).getFullYear()
    : "N/A";
  const runtimeHours = Math.floor(details.runtime / 60);
  const runtimeMinutes = details.runtime % 60;

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md overflow-hidden">


        {/* Right Side: Detailed Movie Information */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-4 text-left">
          {/* Header & Meta */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {details.title}{" "}
              <span className="text-slate-400 font-normal">({releaseYear})</span>
            </h2>

            {details.tagline && (
              <p className="text-sm italic text-slate-400 mt-1">
                &quot;{details.tagline}&quot;
              </p>
            )}

            {/* Quick Stats: Rating, Runtime, Status */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm text-slate-300">
              {details.vote_average > 0 && (
                <span className="flex items-center gap-1 font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                  ★ {details.vote_average.toFixed(1)}
                </span>
              )}

              {details.runtime > 0 && (
                <span className="bg-slate-800 px-2.5 py-1 rounded-md">
                  {runtimeHours}h {runtimeMinutes}m
                </span>
              )}

              <span className="bg-slate-800 px-2.5 py-1 rounded-md capitalize">
                {details.status}
              </span>
            </div>

            {/* Genres */}
            {details.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {details.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="text-xs font-medium text-slate-300 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Overview / Plot */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Overview
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-h-36 overflow-y-auto pr-1">
              {details.overview || "No overview available for this movie."}
            </p>
          </div>
          {/* Details */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Overview
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-h-36 overflow-y-auto pr-1">
              {details.overview || "No overview available for this movie."}
            </p>
          </div>
        </div>
      </div>

  );
}