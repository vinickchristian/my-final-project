import { TMDB_IMAGE_BASE } from "./config.js";

export function renderCards(items, container) {
  container.innerHTML = "";

  if (!items.length) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-image">
        ${
          item.poster_path
            ? `<img src="${TMDB_IMAGE_BASE}${item.poster_path}" alt="${item.title || item.name} poster">`
            : ""
        }
      </div>
      <h3>${item.title || item.name}</h3>
      <p>⭐ ${item.vote_average || "N/A"}</p>
    `;

    container.appendChild(card);
  });
}
