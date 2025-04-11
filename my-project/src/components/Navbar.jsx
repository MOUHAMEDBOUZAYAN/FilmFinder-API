import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Search from './Search';
import { FaFilm, FaHeart, FaHome, FaInfoCircle, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark-800 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
            aria-label="Home"
          >
            <FaFilm className="text-3xl text-primary-500 group-hover:text-primary-600 transition-colors" />
            <span className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-primary-500 transition-colors hidden sm:block">
              FilmExplorer
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-6">
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
          <div className="hidden sm:flex items-center gap-4">
            <div className="w-64">
              <Search />
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden mt-4 space-y-2"
          >
            <NavLink 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'}`
              }
            >
              <FaHome className="inline mr-2" />
              Accueil
            </NavLink>
            
            <NavLink 
              to="/favorites" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'}`
              }
            >
              <FaHeart className="inline mr-2" />
              Favoris
            </NavLink>
            
            <NavLink 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => 
                `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'}`
              }
            >
              <FaInfoCircle className="inline mr-2" />
              À Propos
            </NavLink>

            <div className="pt-2">
              <Search />
            </div>

            <div className="flex justify-center pt-2">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;