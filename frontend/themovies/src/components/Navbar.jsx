import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    setUsername(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    setUsername(null);
    navigate("/login");
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/movies/all`);
      const data = await res.json();
      const filtered = data.results.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowDropdown(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSelectSuggestion = (movie) => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    setSelectedMovie(movie);

  };

  return (
    <>
      <nav className="bg-primary-dark shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-[#EDF2F4] hover:text-[#EF233C] transition-colors text-xl font-bold"
          >
            <HomeIcon className="h-6 w-6 mr-1" />
            Doge.mov
          </Link>

          {/* Search */}
          <div className="relative flex-grow max-w-md w-full">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                onFocus={() => query && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                placeholder="Search movies..."
                className="w-full py-2 px-4 pl-10 rounded-full bg-primary text-light focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-secondary absolute left-3 top-2.5" />
            </div>

            {/* Suggestions Dropdown */}
            {showDropdown && suggestions.length > 0 && (
              <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-primary text-primary dark:text-light rounded shadow-lg overflow-hidden">
                {suggestions.map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() => handleSelectSuggestion(movie)}
                    className="px-4 py-2 hover:bg-light dark:hover:bg-primary-dark cursor-pointer"
                  >
                    {movie.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 text-light">
          <Link to="/" className="hover:text-accent">
              Home
            </Link>
            <Link to="/favorites" className="hover:text-accent">
              Favorites
            </Link>
            <Link to="/contact" className="hover:text-accent">
              Contact
            </Link>

            {username ? (
              <>
                <span className="text-secondary hidden sm:inline">
                  Hello, <strong>{username}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-accent hover:bg-darkaccent text-white px-4 py-1.5 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-secondary hover:bg-accent text-primary-dark px-4 py-1.5 rounded-lg transition-colors"
              >
                Login
              </Link>
            )}

            <ThemeToggle />
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {selectedMovie && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
              onClick={() => setSelectedMovie(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Flex-centered modal wrapper */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Actual modal */}
              <motion.div
                className="bg-white dark:bg-primary text-primary dark:text-light p-6 rounded-xl 
                     shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{selectedMovie.title}</h2>
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="text-xl text-secondary hover:text-accent transition-colors absolute top-4 right-4"
                  >
                    ×
                  </button>
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="rounded mb-4 mx-auto"
                />
                <p className="text-sm">
                  {selectedMovie.overview || "No description available."}
                </p>
                {selectedMovie.vote_average !== null && (
                  <p className="mt-4 text-sm text-secondary">
                    Rating: {selectedMovie.vote_average} / 10
                  </p>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </>
  );
}
