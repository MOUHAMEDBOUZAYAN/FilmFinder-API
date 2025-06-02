import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, XMarkIcon, SparklesIcon, 
  ClockIcon, FireIcon, ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';
import { 
  FaFilm, FaClock, FaSpinner, FaMicrophone, 
  FaFilter, FaStar, FaCalendar, FaUser, FaHistory
} from 'react-icons/fa';
import { searchMovies } from '../services/api';

const ProfessionalSearch = ({ placeholder = "Rechercher des films, acteurs, réalisateurs...", activeDropdown, setActiveDropdown }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isListening, setIsListening] = useState(false);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced search data
  const filters = [
    { id: 'all', name: 'Tout', icon: FaFilm },
    { id: 'movie', name: 'Films', icon: FaFilm },
    { id: 'person', name: 'Personnes', icon: FaUser },
    { id: 'year', name: 'Année', icon: FaCalendar },
  ];

  const trendingQueries = [
    { query: 'Oppenheimer', category: 'film', trending: true },
    { query: 'Barbie', category: 'film', trending: true },
    { query: 'Margot Robbie', category: 'actor', trending: false },
    { query: 'Christopher Nolan', category: 'director', trending: false },
    { query: 'Marvel 2024', category: 'search', trending: true },
    { query: 'Science Fiction', category: 'genre', trending: false },
  ];

  // Sync with URL and load saved data
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('search') || '');
    
    // Load saved data from localStorage
    try {
      const savedRecent = localStorage.getItem('recentSearches');
      const savedHistory = localStorage.getItem('searchHistory');
      
      if (savedRecent) {
        setRecentSearches(JSON.parse(savedRecent).slice(0, 8));
      }
      
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 20));
      }
    } catch (err) {
      console.error('Error loading search data', err);
    }

    // Set trending searches
    setTrendingSearches(trendingQueries);
  }, [location.search]);

  // Enhanced click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search dropdown and filters if click is outside the search container
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        // Only close if the search dropdown or filters are currently active
        if (activeDropdown === 'search') {
          setActiveDropdown('none');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]); // Depend on activeDropdown to re-run effect

  // Debounced search suggestions
  const fetchSuggestions = useCallback(
    async (searchQuery) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const { Search } = await searchMovies(searchQuery);
        const filteredResults = Search?.slice(0, 8) || [];
        
        // Enhance suggestions with additional data
        const enhancedSuggestions = filteredResults.map(item => ({
          ...item,
          searchType: item.Type,
          matchType: 'title', // Could be 'title', 'actor', 'director'
          popularity: Math.floor(Math.random() * 100), // Mock popularity score
        }));

        setSuggestions(enhancedSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (query && isFocused) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query, isFocused, fetchSuggestions]);

  // Enhanced search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    performSearch(query.trim());
  };

  const performSearch = (searchTerm) => {
    // Save to search history
    const searchEntry = {
      query: searchTerm,
      timestamp: Date.now(),
      filter: selectedFilter,
      results: suggestions.length
    };

    const newHistory = [searchEntry, ...searchHistory.filter(item => item.query !== searchTerm)].slice(0, 20);
    const newRecentSearches = [searchTerm, ...recentSearches.filter(item => item !== searchTerm)].slice(0, 8);
    
    setSearchHistory(newHistory);
    setRecentSearches(newRecentSearches);
    
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
    
    // Navigate with search params
    const params = new URLSearchParams(location.search);
    params.set('search', searchTerm);
    if (selectedFilter !== 'all') {
      params.set('filter', selectedFilter);
    }
    params.delete('page');
    
    navigate(`?${params.toString()}`);
    setIsFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    const params = new URLSearchParams(location.search);
    params.delete('search');
    params.delete('filter');
    navigate(`?${params.toString()}`);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.Title);
    performSearch(item.Title);
  };

  const handleQuickSearch = (searchTerm) => {
    setQuery(searchTerm);
    performSearch(searchTerm);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    setRecentSearches([]);
    localStorage.removeItem('searchHistory');
    localStorage.removeItem('recentSearches');
  };

  // Voice search functionality (mock)
  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window) {
      setIsListening(true);
      // Mock voice search - in real app, implement actual speech recognition
      setTimeout(() => {
        setIsListening(false);
        setQuery('voice search result');
      }, 2000);
    } else {
      alert('Recherche vocale non supportée par ce navigateur');
    }
  };

  const getSearchIcon = (type) => {
    switch (type) {
      case 'movie': return <FaFilm className="text-blue-500" />;
      case 'series': return <FaFilm className="text-green-500" />;
      case 'person': return <FaUser className="text-purple-500" />;
      default: return <FaFilm className="text-gray-500" />;
    }
  };

  const getPopularityBadge = (popularity) => {
    if (popularity > 80) return { text: 'Très populaire', color: 'bg-red-500' };
    if (popularity > 60) return { text: 'Populaire', color: 'bg-orange-500' };
    if (popularity > 40) return { text: 'Connu', color: 'bg-yellow-500' };
    return { text: 'Découverte', color: 'bg-gray-500' };
  };

  // Get appropriate icon for trending item
  const getTrendingIcon = (item) => {
    if (item.trending) {
      return <ArrowTrendingUpIcon className="w-4 h-4 text-green-400" />;
    }
    return <FaFire className="w-4 h-4 text-red-400" />;
  };

  // Animation variants
  const containerVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.01 },
    focus: { scale: 1.02, boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)" }
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
        damping: 25,
        staggerChildren: 0.05
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
        delay: custom * 0.03,
        type: "spring",
        stiffness: 300
      }
    }),
    hover: { 
      scale: 1.02, 
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <motion.div
      ref={searchRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <motion.form 
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="rest"
        whileHover="hover"
        animate={isFocused ? "focus" : "rest"}
      >
        <div className={`flex items-center bg-white dark:bg-gray-800 border-2 rounded-2xl transition-all duration-300 shadow-lg ${
          isFocused 
            ? 'border-indigo-500 shadow-xl shadow-indigo-500/20' 
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }`}>
          {/* Search Icon */}
          <div className="pl-6 pr-3">
            <motion.div
              animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
              transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
              {isLoading ? (
                <FaSpinner className="h-5 w-5 text-indigo-500" />
              ) : (
                <MagnifyingGlassIcon className={`h-5 w-5 transition-colors ${
                  isFocused ? 'text-indigo-500' : 'text-gray-400 dark:text-gray-500'
                }`} />
              )}
            </motion.div>
          </div>
          
          {/* Main Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none focus:outline-none py-4 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-lg"
            autoComplete="off"
          />
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pr-3">
            {/* Voice Search */}
            <motion.button
              type="button"
              onClick={startVoiceSearch}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FaMicrophone className="h-4 w-4" />
            </motion.button>

            {/* Filter Button */}
            <motion.button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the form's onSubmit from triggering
                // Toggle search filters visibility via activeDropdown state
                setActiveDropdown(activeDropdown === 'search' ? 'none' : 'search');
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-all ${
                activeDropdown === 'search' 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FaFilter className="h-4 w-4" />
            </motion.button>

            {/* Clear Button */}
            {query && (
              <motion.button
                type="button"
                onClick={clearSearch}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
              >
                <XMarkIcon className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {/* Render filters only if activeDropdown is 'search' */}
          {activeDropdown === 'search' && (
            <motion.div
              variants={filterVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              // Position the filters absolutely below the search bar and give it a higher z-index
              className="absolute top-full mt-2 left-0 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg z-40 flex flex-wrap items-center gap-2 p-2"
            >
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent closing the dropdown immediately
                    setSelectedFilter(filter.id);
                    // Keep filters open after selection for easier multiple selections
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    selectedFilter === filter.id
                      ? 'bg-indigo-500 text-white border-indigo-500 shadow-md'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
                  }`}
                >
                  <filter.icon className="h-4 w-4" />
                  <span>{filter.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* Enhanced Dropdown */}
      <AnimatePresence>
        {isFocused && activeDropdown !== 'search' && activeDropdown !== 'notifications' && (
          <motion.div 
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute z-20 mt-2 w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            {/* Quick Actions */}
            {!query && (
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center">
                    <SparklesIcon className="h-5 w-5 text-indigo-500 mr-2" />
                    Recherches Rapides
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-xs text-indigo-500 hover:text-indigo-600 font-medium"
                  >
                    Tout voir
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {trendingSearches.slice(0, 6).map((item, index) => (
                    <motion.button
                      key={index}
                      variants={suggestionVariants}
                      custom={index}
                      whileHover="hover"
                      onClick={() => handleQuickSearch(item.query)}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        {getSearchIcon(item.category)}
                        <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {item.query}
                        </span>
                      </div>
                      {item.trending && (
                        <div className="flex items-center space-x-1 text-red-500">
                          <ArrowTrendingUpIcon className="h-4 w-4" />
                          <span className="text-xs font-medium">Hot</span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && !query && (
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    Recherches Récentes
                  </h3>
                  <button 
                    onClick={clearSearchHistory}
                    className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors font-medium"
                  >
                    Effacer
                  </button>
                </div>
                <div className="space-y-2">
                  {recentSearches.slice(0, 5).map((term, index) => (
                    <motion.button
                      key={`recent-${index}`}
                      variants={suggestionVariants}
                      custom={index}
                      whileHover="hover"
                      onClick={() => handleQuickSearch(term)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <FaHistory className="h-4 w-4 text-gray-400 group-hover:text-indigo-500" />
                        <span className="font-medium">{term}</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {suggestions.length > 0 && query && (
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4 flex items-center">
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                  Suggestions ({suggestions.length})
                </h3>
                <div className="space-y-2">
                  {suggestions.map((movie, index) => {
                    const popularity = getPopularityBadge(movie.popularity);
                    return (
                      <motion.button
                        key={movie.imdbID}
                        variants={suggestionVariants}
                        custom={index}
                        whileHover="hover"
                        onClick={() => handleSuggestionClick(movie)}
                        className="w-full flex items-center px-4 py-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all group"
                      >
                        {/* Movie Poster/Icon */}
                        <div className="flex-shrink-0 mr-4">
                          {movie.Poster && movie.Poster !== 'N/A' ? (
                            <img 
                              src={movie.Poster} 
                              alt={movie.Title}
                              className="w-12 h-16 object-cover rounded-lg shadow-sm"
                            />
                          ) : (
                            <div className="w-12 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-lg flex items-center justify-center">
                              <FaFilm className="text-gray-400 text-xl" />
                            </div>
                          )}
                        </div>
                        
                        {/* Movie Info */}
                        <div className="flex-1 text-left">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                                {movie.Title}
                              </h4>
                              <div className="flex items-center space-x-3 mt-1">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {movie.Year}
                                </span>
                                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300 capitalize">
                                  {movie.Type}
                                </span>
                                {movie.imdbRating && (
                                  <div className="flex items-center space-x-1">
                                    <FaStar className="h-3 w-3 text-yellow-400" />
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                      {movie.imdbRating}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Popularity Badge */}
                            <span className={`text-xs px-2 py-1 rounded-full text-white ${popularity.color}`}>
                              {popularity.text}
                            </span>
                          </div>
                        </div>

                        {/* Trending Icon */}
                        {movie.trending && (
                          <span className="ml-2">
                            {getTrendingIcon(movie)}
                          </span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results */}
            {query.length > 2 && !isLoading && suggestions.length === 0 && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Aucun résultat pour "{query}". Essayez avec d'autres termes.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Action', 'Comédie', 'Drame', 'Science-Fiction'].map(genre => (
                    <button
                      key={genre}
                      onClick={() => handleQuickSearch(genre)}
                      className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-8 text-center">
                <div className="flex items-center justify-center space-x-3 text-indigo-500">
                  <FaSpinner className="animate-spin h-5 w-5" />
                  <span className="font-medium">Recherche en cours...</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProfessionalSearch;