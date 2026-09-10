# Movie Recommendation System

This is a movie recommendation web application that recommends movies based on a movie selected by the user.

The recommendation system uses **content-based filtering** with **cosine similarity** and a precomputed similarity matrix. The application combines a machine-learning backend with a modern Next.js frontend and the TMDB API to provide movie information, posters, cast, and crew details.

## 🌐 Live Demo

**Frontend:**
https://mrs-frontend-zeta.vercel.app

**Backend API:**
https://mrs-backend-xaci.onrender.com

> The backend may take some time to respond after a period of inactivity because it is deployed on a free-tier service of Render.

---

## 📌 Project Overview

This app follows a content-based movie recommendation approach.

When a user searches for a movie:

1. The frontend searches the movie database.
2. The selected movie is sent to the FastAPI backend.
3. The backend finds the selected movie in the preprocessed dataset.
4. Cosine-similarity scores are used to find the most similar movies.
5. The backend returns the recommended movies and their TMDB movie IDs.
6. The Next.js frontend uses the TMDB API to retrieve additional movie information.
7. Movie posters, details, cast, and crew are displayed to the user.

### Recommendation Flow

```text
User
 │
 ▼
Next.js Frontend
 │
 │ Movie title
 ▼
FastAPI Backend
 │
 ├── movies.pkl
 └── similarity.pkl
 │
 ▼
Cosine Similarity
 │
 ▼
Recommended Movies
 │
 ▼
Next.js
 │
 ▼
TMDB API
 │
 ├── Movie Details
 ├── Poster
 ├── Cast
 └── Crew
```

---

# ✨ Features

* 🔎 Movie search with suggestions
* 🎯 Content-based movie recommendations
* 🤖 Machine-learning based similarity calculation
* 🎬 Movie details
* 🖼️ Movie posters using TMDB
* 👥 Cast information
* 🎥 Crew information
* 📊 Similarity scores
* ⚡ FastAPI backend
* ⚛️ Next.js frontend
* 🌐 REST API communication
* ☁️ Cloud deployment
* 📦 Large ML artifacts hosted separately on Hugging Face

---

# 🧠 Machine Learning

It uses **content-based filtering**.

The recommendation system was created using:

* Python
* Pandas
* NumPy
* Scikit-learn
* Cosine Similarity

The movie dataset is transformed into feature representations, and cosine similarity is used to determine how similar movies are to each other.

The similarity matrix is precomputed so recommendations can be generated without recalculating the entire similarity matrix for every request.

### Recommendation Concept

For a selected movie:

```text
Selected Movie
      ↓
Feature Representation
      ↓
Similarity Matrix
      ↓
Cosine Similarity Scores
      ↓
Top Similar Movies
```

---

# 🏗️ Technology Stack

## Frontend

* Next.js
* React
* JavaScript
* CSS / Tailwind CSS
* TMDB API

## Backend

* Python
* FastAPI
* Uvicorn
* Pandas
* NumPy
* Scikit-learn

## Machine Learning

* Content-Based Filtering
* Cosine Similarity

## Deployment

* Vercel — Frontend
* Render — Backend
* Hugging Face — ML model/data artifacts

---

# 📁 Project Structure

## Frontend

```text
frontend/
│
├── app/
│   ├── ...
│
├── components/
│   ├── ...
│
├── services/
│   ├── api.js
│   └── ...
│
├── public/
│   └── ...
│
├── package.json
├── package-lock.json
├── next.config.*
├── .gitignore
└── README.md
```

## Backend

