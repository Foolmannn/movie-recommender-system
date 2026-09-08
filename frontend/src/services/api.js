// 1. Fallback to localhost if the env variable is missing or evaluated too early
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getRecommendations(movie) {
    // 2. Double check inside the function execution block
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || API_URL;
    console.log(baseUrl)
    const response = await fetch(
        `${API_URL}/recommend/${encodeURIComponent(movie)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
    }

    return response.json();
}