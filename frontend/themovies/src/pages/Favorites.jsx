import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import toggleFavorite from '../utils/toggleFavorite';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("user_id");
  async function fetchFavorites() {
    try {
      const res = await fetch(`http://${process.env.REACT_APP_API_URL}/api/favorites?user_id=${userId}`);
      const data = await res.json();
      setFavorites(data.favorites);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }



    fetchFavorites();
  }, [userId, navigate]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorites 🎬</h1>
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : favorites.length === 0 ? (
        <p className="text-secondary">You haven't added any favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.movie_id}
              movie={{
                id: movie.movie_id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: "",
                vote_average: null,
                overview: movie.overview
              }}
              isFavorite={true}
              onToggleFavorite={(movie) => toggleFavorite(movie, true, userId, fetchFavorites)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
