// 1. Fallback to localhost if the env variable is missing or evaluated too early
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function searchMovies(query) {
        // 2. Double check inside the function execution block
    const response = await fetch(
        `${API_URL}/movies/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Failed to search movies");
    }

    return response.json();
}