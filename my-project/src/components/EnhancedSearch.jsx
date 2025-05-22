import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { FaFilm, FaClock, FaSpinner } from 'react-icons/fa';
import { searchMovies } from '../services/api';

const EnhancedSearch = ({ placeholder = "Rechercher un film..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync with URL and load recent searches
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('search') || '');
    
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved).slice(0, 5));
      } catch (err) {
        console.error('Error parsing recent searches', err);
      }
    }
  }, [location.search]);

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) { // Only search after 3 characters
        setIsLoading(true);
        try {
          const { Search } = await searchMovies(query);
          setSuggestions(Search?.slice(0, 5) || []); // Limit to 5 suggestions
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300); // Debounce 300ms
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Save to recent searches
    const newRecentSearches = [
      query,
      ...recentSearches.filter(item => item !== query)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    
    const params = new URLSearchParams(location.search);
    params.set('search', query);
    params.delete('page');
    navigate(`?${params.toString()}`);
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate(`?${params.toString()}`);
  };

  const handleSuggestionClick = (title) => {
    setQuery(title);
    
    // Save to recent searches
    const newRecentSearches = [
      title,
      ...recentSearches.filter(item => item !== title)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    
    navigate(`?search=${encodeURIComponent(title)}`);
    setIsFocused(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  // Animation variants
  const containerVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: { rotate: 5, scale: 1.1 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const suggestionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1, 
      x: 0,
      transition: { 
        delay: custom * 0.05,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: { scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }
  };

  return (
    <motion.div
      ref={searchRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-md mx-auto"
    >
      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        <div className={`flex items-center border rounded-full px-4 py-2 transition-all duration-200 ${
          isFocused 
            ? 'border-primary-500 shadow-lg' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 shadow-md'
        }`}>
          <motion.div variants={iconVariants}>
            <MagnifyingGlassIcon className={`h-5 w-5 ${
              isFocused ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'
            }`} />
          </motion.div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="w-full bg-transparent border-none focus:outline-none px-3 py-1 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            autoComplete="off"
          />
          
          {query && (
            <motion.button
              type="button"
              onClick={clearSearch}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XMarkIcon className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </motion.form>

      {/* Dropdown with suggestions and recent searches */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-20 mt-2 w-full bg-white dark:bg-dark-700 rounded-lg shadow-xl overflow-hidden"
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && !query && (
              <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Recherches récentes
                  </h3>
                  <button 
                    onClick={clearRecentSearches}
                    className="text-xs text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Effacer
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((term, index) => (
                    <motion.button
                      key={`recent-${index}`}
                      variants={suggestionVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      custom={index}
                      onClick={() => handleSuggestionClick(term)}
                      className="w-full text-left px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-dark-600 flex items-center"
                    >
                      <FaClock className="h-3 w-3 text-gray-400 mr-2 flex-shrink-0" />
                      <span className="truncate">{term}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="px-4 py-3 text-gray-500 dark:text-gray-400 flex items-center justify-center">
                <FaSpinner className="animate-spin h-4 w-4 mr-2" />
                Recherche...
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div>
                {recentSearches.length > 0 && !query && <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>}
                <div className="px-4 py-3">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Suggestions
                  </h3>
                  <div className="space-y-1">
                    {suggestions.map((movie, index) => (
                      <motion.button
                        key={movie.imdbID}
                        variants={suggestionVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        custom={index}
                        onClick={() => handleSuggestionClick(movie.Title)}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-primary-50 dark:hover:bg-dark-600 flex items-center"
                      >
                        <FaFilm className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                        <div className="overflow-hidden">
                          <p className="text-gray-800 dark:text-gray-200 truncate">{movie.Title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {movie.Year}{movie.Type ? ` • ${movie.Type}` : ''}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length > 2 && !isLoading && suggestions.length === 0 && (
              <div className="py-3 px-4 text-gray-500 dark:text-gray-400 text-center">
                Aucun résultat pour "{query}"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedSearch;