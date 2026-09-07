import requests

url = "https://api.themoviedb.org/3/movie/550/c6OLXfKAk5BKeR6broC8pYiCquX.jpg"

headers = {
    # "Authorization": f"Bearer {TMDB_ACCESS_TOKEN}",
    "Authorization": f"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzJmMTUwOTEwMTdkNWQ5ODM1OTA0MmU4Y2RjMzc1MiIsIm5iZiI6MTc4ODc4NTIxMi42MTUsInN1YiI6IjZhOWViMjNjNDkwZGY0NDdjYTE0NDRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7fZxkTz0xFfefj10zUIE0JTYKkvRhH5OOiYY1kZzv9o",
    "accept": "application/json"
}

response = requests.get(url, headers=headers)

data = response.json()

print(data)