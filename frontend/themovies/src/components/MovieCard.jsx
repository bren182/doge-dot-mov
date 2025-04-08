import { useState } from "react";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { getUserId } from "../utils/getUserId";
import AnimatedModal from "./AnimatedModal";


export default function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const [showModal, setShowModal] = useState(false);
  const userId = getUserId();
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
      <AnimatedModal showModal={showModal}
        vote_average={vote_average}
        overview={overview}
        poster_path={poster_path}
        toggleModal={toggleModal}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
        userId={userId}
        title={title}
        />

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
          <h3 className="text-base font-semibold truncate mb-1 text-wrap">{String(title).length > 20 ? String(title).slice(0,20) +"..." : title }</h3>
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
