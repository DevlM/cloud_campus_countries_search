import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  addFavorite: (country: Country) => void;
  removeFavorite: (cca2: string) => void;
  isFavorite: (cca2: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (country) => {
        set((state) => {
          if (state.favorites.some((fav) => fav.cca2 === country.cca2)) {
            return state;
          }
          return { favorites: [...state.favorites, country] };
        });
      },
      removeFavorite: (cca2) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.cca2 !== cca2),
        }));
      },
      isFavorite: (cca2) => {
        return get().favorites.some((fav) => fav.cca2 === cca2);
      },
    }),
    {
      name: "favorites-storage",
    },
  ),
);
