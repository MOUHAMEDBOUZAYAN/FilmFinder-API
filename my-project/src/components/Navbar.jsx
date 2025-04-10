import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Search from './Search';
import { FaFilm } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo and Title */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="Home"
          >
            <FaFilm className="text-3xl text-primary-500 group-hover:text-primary-600 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors">
              FilmExplorer
            </span>
          </Link>

          {/* Search and Theme Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-grow md:flex-grow-0 md:w-96">
              <Search />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;