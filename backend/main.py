from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from recommender import recommend


app = FastAPI()


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
        "recommendations": recommendations
    }