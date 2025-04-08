const toggleFavorite = async (movie, isCurrentlyFavorite, userId, refreshFavorites) => {
    const endpoint = "http://localhost:8000/api/favorites";
    const method = isCurrentlyFavorite ? "DELETE" : "POST";
  
    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          user_id: userId,
        }),
      });
  
      if (!res.ok) throw new Error("Request failed");
  
      refreshFavorites?.();
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };
  
  export default toggleFavorite;