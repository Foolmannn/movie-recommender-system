"use client";
import Image from "next/image";
import { getMovieDetails } from "@/services/details";
import { useEffect, useState } from "react";

export default function MovieCard({ movie }) {

    const movie_id = movie.movie_id;

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


    return (
        <div className="group cursor-pointer">

            <div className="overflow-hidden rounded-xl bg-zinc-900">

                <Image
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title}
                width={500}
                height={750}
                className="
                    aspect-[2/3]
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                "
                priority
            />

            </div>


            <h3 className="mt-3 truncate font-semibold">
                {details.title}
            </h3>


            <div className="mt-1 flex gap-3 text-sm text-zinc-500">

                <span>
                    ⭐ {details.vote_average ?? "N/A"}
                </span>

                {/* <span>
                    {movie_id}
                </span> */}

            </div>

        </div>
    );
}