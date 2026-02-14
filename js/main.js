import {
  getTrendingMovies,
  getTrendingTVShows,
  searchTMDB,
} from "./api.js";
import { renderCards } from "./ui.js";

document.addEventListener("DOMContentLoaded", async () => {
  const moviesContainer = document.getElementById("movies-container");
  const tvContainer = document.getElementById("tv-container");
  const resultsContainer = document.getElementById("results-container");

  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  const favoritesSection = document.getElementById("favorites-section");

  // Fetch and render trending movies
  const movies = await getTrendingMovies();
  console.log("Movies fetched:", movies);
  renderCards(movies, moviesContainer);

  // Fetch and render trending TV shows
  const tvShows = await getTrendingTVShows();
  console.log("TV Shows fetched:", tvShows);
  renderCards(tvShows, tvContainer);

  // Search functionality
  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    if (!query) {
      searchResults.classList.add("hidden");
      return;
    }

    const results = await searchTMDB(query, "movie");
    searchResults.classList.remove("hidden");
    favoritesSection.classList.add("hidden");

    renderCards(results, resultsContainer);
  });
});
