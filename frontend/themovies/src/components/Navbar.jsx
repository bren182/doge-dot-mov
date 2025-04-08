import { useState } from 'react';
import { MagnifyingGlassIcon, HomeIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { Link } from 'react-router-dom';

export default function Navbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="bg-[#2B2D42] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-12 py-12 flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-[#EDF2F4] hover:text-[#EF233C] transition-colors text-xl font-bold">
  <HomeIcon className="h-6 w-6 mr-1" />
  Doge.mov
</Link>
<Link to="/favorites" className="text-light hover:text-accent">
  ❤️ Favorites
</Link>
<Link to="/contact" className="text-light hover:text-accent">
  📬 Contact
</Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-grow md:flex-grow-0 max-w-md w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 pl-10 rounded-full bg-[#EDF2F4] text-[#2B2D42] focus:outline-none focus:ring-2 focus:ring-[#EF233C]"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-[#8D99AE] absolute left-3 top-2.5" />
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="bg-[#8D99AE] hover:bg-[#EF233C] text-[#2B2D42] px-4 py-2 rounded-lg transition-colors"
          >
            Login
          </a>
          <ThemeToggle />
        
        </div>
      </div>
    </nav>
  );
}
