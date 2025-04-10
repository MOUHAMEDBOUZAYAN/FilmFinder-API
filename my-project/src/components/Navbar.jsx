import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Search from './Search';
import { FaFilm, FaHeart, FaHome, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark-800 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center justify-between w-full md:w-auto">
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
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'}`
              }
            >
              <FaHome className="mr-2" />
              Accueil
            </NavLink>
            
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'}`
              }
            >
              <FaHeart className="mr-2" />
              Favoris
            </NavLink>
            
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'}`
              }
            >
              <FaInfoCircle className="mr-2" />
              À Propos
            </NavLink>
          </div>

          {/* Search and Theme Toggle */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex-grow md:flex-grow-0 md:w-96">
              <Search />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;