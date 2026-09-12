// 1. Fallback to localhost if the env variable is missing or evaluated too early
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// export async function getRecommendations(movie) {
//     // 2. Double check inside the function execution block
//     const baseUrl = process.env.NEXT_PUBLIC_API_URL || API_URL;
//     console.log(baseUrl)
//     const response = await fetch(
//         `${API_URL}/recommend/${encodeURIComponent(movie)}`
//     );

//     if (!response.ok) {
//         throw new Error("Failed to fetch recommendations");
//     }

//     return response.json();
// }

export async function getRecommendations(movieTitle) {

    const url =
        `${API_URL}/recommend/${encodeURIComponent(movieTitle)}`;

    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {

        try {

            const res = await fetch(url);

            if (res.status === 404) {
                throw new Error("MOVIE_NOT_FOUND");
            }

            if (res.ok) {
                return await res.json();
            }

        } catch (error) {

            if (error.message === "MOVIE_NOT_FOUND") {
                throw error;
            }

            console.log(
                `Backend attempt ${attempt}/${maxAttempts} failed`
            );
        }

        // Wait before retry
        if (attempt < maxAttempts) {
            await new Promise((resolve) =>
                setTimeout(resolve, 5000)
            );
        }
    }

    throw new Error("BACKEND_UNAVAILABLE");
}