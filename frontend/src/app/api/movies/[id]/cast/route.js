export async function GET(request, { params }) {
    try {
        const { id } = await params;

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
        );

        if (!response.ok) {
            return Response.json(
                { error: "TMDB request failed" },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Top 10 Cast Members
        const cast = (data.cast || []).slice(0, 10).map((person) => ({
            id: person.id,
            name: person.name,
            character: person.character,
            profile_path: person.profile_path,
        }));

        // Extract Directors from Crew
        const directors = (data.crew || [])
            .filter((person) => person.job === "Director")
            .map((person) => ({
                id: person.id,
                name: person.name,
                job: person.job,
                profile_path: person.profile_path,
            }));

        // Return combined credits object
        return Response.json({
            cast,
            directors,
        });

    } catch (error) {
        console.error("CREDITS API ERROR:", error);

        return Response.json(
            { error: "Failed to fetch credits" },
            { status: 500 }
        );
    }
}