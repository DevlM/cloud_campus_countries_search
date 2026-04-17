import { createStore, useStore } from "@tanstack/react-store";

interface Country {
  cca2: string;
  name: {
    common: string;
    official: string;
  };
  flags: {
    svg: string;
    png: string;
    alt: string;
  };
  region: string;
  subregion: string;
}

interface FavoritesStore {
  favorites: Country[];
}

const loadFavoritesFromStorage = (): Country[] => {
  try {
    const stored = localStorage.getItem("favorites-storage");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveFavoritesToStorage = (favorites: Country[]) => {
  localStorage.setItem("favorites-storage", JSON.stringify(favorites));
};

export const favoritesStore = createStore<FavoritesStore>({
  favorites: loadFavoritesFromStorage(),
});

export const addFavorite = (country: Country) => {
  favoritesStore.setState((state) => {
    if (state.favorites.some((fav) => fav.cca2 === country.cca2)) {
      return state;
    }
    const newFavorites = [...state.favorites, country];
    saveFavoritesToStorage(newFavorites);
    return { favorites: newFavorites };
  });
};

export const removeFavorite = (cca2: string) => {
  favoritesStore.setState((state) => {
    const newFavorites = state.favorites.filter((fav) => fav.cca2 !== cca2);
    saveFavoritesToStorage(newFavorites);
    return { favorites: newFavorites };
  });
};

export const isFavorite = (cca2: string): boolean => {
  const state = favoritesStore.state;
  return state.favorites.some((fav) => fav.cca2 === cca2);
};

export const useFavoritesStore = (
  selector?: (state: FavoritesStore) => unknown,
) => {
  return useStore(favoritesStore, (state: unknown) => {
    if (selector) {
      return selector(state as FavoritesStore);
    }
    return state as FavoritesStore;
  }) as FavoritesStore;
};
