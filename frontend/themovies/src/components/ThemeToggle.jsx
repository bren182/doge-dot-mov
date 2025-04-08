// src/components/ThemeToggle.jsx
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`px-4 py-2 rounded-lg ${
        darkMode ? 'bg-darkaccent text-light' : 'bg-accent text-white'
      }`}
    >
      {darkMode ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}