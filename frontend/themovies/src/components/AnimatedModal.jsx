import { motion, AnimatePresence } from "framer-motion";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
export default function AnimatedModal ({showModal, ...props }) {
    return(
        <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={props.toggleModal}
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
                <h2 className="text-xl font-bold">{props.title}</h2>
                  <button
                    onClick={props.toggleModal}
                    className="text-xl text-secondary hover:text-accent transition-colors absolute top-4 right-4"
                  >
                    ×
                  </button>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}
                  alt={props.title}
                  className="rounded mb-4 mx-auto"
                />
                <div className="w-full p-4 text-center">
                  <h3 className="text-base font-semibold truncate mb-1">{props.title}</h3>
                  <p className="text-sm text-secondary mb-2">{props.release_date}</p>
                  <button
                    onClick={() => props.onToggleFavorite(props.movie)}
                    className="text-accent hover:text-darkaccent transition-colors"
                    title={props.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    {props.isFavorite ? (
                      <SolidHeart className="h-5 w-5 inline-block" />
                    ) : (
                      <OutlineHeart className="h-5 w-5 inline-block" />
                    )}
                  </button>
                </div>
                <p className="text-sm">{props.overview || "No description available."}</p>
                {props.vote_average !== null && (
                  <p className="mt-4 text-sm text-secondary">Rating: {props.vote_average} / 10</p>
                )}


              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
}
