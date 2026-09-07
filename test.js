async function getRecommendation() {
  try {
    const response = await fetch("http://127.0.0.1:8000/recommend/Batman");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getRecommendation();