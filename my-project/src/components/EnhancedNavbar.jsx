import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFilm, FaHeart, FaHome, FaInfoCircle, FaBars, FaTimes, 
  FaChevronDown, FaSearch, FaCrown, FaUser, FaBell, FaCog,
  FaSignOutAlt, FaBookmark, FaHistory, FaGift
} from 'react-icons/fa';
import EnhancedThemeToggle from './EnhancedThemeToggle';
import EnhancedSearch from './EnhancedSearch';
import EnhancedNotifications from './EnhancedNotifications';

const ProfessionalNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // New state to manage active dropdown (search, notifications, category, user, none)
  const [activeDropdown, setActiveDropdown] = useState('none');

  // Close all dropdowns when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false); // Assuming mobile search is also a dropdown
    setActiveDropdown('none');
    // categoryMenuOpen and userMenuOpen will be controlled by activeDropdown
  }, [location]);

  // Handle clicks outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close any open dropdown if the click is outside the navbar
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false); // Close mobile search if open
      }
      // Using a general click outside handler for all dropdowns managed by activeDropdown
      // This will be handled by each component using activeDropdown state
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]); // Depend on activeDropdown to re-run effect

  // Enhanced scroll tracking with navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.6
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    animate: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: { delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }
    },
    hover: { 
      scale: 1.05,
      rotate: 2,
      transition: { duration: 0.2 }
    }
  };

  const linkVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: { 
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const dropdownVariants = {
    closed: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  const itemStaggerVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const categories = [
    { name: 'Action', path: '/?search=action', icon: '💥', color: 'text-red-400' },
    { name: 'Comédie', path: '/?search=comedy', icon: '😂', color: 'text-yellow-400' },
    { name: 'Drame', path: '/?search=drama', icon: '🎭', color: 'text-blue-400' },
    { name: 'Science-Fiction', path: '/?search=sci-fi', icon: '🚀', color: 'text-purple-400' },
    { name: 'Horreur', path: '/?search=horror', icon: '👻', color: 'text-gray-400' },
    { name: 'Animation', path: '/?search=animation', icon: '🎨', color: 'text-green-400' },
    { name: 'Thriller', path: '/?search=thriller', icon: '🔥', color: 'text-orange-400' },
    { name: 'Romance', path: '/?search=romance', icon: '💕', color: 'text-pink-400' },
  ];

  const userMenuItems = [
    { name: 'Mon Profil', icon: FaUser, path: '/profile' },
    { name: 'Mes Favoris', icon: FaHeart, path: '/favorites' },
    { name: 'Mes Listes', icon: FaBookmark, path: '/watchlists' },
    { name: 'Historique', icon: FaHistory, path: '/history' },
    { name: 'Paramètres', icon: FaCog, path: '/settings' },
    { name: 'Premium', icon: FaCrown, path: '/premium', premium: true },
  ];

  return (
    <>
      <motion.nav 
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/20 dark:border-gray-700/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Enhanced Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="relative"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <FaFilm className="text-white text-xl" />
                  </motion.div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </motion.div>
              <div className="hidden sm:block">
                <motion.h1 
                  variants={linkVariants}
                  className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
                >
                  FilmHub Pro
                </motion.h1>
                <motion.p 
                  variants={linkVariants}
                  className="text-xs text-gray-500 dark:text-gray-400 -mt-1"
                >
                  Découvrez le cinéma
                </motion.p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`
                  }
                >
                  <FaHome className="mr-2 text-sm" />
                  Accueil
                </NavLink>
              </motion.div>
              
              {/* Enhanced Categories Dropdown */}
              <div className="relative">
                <motion.button
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setActiveDropdown(activeDropdown === 'category' ? 'none' : 'category')}
                  className="flex items-center px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 font-medium"
                >
                  <FaFilm className="mr-2 text-sm" />
                  Catégories
                  <motion.div
                    animate={{ rotate: activeDropdown === 'category' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="ml-2"
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {/* Render category dropdown only if activeDropdown is 'category' */}
                  {activeDropdown === 'category' && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                      // Removed onMouseLeave, will rely on click outside or other button clicks to close
                      // onMouseLeave={() => setCategoryMenuOpen(false)}
                    >
                      <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                          Genres Populaires
                        </h3>
                        <motion.div
                          variants={itemStaggerVariants}
                          initial="closed"
                          animate="open"
                          className="grid grid-cols-2 gap-2"
                        >
                          {categories.map((category, index) => (
                            <motion.div key={category.name} variants={itemVariants}>
                              <Link
                                to={category.path}
                                onClick={() => setActiveDropdown('none')} // Close dropdown on link click
                                className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 group"
                              >
                                <span className="text-2xl mr-3">{category.icon}</span>
                                <div>
                                  <span className={`font-medium ${category.color} group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}>
                                    {category.name}
                                  </span>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/favorites" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-pink-600 dark:hover:text-pink-400'
                    }`
                  }
                >
                  <FaHeart className="mr-2 text-sm" />
                  Favoris
                </NavLink>
              </motion.div>
              
              <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => 
                    `flex items-center px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                    }`
                  }
                >
                  <FaInfoCircle className="mr-2 text-sm" />
                  À Propos
                </NavLink>
              </motion.div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-x-4">
              {/* Search */}
              <div className="hidden lg:block w-80">
                {/* Pass activeDropdown state and setter to EnhancedSearch */}
                <EnhancedSearch 
                  placeholder="Rechercher..."
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
              </div>
              {/* Divider */}
              <div className="h-8 border-l border-gray-300 dark:border-gray-700 mx-2"></div>
              {/* Action Icons Group */}
              <div className="flex items-center space-x-3 bg-white/70 dark:bg-gray-800/70 rounded-full px-3 py-1 shadow">
                {/* Notifications */}
                <EnhancedNotifications 
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                />
                {/* Theme Toggle */}
                <EnhancedThemeToggle />
                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? 'none' : 'user')}
                    className="flex items-center space-x-2 p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <FaUser className="text-sm" />
                    </div>
                    <FaChevronDown className={`text-xs transition-transform ${activeDropdown === 'user' ? 'rotate-180' : ''}`} />
                  </motion.button>
                  <AnimatePresence>
                    {/* Render user menu only if activeDropdown is 'user' */}
                    {activeDropdown === 'user' && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                              <FaUser className="text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Premium Member</p>
                            </div>
                          </div>
                        </div>

                        <motion.div variants={itemStaggerVariants} initial="closed" animate="open" className="p-2">
                          {userMenuItems.map((item) => (
                            <motion.div key={item.name} variants={itemVariants}>
                              <Link
                                to={item.path}
                                onClick={() => setActiveDropdown('none')} // Close dropdown on link click
                                className={`flex items-center px-3 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group ${
                                  item.premium ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : ''
                                }`}
                              >
                                <item.icon className={`mr-3 ${item.premium ? 'text-yellow-500' : 'text-gray-400 group-hover:text-indigo-500'}`} />
                                <span className={`font-medium ${item.premium ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                  {item.name}
                                </span>
                                {item.premium && <FaCrown className="ml-auto text-yellow-500 text-sm" />}
                              </Link>
                            </motion.div>
                          ))}

                          <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                            <motion.button
                              variants={itemVariants}
                              // Assuming logout also closes the dropdown
                              onClick={() => setActiveDropdown('none')}
                              className="flex items-center w-full px-3 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-red-600 dark:text-red-400"
                            >
                              <FaSignOutAlt className="mr-3" />
                              <span className="font-medium">Déconnexion</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileMenuOpen ? 'close' : 'open'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-md mx-4"
            >
              <EnhancedSearch placeholder="Rechercher..." />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 pointer-events-none"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden fixed top-0 right-0 w-80 h-full bg-white dark:bg-gray-900 z-50 shadow-2xl pointer-events-auto overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FaFilm className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold gradient-text">FilmHub Pro</h2>
                      <p className="text-xs text-gray-500">Menu Principal</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                  >
                    <FaTimes className="text-gray-600 dark:text-gray-300" />
                  </motion.button>
                </div>

                <motion.div variants={itemStaggerVariants} initial="closed" animate="open" className="space-y-2">
                  <motion.div variants={itemVariants}>
                    <NavLink 
                      to="/" 
                      className={({ isActive }) => 
                        `flex items-center px-4 py-4 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      <FaHome className="mr-4 text-lg" />
                      <span className="font-medium">Accueil</span>
                    </NavLink>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <div className="px-4 py-2">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === 'category' ? 'none' : 'category')}
                        className="flex items-center justify-between w-full py-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      >
                        <div className="flex items-center">
                          <FaFilm className="mr-4 text-lg" />
                          <span className="font-medium">Catégories</span>
                        </div>
                        <motion.div
                          animate={{ rotate: activeDropdown === 'category' ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaChevronDown />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === 'category' && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-8 mt-2 space-y-1 overflow-hidden"
                          >
                            {categories.slice(0, 6).map((category, index) => (
                              <motion.div
                                key={category.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <Link
                                  to={category.path}
                                  onClick={() => setActiveDropdown('none')}
                                  className="flex items-center py-2 px-3 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                  <span className="mr-3">{category.icon}</span>
                                  <span>{category.name}</span>
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <NavLink 
                      to="/favorites" 
                      className={({ isActive }) => 
                        `flex items-center px-4 py-4 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      <FaHeart className="mr-4 text-lg" />
                      <span className="font-medium">Favoris</span>
                    </NavLink>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <NavLink 
                      to="/about" 
                      className={({ isActive }) => 
                        `flex items-center px-4 py-4 rounded-xl transition-all ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`
                      }
                    >
                      <FaInfoCircle className="mr-4 text-lg" />
                      <span className="font-medium">À Propos</span>
                    </NavLink>
                  </motion.div>
                </motion.div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center"
                  >
                    <FaCrown className="mr-2" />
                    Passer au Premium
                  </motion.button>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Thème</span>
                    <EnhancedThemeToggle />
                  </div>

                  {/* User Profile Section */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <FaUser className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">John Doe</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Membre Premium</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {userMenuItems.slice(0, 4).map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-all text-gray-600 dark:text-gray-300"
                        >
                          <item.icon className="mr-3 text-sm" />
                          <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfessionalNavbar;