import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import type { Country } from "../types/country";
import { addFavorite, removeFavorite, isFavorite } from "../store/favorites";

export const Route = createFileRoute("/country/$code")({
  component: CountryDetail,
});

function CountryDetail() {
  const { code } = Route.useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`,
        );
        if (!response.ok) {
          throw new Error("Country not found");
        }
        const data = await response.json();
        setCountry(data[0]);
      } catch {
        setError("Échec du chargement des détails du pays");
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [code]);

  if (loading) {
    return <div className="text-center py-8 text-white">Chargement...</div>;
  }

  if (error || !country) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400 mb-4">{error || "Pays non trouvé"}</p>
        <Link to="/search" className="text-blue-400 hover:underline">
          Retour à la recherche
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Link to="/search" className="text-blue-400 hover:underline">
          ← Retour à la recherche
        </Link>
        <button
          onClick={() => {
            if (isFavorite(country.cca2)) {
              removeFavorite(country.cca2);
            } else {
              addFavorite(country);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          {isFavorite(country.cca2)
            ? "❤️ Retirer des favoris"
            : "🤍 Ajouter aux favoris"}
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden mt-4 border border-gray-700">
        <img
          src={country.flags.svg}
          alt={country.flags.alt}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            {country.name.common}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Informations de base
              </h2>
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium text-gray-400">Nom officiel</dt>
                  <dd className="text-white">{country.name.official}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Capitale</dt>
                  <dd className="text-white">
                    {country.capital?.join(", ") || "N/A"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Région</dt>
                  <dd className="text-white">{country.region}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Sous-région</dt>
                  <dd className="text-white">{country.subregion}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Population</dt>
                  <dd className="text-white">
                    {country.population.toLocaleString()}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Superficie</dt>
                  <dd className="text-white">
                    {country.area.toLocaleString()} km²
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Détails supplémentaires
              </h2>
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium text-gray-400">Langues</dt>
                  <dd className="text-white">
                    {Object.values(country.languages || {}).join(", ") ||
                      "Non disponible"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Devises</dt>
                  <dd className="text-white">
                    {Object.values(country.currencies || {})
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(", ") || "Non disponible"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">
                    Fuseaux horaires
                  </dt>
                  <dd className="text-white">
                    {country.timezones.join(", ") || "Non disponible"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Continents</dt>
                  <dd className="text-white">
                    {country.continents.join(", ") || "Non disponible"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">
                    Pays frontaliers
                  </dt>
                  <dd className="text-white">
                    {country.borders?.length > 0
                      ? country.borders.join(", ")
                      : "Aucun"}
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-400">Codes pays</dt>
                  <dd className="text-white">
                    {country.cca2} (2 lettres), {country.cca3} (3 lettres)
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
