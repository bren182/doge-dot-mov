import { useState } from "react";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import toggleFavorite from "../utils/toggleFavorite";


export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const [showModal, setShowModal] = useState(false);

  const {
    title,
    release_date,
    poster_path,
    vote_average,
    overview,
  } = movie;

  const toggleModal = () => setShowModal(!showModal);


  return (

    <>
      {/* Modal Detail Popover */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={toggleModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white dark:bg-primary text-primary dark:text-light p-6 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Content */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{title}</h2>
                  <button
                    onClick={toggleModal}
                    className="text-xl text-secondary hover:text-accent transition-colors absolute top-4 right-4"
                  >
                    ×
                  </button>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className="rounded mb-4 mx-auto"
                />
                <p className="text-sm">{overview || "No description available."}</p>
                {vote_average !== null && (
                  <p className="mt-4 text-sm text-secondary">Rating: {vote_average} / 10</p>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Card */}
      <div className="bg-white dark:bg-primary rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden max-w-xs mx-auto flex flex-col items-center">
        {/* Poster */}
        <div className="cursor-pointer w-full h-72 overflow-hidden flex items-center justify-center bg-light dark:bg-primary-dark" onClick={toggleModal}>
          <img
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
            className="object-cover h-full w-auto max-w-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="w-full p-4 text-center">
          <h3 className="text-base font-semibold truncate mb-1">{title}</h3>
          <p className="text-sm text-secondary mb-2">{release_date}</p>
          <button
            onClick={() => onToggleFavorite(movie)}
            className="text-accent hover:text-darkaccent transition-colors"
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorite ? (
              <SolidHeart className="h-5 w-5 inline-block" />
            ) : (
              <OutlineHeart className="h-5 w-5 inline-block" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
