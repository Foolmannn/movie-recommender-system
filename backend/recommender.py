import pickle

with open("movies.pkl", "rb") as f:
    movies = pickle.load(f)

with open("similarity.pkl", "rb") as f:
    similarity = pickle.load(f)

# For using model downloaded from the HF repo


# from huggingface_hub import hf_hub_download

# similarity_model_path = hf_hub_download(
#     repo_id="Foolmannn/mrs-model",
#     filename="similarity.pkl"
# )
# movies_model_path = hf_hub_download(
#     repo_id="Foolmannn/mrs-model",
#     filename="movies.pkl"
# )

# with open(similarity_model_path, "rb") as f:
#     similarity = pickle.load(f)

# with open(movies_model_path, "rb") as f:
#     movies = pickle.load(f)


def recommend(movie_title, n=5):

    movie_index = movies[
        movies["title"].str.lower() == movie_title.lower()
    ].index

    if len(movie_index) == 0:
        return []

    movie_index = movie_index[0]

    distances = similarity[movie_index]

    movie_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:n+1]

    # print(movie_list)
    searched_movie_id=int(movies.iloc[movie_index]['movie_id'])
    recommendations = []

    for index, score in movie_list:

        recommendations.append({
            "title": movies.iloc[index]["title"],
            "movie_id": int(movies.iloc[index]['movie_id']),
            "similarity": float(score)
        })

    return searched_movie_id,recommendations

# print(recommend('Avatar'))