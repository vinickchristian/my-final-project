import { TMDB_IMAGE_BASE } from "./config.js";
import { getFavorites, toggleFavorite } from "./storage.js";
import { getWatchProviders } from "./api.js";

export function renderCards(items, container, type = "movie") {
  container.innerHTML = "";

  if (!items.length) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  const favorites = getFavorites();

  items.forEach((item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-image">
        ${
          item.poster_path
            ? `<img src="${TMDB_IMAGE_BASE}${item.poster_path}" alt="${item.title || item.name} poster">`
            : ""
        }
        <button class="favorite-btn" aria-label="Toggle favorite">
          ${isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <h3>${item.title || item.name}</h3>
      <p>⭐ ${item.vote_average || "N/A"}</p>
      <button class="details-btn">Where to watch</button>
      <div class="providers hidden"></div>
    `;

    // Favorite toggle
    card.querySelector(".favorite-btn").addEventListener("click", () => {
      toggleFavorite({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        vote_average: item.vote_average,
      });
    });

    // Watch providers
    const detailsBtn = card.querySelector(".details-btn");
    const providersDiv = card.querySelector(".providers");

    detailsBtn.addEventListener("click", async () => {
      const providers = await getWatchProviders(item.id, type);
      const country = providers.US || providers.FR;

      providersDiv.classList.toggle("hidden");

      providersDiv.innerHTML = country?.flatrate
        ? `<p>Available on: ${country.flatrate
            .map((p) => p.provider_name)
            .join(", ")}</p>`
        : "<p>No streaming info available.</p>";
    });

    container.appendChild(card);
  });
}
