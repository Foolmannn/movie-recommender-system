import pickle

with open("movies.pkl", "rb") as f:
    movies = pickle.load(f)

with open("similarity.pkl", "rb") as f:
    similarity = pickle.load(f)


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

    recommendations = []

    for index, score in movie_list:

        recommendations.append({
            "title": movies.iloc[index]["title"],
            "movie_id": int(movies.iloc[index]['movie_id']),
            "similarity": float(score)
        })

    return recommendations

# print(recommend('Avatar'))