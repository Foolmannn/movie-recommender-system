from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import pickle

from recommender import recommend

app = FastAPI()

# Load movies once when FastAPI starts
movies = pickle.load(open("movies.pkl", "rb"))

# Create normalized title column for searching
movies["title_lower"] = movies["title"].str.lower()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","http://localhost:3000",
    "http://127.0.0.1:3000",],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Movie Recommendation API"
    }


@app.get("/recommend/{movie}")
def get_recommendations(movie: str):

    recommendations = recommend(movie)

    return {
        "movie": movie,
        "searched_movie_id":recommendations[0],
        "recommendations": recommendations[1]
    }

@app.get("/movies/search")
def search_movies(q: str = Query(..., min_length=1)):

    query = q.strip().lower()

    results = movies[
        movies["title_lower"].str.contains(
            query,
            na=False,
            regex=False
        )
    ][["movie_id", "title"]].head(10)

    return results.to_dict(orient="records")