const API_URL = "http://127.0.0.1:8000";

export async function getRecommendations(movie) {

    const response = await fetch(
        `${API_URL}/recommend/${encodeURIComponent(movie)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
    }

    return response.json();
}