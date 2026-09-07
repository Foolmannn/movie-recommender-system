const API_URL = "http://localhost:8000";

export async function searchMovies(query) {
    const response = await fetch(
        `${API_URL}/movies/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    return response.json();
}