export async function getMovieTrailerUrl(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.TMDB_API_KEY}`
    );

    if (!response.ok) return null;

    const data = await response.json();

    const trailer =
      data.results?.find(
        (v) => v.site === "YouTube" && v.type === "Trailer" && v.official
      ) ||
      data.results?.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      ) ||
      data.results?.find((v) => v.site === "YouTube");

    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.error("TRAILER SERVICE ERROR:", error);
    return null;
  }
}