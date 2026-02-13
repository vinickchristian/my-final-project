import { TMDB_API_KEY, TMDB_BASE_URL } from "./config.js";

async function fetchFromTMDB(endpoint) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}${endpoint}&api_key=${TMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error("TMDB request failed");
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("TMDB Error:", error);
    return [];
  }
}


export function getTrendingMovies() {
  return fetchFromTMDB("/trending/movie/week?");
}

export function getTrendingTVShows() {
  return fetchFromTMDB("/trending/tv/week?");
}


export async function searchTMDB(query, type = "movie") {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/${type}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
