import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = await params;

    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
    );

    if (!response.ok) {
        return NextResponse.json(
            { error: "Movie not found" },
            { status: response.status }
        );
    }

    const data = await response.json();

    return NextResponse.json(data);
}