```text
backend/
│
├── main.py
├── recommender.py
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

The large model files are intentionally not stored in the GitHub repository.

```text
movies.pkl
similarity.pkl
```

They are hosted on Hugging Face instead.

---

# 🔗 Backend API

The FastAPI backend provides endpoints for movie search and recommendations.

## Health Check

```http
GET /
```

Example:

```text
https://mrs-backend-xaci.onrender.com/
```

Response:

```json
{
  "message": "Movie Recommendation API"
}
```

## Search Movies

```http
GET /movies/search?q={query}
```

Example:

```text
/movies/search?q=Avatar
```

The endpoint returns matching movie titles from the movie dataset.

## Get Recommendations

```http
GET /recommend/{movie}
```

Example:

```text
/recommend/Avatar
```

The response contains the selected movie ID and recommended movies.

Example structure:

```json
{
  "movie": "Avatar",
  "searched_movie_id": 19995,
  "recommendations": [
    {
      "title": "Movie Name",
      "movie_id": 123,
      "similarity": 0.85
    }
  ]
}
```

---

# 🚀 Running  Locally

To run the complete application locally, you need to run both the **FastAPI backend** and the **Next.js frontend**.

---

# 1. Clone the Repo

```bash
git clone "https://github.com/Foolmannn/movie-recommender-system"
```

# 2. Setup Frontend



Enter the project:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# 3. Configure Frontend Environment Variables

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Next.js API routes require a TMDB API key. So get it from the TMDB website.

For example:

```env
TMDB_API_KEY=your_tmdb_api_key
```


---

# 3. Setup the Backend

Open another terminal.


Enter the backend directory:

```bash
cd backend
```

---

# 4. Create a Python Environment

This was developed and tested using **Python 3.12** so better to use same version.

Using Conda:

```bash
conda create -n mrsenv python=3.12
```

Activate it:

```bash
conda activate mrsenv
```

If you already have a suitable Python 3.12 environment , you can use that environment.

---

# 5. Install Backend Dependencies

Install the pinned dependencies:

```bash
pip install -r requirements.txt
```

The main dependencies include:

```text
fastapi==0.141.1
uvicorn[standard]==0.52.4
pandas==2.3.3
numpy==2.3.5
scikit-learn==1.9.0
huggingface-hub==1.30.0
python-dotenv==1.2.1
```

---

# 6. Configure Backend Environment Variables

Create:

```text
.env
```
You can run the jupyter notebook which will create the .pkl binaries which can be directly used or you can use the Hugging Face repo where I have uploaded the models. 

For model from HF add ::

```env
HF_MODEL_REPO=Foolmannn/mrs-model
FRONTEND_URL=http://localhost:3000
```

The backend uses the Hugging Face repository to download:

```text
movies.pkl
similarity.pkl
```

The model files do not need to be manually downloaded into the backend project.

If you want to use the downloaded .pkl files from the HuggingFace update the recommender.py by uncommenting the code using the Hugging face API and commenting the local file loading code .

---

# 7. Start FastAPI

From the backend directory:

```bash
uvicorn main:app --reload
```

The backend should be available at:

```text
http://127.0.0.1:8000
```

Test the API:

```bash
curl http://127.0.0.1:8000/
```

Expected response:

```json
{
  "message": "Movie Recommendation API"
}
```

You can also open the interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 8. Start the Next.js Frontend

Open another terminal.

Navigate to the frontend:

```bash
cd frontend
```

Start the development server:

```bash
npm run dev
```

The application should be available at:

```text
http://localhost:3000
```

Open the URL in your browser.


---

# ☁️ Deployment Architecture

This app is deployed using separate services for the frontend, backend, and machine-learning artifacts.

```text
                   ┌──────────────────────┐
                   │     Hugging Face     │
                   │                      │
                   │    movies.pkl        │
                   │    similarity.pkl    │
                   └──────────▲───────────┘
                              │
                              │ Download
                              │
┌─────────────────┐       ┌─────┴──────────┐
│     Vercel      │       │     Render     │
│                 │       │                │
│   Next.js       │──────▶│    FastAPI     │
│   Frontend      │ API   │  Recommender   │
└────────┬────────┘       └────────────────┘
       │
       │
       ▼
 ┌─────────────┐
 │    TMDB     │
 │     API     │
 └─────────────┘
```

### Deployment Services

| Component              | Service      |
| ---------------------- | ------------ |
| Next.js Frontend       | Vercel       |
| FastAPI Backend        | Render       |
| ML artifacts           | Hugging Face |
| Movie metadata/posters | TMDB         |

---



# 📄 License

This project is intended for educational and portfolio purposes.

Movie information and images are provided through the TMDB API. Please refer to TMDB's terms and policies for usage requirements.
