import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useFavoritesStore, removeFavorite } from "../store/favorites";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { favorites } = useFavoritesStore();

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-white mb-6"
      >
        Mes favoris
      </motion.h1>

      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-xl mb-4">
            Vous n'avez pas encore de pays favoris
          </p>
          <Link
            to="/search"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Rechercher des pays
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {favorites.map((country, index) => (
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
                    onClick={() => removeFavorite(country.cca2)}
                    className="mt-3 w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
                  >
                    ❤️ Supprimer des favoris
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
