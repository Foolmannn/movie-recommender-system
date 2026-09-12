"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getMovieCast } from "@/services/cast";

export default function MovieCastCard({ movie }) {
  const movie_id = movie?.movie_id;
  const [director, setDirector] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie_id) return;

    async function fetchCast() {
      try {
        setLoading(true);
        const castData = await getMovieCast(movie_id);
        setDirector(castData.directors || []);
      } catch (error) {
        console.error("Failed to load director:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movie_id]);

  if (loading) {
    return (
      <div className="w-full h-48 animate-pulse rounded-2xl bg-slate-900/80 border border-slate-800" />
    );
  }

  if (!director.length) return null;

  console.log(director)

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md text-left">
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
        Director
      </h3>

        {director.map((person) => (
          <div
            key={person.id}
            className="group bg-slate-800/40 border border-slate-800 rounded-xl overflow-hidden"
          >
            {/* Profile Image */}
            <div className="aspect-[2/3] w-full overflow-hidden bg-slate-800">
              {person.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                  alt={person.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  width={200}
                  height={300}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-slate-500 text-xs">
                  No Image
                </div>
              )}
            </div>

            {/* Cast Info */}
            <div className="p-2.5">
              <p className="text-sm font-semibold text-slate-200 truncate">
                {person.name}
              </p>

            </div>
          </div>
        ))}
      </div>
  );
}