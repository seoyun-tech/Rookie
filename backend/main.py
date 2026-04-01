from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TMDB_KEY = os.getenv("TMDB_API_KEY")

@app.get("/api/kids/recommend")
def kids_recommend():
    res = requests.get(
        "https://api.themoviedb.org/3/discover/movie",
        params={
            "api_key": TMDB_KEY,
            "language": "ko-KR",
            "with_genres": "16,10751",
            "certification_country": "US",
            "certification.lte": "G",
            "include_adult": "false",
            "sort_by": "popularity.desc",
        }
    )
    return res.json()