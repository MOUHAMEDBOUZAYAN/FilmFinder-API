import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMovies } from '../services/api';

const Search = ({ placeholder = "Rechercher un film..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sync with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('search') || '');
  }, [location.search]);

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
    const params = new URLSearchParams(location.search);
    if (query.trim()) {
      params.set('search', query);
      params.delete('page');
    } else {
      params.delete('search');
    }
    navigate(`?${params.toString()}`);
    setSuggestions([]); // Clear suggestions on submit
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
    navigate(`?search=${encodeURIComponent(title)}`);
    setSuggestions([]);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-md mx-auto"
    >
      <div className={`flex items-center border rounded-full px-4 py-2 transition-all duration-200 ${
        isFocused 
          ? 'border-primary-500 shadow-md' 
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
      }`}>
        <MagnifyingGlassIcon className={`h-5 w-5 ${
          isFocused ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'
        }`} />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click on suggestions
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

      {/* Autocomplete suggestions dropdown */}
      <AnimatePresence>
        {(isFocused && (suggestions.length > 0 || isLoading)) && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 w-full bg-white dark:bg-dark-700 rounded-lg shadow-lg py-2 max-h-60 overflow-auto"
          >
            {isLoading ? (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500 mr-2"></div>
                Recherche...
              </div>
            ) : (
              suggestions.map((movie) => (
                <button
                  key={movie.imdbID}
                  type="button"
                  onClick={() => handleSuggestionClick(movie.Title)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <span className="truncate">{movie.Title} ({movie.Year})</span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default Search;