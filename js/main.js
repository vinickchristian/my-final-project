import { getFavorites } from "./storage.js";

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
  
let allMovies = [];
let allTVShows = [];
function applyFilters() {
  const minRating = Number(ratingFilter.value);
  const type = typeFilter.value;

  const filteredMovies = allMovies.filter(
    (movie) => movie.vote_average >= minRating
  );

  const filteredTV = allTVShows.filter(
    (show) => show.vote_average >= minRating
  );

  if (type === "movie") {
    renderCards(filteredMovies, moviesContainer, "movie");
    tvContainer.innerHTML = "";
  } else if (type === "tv") {
    moviesContainer.innerHTML = "";
    renderCards(filteredTV, tvContainer, "tv");
  } else {
    renderCards(filteredMovies, moviesContainer, "movie");
    renderCards(filteredTV, tvContainer, "tv");
  }
}


  // Fetch and render trending movies
 allMovies = await getTrendingMovies();
allTVShows = await getTrendingTVShows();

renderCards(allMovies, moviesContainer, "movie");
renderCards(allTVShows, tvContainer, "tv");

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
  const favoritesContainer = document.getElementById("favorites-container");
const favoritesBtn = document.getElementById("nav-favorites");

favoritesBtn.addEventListener("click", () => {
  const favorites = getFavorites();
  favoritesSection.classList.remove("hidden");
  searchResults.classList.add("hidden");

  renderCards(favorites, favoritesContainer);
});
const ratingFilter = document.getElementById("rating-filter");
const typeFilter = document.getElementById("type-filter");


ratingFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);



});
