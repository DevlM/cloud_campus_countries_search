import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-slate-900 to-gray-800">
      <nav className="bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="flex items-center px-4 text-white font-semibold"
                >
                  🌍 Recherche de pays
                </Link>
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Accueil
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/search"
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Recherche
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white px-3 py-2"
                >
                  Favoris
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  ),
});
