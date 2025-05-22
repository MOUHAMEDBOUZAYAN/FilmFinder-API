import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilm, FaHeart, FaHome, FaInfoCircle, FaBars, FaTimes, FaChevronDown, FaSearch } from 'react-icons/fa';
import EnhancedThemeToggle from './EnhancedThemeToggle';
import EnhancedSearch from './EnhancedSearch';

const ImprovedNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const navbarVariants = {
    initial: { y: -100 },
    animate: { 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 0.2, duration: 0.3 }
    },
    hover: { 
      scale: 1.05,
      color: "#3B82F6", // primary-500
      transition: { duration: 0.2 }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: { 
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    },
    open: { 
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    }
  };

  const dropdownVariants = {
    closed: { 
      opacity: 0,
      y: -5,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2 }
    }
  };

  const searchExpandVariants = {
    closed: {
      width: "40px",
      transition: { duration: 0.3 }
    },
    open: {
      width: "280px",
      transition: { duration: 0.3 }
    }
  };

  const categories = [
    { name: 'Action', path: '/?search=action' },
    { name: 'Comédie', path: '/?search=comedy' },
    { name: 'Drame', path: '/?search=drama' },
    { name: 'Science-Fiction', path: '/?search=sci-fi' },
    { name: 'Horreur', path: '/?search=horror' },
    { name: 'Animation', path: '/?search=animation' },
    { name: 'Thriller', path: '/?search=thriller' },
  ];

  return (
    <motion.nav 
      variants={navbarVariants}
      initial="initial"
      animate="animate"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md'
          : 'bg-white dark:bg-gray-900 shadow-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            aria-label="Accueil"
          >
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="flex items-center gap-2"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                className="text-primary-500"
              >
                <FaFilm className="text-3xl" />
              </motion.div>
              <span className="text-2xl font-bold text-gray-800 dark:text-white transition-colors hidden sm:block">
                FilmExplorer
              </span>
            </motion.div>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <motion.button
              ref={searchRef}
              variants={searchExpandVariants}
              initial="closed"
              animate={searchOpen ? "open" : "closed"}
              className="relative overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-full h-10 flex items-center justify-end px-2"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? (
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Rechercher un film..."
                  className="w-full bg-transparent border-none focus:outline-none pl-3 pr-8 text-gray-700 dark:text-gray-200"
                />
              ) : null}
              <FaSearch className="text-gray-500 dark:text-gray-400 absolute right-3" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-1">
            <motion.div
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }
              >
                <FaHome className="mr-2" />
                Accueil
              </NavLink>
            </motion.div>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <motion.button 
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setCategoryMenuOpen(!categoryMenuOpen)} 
                className="flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FaFilm className="mr-2" />
                Catégories
                <motion.div
                  animate={{ rotate: categoryMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-1"
                >
                  <FaChevronDown />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {categoryMenuOpen && (
                  <motion.div 
                    variants={dropdownVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10"
                    onMouseLeave={() => setCategoryMenuOpen(false)}
                  >
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={category.path}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        >
                          {category.name}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.div
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink 
                to="/favorites" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }
              >
                <FaHeart className="mr-2" />
                Favoris
              </NavLink>
            </motion.div>
            
            <motion.div
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <NavLink 
                to="/about" 
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                }
              >
                <FaInfoCircle className="mr-2" />
                À Propos
              </NavLink>
            </motion.div>
          </div>

          {/* Search and Theme Toggle */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="w-64">
              <EnhancedSearch placeholder="Rechercher un film..." />
            </div>
            <EnhancedThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="sm:hidden mt-4 overflow-hidden"
            >
              <div className="space-y-2 py-3">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                  }
                >
                  <FaHome className="inline mr-2" />
                  Accueil
                </NavLink>
                
                {/* Mobile Categories */}
                <div className="px-4 py-2">
                  <button 
                    onClick={() => setCategoryMenuOpen(!categoryMenuOpen)}
                    className="flex items-center w-full text-left rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors py-2"
                  >
                    <FaFilm className="inline mr-2" />
                    Catégories
                    <motion.div
                      animate={{ rotate: categoryMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      <FaChevronDown />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {categoryMenuOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-6 mt-2 space-y-1 overflow-hidden"
                      >
                        {categories.map((category, index) => (
                          <motion.div
                            key={category.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              to={category.path}
                              className="block py-2 px-3 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary-500 transition-colors"
                            >
                              {category.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <NavLink 
                  to="/favorites" 
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                  }
                >
                  <FaHeart className="inline mr-2" />
                  Favoris
                </NavLink>
                
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    `block px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-primary-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
                  }
                >
                  <FaInfoCircle className="inline mr-2" />
                  À Propos
                </NavLink>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 mb-4">
                  <EnhancedSearch placeholder="Rechercher un film..." />
                </div>

                <div className="flex justify-between items-center px-4 pb-2">
                  <span className="text-gray-700 dark:text-gray-300">Changer de thème</span>
                  <EnhancedThemeToggle />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default ImprovedNavbar;