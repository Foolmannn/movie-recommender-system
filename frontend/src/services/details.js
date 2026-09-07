export async function getMovieDetails(movie_id) {
    const response = await fetch(`/api/movies/${movie_id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return response.json();
}