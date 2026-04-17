import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import type { Country } from "../types/country";
import {
  addFavorite,
  removeFavorite,
  useFavoritesStore,
} from "../store/favorites";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export const Route = createFileRoute("/search")({
  component: Search,
});

function Search() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [codeFilter, setCodeFilter] = useState("");
  const { favorites } = useFavoritesStore();

  // Load regions on mount
  useEffect(() => {
    const loadRegions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=cca2,cca3,name,flags,region,subregion",
        );
        if (!response.ok) {
          throw new Error("Failed to load countries");
        }
        const data = await response.json();
        setAllCountries(data);
        setCountries(data.slice(0, 12));
      } catch {
        setError("Échec du chargement des pays");
      } finally {
        setLoading(false);
      }
    };

    loadRegions();
  }, []);

  const handleSearch = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`,
      );
      if (!response.ok) {
        throw new Error("Country not found");
      }
      const data = await response.json();
      setAllCountries(data);
      setCountries(data);
    } catch {
      setError("Pays non trouvé. Veuillez réessayer.");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter countries based on region and code
  useEffect(() => {
    if (allCountries.length === 0) return;

    let filtered = allCountries;

    if (regionFilter && regionFilter !== "all") {
      filtered = filtered.filter((country) => country.region === regionFilter);
    }

    if (codeFilter) {
      filtered = filtered.filter(
        (country) =>
          country.cca2.toLowerCase().includes(codeFilter.toLowerCase()) ||
          country.cca3.toLowerCase().includes(codeFilter.toLowerCase()),
      );
    }

    setCountries(filtered);
  }, [regionFilter, codeFilter, allCountries]);

  // Get unique regions
  const regions = Array.from(
    new Set(allCountries.map((country) => country.region)),
  ).toSorted((a, b) => a.localeCompare(b));

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Rechercher des pays
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onSubmit={handleSearch}
        className="mb-8"
      >
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Entrez le nom d'un pays..."
            className="flex-1 px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 disabled:bg-gray-600 transition-colors"
          >
            {loading ? "Recherche..." : "Rechercher"}
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              className="block text-gray-400 text-sm mb-1"
              htmlFor="region-filter"
            >
              Filtrer par région
            </label>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-full text-white">
                <SelectValue placeholder="Toutes les régions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label
              className="block text-gray-400 text-sm mb-1"
              htmlFor="code-filter"
            >
              Filtrer par code pays
            </label>
            <input
              id="code-filter"
              type="text"
              value={codeFilter}
              onChange={(e) => setCodeFilter(e.target.value)}
              placeholder="Ex: FR, USA, DEU..."
              className="w-full px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>
      </motion.form>

      {error && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4"
        >
          {error}
        </motion.div>
      )}

      {countries.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {countries.map((country, index) => (
            <motion.div
              key={country.cca2}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
            >
              <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-700">
                <Link
                  to="/country/$code"
                  params={{
                    code: country.cca2.toLowerCase(),
                  }}
                  className="block"
                >
                  <img
                    src={country.flags.svg}
                    alt={country.flags.alt}
                    className="w-full h-40 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {country.name.common}
                  </h2>
                  <p className="text-gray-300">{country.region}</p>
                  <p className="text-gray-400 text-sm">{country.subregion}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (favorites.some((fav) => fav.cca2 === country.cca2)) {
                        removeFavorite(country.cca2);
                      } else {
                        addFavorite(country);
                      }
                    }}
                    className={`mt-3 w-full text-white px-4 py-2 rounded-lg transition-colors ${
                      favorites.some((fav) => fav.cca2 === country.cca2)
                        ? "bg-red-600 hover:bg-red-500"
                        : "bg-blue-600 hover:bg-blue-500"
                    }`}
                  >
                    {favorites.some((fav) => fav.cca2 === country.cca2)
                      ? "Supprimer des favoris"
                      : "Ajouter aux favoris"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
