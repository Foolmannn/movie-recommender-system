export async function getMovieCast(movieId) {
    const response = await fetch(`/api/movies/${movieId}/cast`);

    if (!response.ok) {
        throw new Error("Failed to fetch cast");
    }

    return response.json();
}