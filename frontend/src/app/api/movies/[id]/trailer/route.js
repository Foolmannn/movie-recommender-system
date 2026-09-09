import { getMovieTrailerUrl } from "@/services/trailer";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const youtubeUrl = await getMovieTrailerUrl(id);

    if (!youtubeUrl) {
      return Response.json(
        { error: "No trailer found" },
        { status: 404 }
      );
    }

    return Response.json({ url: youtubeUrl });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch trailer" },
      { status: 500 }
    );
  }
}