const FAVORITES_KEY = "favorites";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function toggleFavorite(item) {
  const favorites = getFavorites();
  const exists = favorites.find((fav) => fav.id === item.id);

  let updatedFavorites;

  if (exists) {
    updatedFavorites = favorites.filter((fav) => fav.id !== item.id);
  } else {
    updatedFavorites = [...favorites, item];
  }

  saveFavorites(updatedFavorites);
  return updatedFavorites;
}
