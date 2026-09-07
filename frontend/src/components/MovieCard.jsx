export default function MovieCard({ movie }) {

    return (
        <div className="group cursor-pointer">

            <div className="overflow-hidden rounded-xl bg-zinc-900">

                <img
                    src={movie.poster_url}
                    alt={movie.title}
                    className="
                        aspect-[2/3]
                        w-full
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                />

            </div>

            <h3 className="mt-3 truncate font-semibold">
                {movie.title}
            </h3>

            <div className="mt-1 flex gap-3 text-sm text-zinc-500">

                <span>
                    ⭐ {movie.rating ?? "N/A"}
                </span>

                <span>
                    {movie.year}
                </span>

            </div>

        </div>
    );
}