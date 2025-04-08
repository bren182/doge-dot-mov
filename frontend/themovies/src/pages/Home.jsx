import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import toggleFavorite from '../utils/toggleFavorite';
import { getUserId } from '../utils/getUserId';

export default function Home() {
    const username = localStorage.getItem("username");
    const userId = getUserId();
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(() => {
        const savedPage = parseInt(localStorage.getItem("lastPage"));
        return isNaN(savedPage) ? 1 : savedPage;
    });
    const [totalPages, setTotalPages] = useState(5);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([])
    const fetchMovies = async (page = 1) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/api/movies?page=${page}`);
            const data = await res.json();
            setMovies(data.results);
            setPage(data.page);
            setTotalPages(Math.ceil(data.total / 9));
        } catch (err) {
            console.error("Error fetching movies:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        localStorage.setItem("lastPage", page);
        fetchMovies(page);
    }, [page]);

    const fetchFavorites = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/favorites?user_id=${userId}`);
            const data = await res.json();
            setFavorites(data.favorites);
        } catch (err) {
            console.error("Failed to load favorites:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const isFavorite = (movie) =>
        favorites.some((f) => f.movie_id === movie.id);
    return (
        <>
            {!userId ? (
                <div className="text-center text-secondary text-lg mb-8">
                    🔒 Please <a href="/login" className="text-accent underline">log in</a> to browse and save your favorite movies.
                </div>
            ) : (
                <h2 className="text-xl font-semibold mb-4 text-center">
                    Welcome back, <span className="text-accent">{username}</span>!
                </h2>
            )}
            <div className="mt-4 mb-6 flex items-center justify-end gap-2 text-sm">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-3 py-1.5 bg-secondary text-white rounded hover:bg-secondary/80 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={page === 1}
                >
                    ←
                </button>

                <span className="text-primary font-medium px-2 bg-secondary/20 px-3 py-1 rounded-md">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="px-3 py-1.5 bg-secondary text-white rounded hover:bg-secondary/80 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={page === totalPages}
                >
                    →
                </button>
            </div>


            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isFavorite={isFavorite(movie)}
                            onToggleFavorite={(movie) =>
                                toggleFavorite(movie, isFavorite(movie), userId, fetchFavorites)
                            }
                        />
                    ))}
                </div>
            )}

            <div className="mt-10 flex justify-center items-center gap-4">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-4 py-2 bg-secondary text-white font-medium rounded-md hover:bg-secondary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === 1}
                >
                    ← Previous
                </button>

                <span className="text-base font-medium text-primary bg-secondary/20 px-3 py-1 rounded-md">
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    className="px-4 py-2 bg-secondary text-white font-medium rounded-md hover:bg-secondary/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={page === totalPages}
                >
                    Next →
                </button>
            </div>

        </>
    );
}
