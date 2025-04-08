import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === "") return;

    // Simulate user ID and save
    const userId = `user_${username.trim().toLowerCase()}`;
    localStorage.setItem("user_id", userId);
    localStorage.setItem("username", username.trim());

    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-primary rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          type="submit"
          className="w-full bg-accent hover:bg-darkaccent text-white py-2 rounded transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
