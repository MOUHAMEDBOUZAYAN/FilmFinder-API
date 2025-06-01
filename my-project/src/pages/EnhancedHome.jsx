import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { searchMovies, sampleMovies } from '../services/api';
import ImprovedMovieCard from '../components/MovieCard';
import HeroSection from '../components/EnhancedHeroSection';
import Loader from '../components/ImprovedLoader';
import { 
  FaFire, FaSearch, FaHeart, FaStar, FaFilm, 
  FaExclamationCircle, FaArrowRight
} from 'react-icons/fa';

const TRENDING_TERMS = ['action', 'comedy', 'drama', 'sci-fi', 'adventure', 'fantasy', 'horror', 'thriller', 'animation'];

const EnhancedHome = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  // Load trending movies on component mount
  useEffect(() => {
    const loadTrending = async () => {
      setTrendingLoading(true);
      try {
        const randomTerm = TRENDING_TERMS[Math.floor(Math.random() * TRENDING_TERMS.length)];
        setCurrentSearchTerm(randomTerm);
        const { Search } = await searchMovies(randomTerm);
        
        if (Search && Search.length > 0) {
          // Trending movies
          setTrendingMovies(sampleMovies(Search, 8));
          
          // Get top rated movies (we'll simulate this with a different sample)
          const topRated = [...Search].sort(() => 0.5 - Math.random()).slice(0, 4);
          setTopRatedMovies(topRated);
        }
      } catch (error) {
        console.error('Error loading trending:', error);
      } finally {
        setTrendingLoading(false);
      }
    };

    loadTrending();
  }, []);

  // Handle search from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    const getMovies = async () => {
      if (!searchQuery) {
        setMovies([]);
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const { Search } = await searchMovies(searchQuery);
        setMovies(Search || []);
      } catch (error) {
        setError(error.message.includes('API key')
          ? 'Problème de connexion à la base de données'
          : 'Erreur de chargement des films');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(getMovies, 500);
    return () => clearTimeout(timer);
  }, [location.search]);

  const handleTrendingClick = (term) => {
    navigate(`/?search=${encodeURIComponent(term)}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div>
        {/* Hero Section (only show when not searching) */}
        {!location.search && <HeroSection />}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          {/* Search Results */}
          {location.search && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mb-12"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FaSearch className="text-primary-500 mr-3" />
                  Résultats pour "{new URLSearchParams(location.search).get('search')}"
                </h2>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="text-primary-500 hover:text-primary-600 font-medium py-2 px-4 rounded-full border border-primary-500 hover:border-primary-600 transition-colors"
                >
                  Retour à l'accueil
                </motion.button>
              </div>
              
              {loading ? (
                <div className="py-20">
                  <Loader size="lg" />
                </div>
              ) : error ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center py-10 px-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-500 dark:text-red-400"
                >
                  <FaExclamationCircle className="mr-2 text-xl" />
                  <span>{error}</span>
                </motion.div>
              ) : movies?.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {movies.map((movie, index) => (
                    <ImprovedMovieCard key={movie.imdbID} movie={movie} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <FaSearch className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Aucun film trouvé
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Essayez avec d'autres termes ou explorez nos suggestions ci-dessous.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {TRENDING_TERMS.slice(0, 5).map(term => (
                      <motion.button
                        key={term}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTrendingClick(term)}
                        className="px-4 py-2 bg-primary-100 dark:bg-primary-900/20 text-primary-500 rounded-full hover:bg-primary-200 dark:hover:bg-primary-800/30 transition-colors"
                      >
                        {term}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.section>
          )}

          {/* Trending Section - Only show on homepage */}
          {!location.search && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              className="mb-16"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                  <FaFire className="text-orange-500 mr-3" />
                  Tendances: <span className="ml-2 text-primary-500 capitalize">{currentSearchTerm}</span>
                </h2>
                
                <div className="flex space-x-1">
                  {TRENDING_TERMS.slice(0, 6).map((term, index) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => handleTrendingClick(term)}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800/70 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {trendingLoading ? (
                <div className="py-20">
                  <Loader />
                </div>
              ) : trendingMovies?.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {trendingMovies.map((movie, index) => (
                    <ImprovedMovieCard key={movie.imdbID} movie={movie} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-600 dark:text-gray-300 py-10"
                >
                  Impossible de charger les suggestions
                </motion.p>
              )}
            </motion.section>
          )}

          {/* Featured Categories - Only show on homepage */}
          {!location.search && topRatedMovies.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Top Rated */}
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center mb-6">
                  <FaStar className="text-yellow-500 mr-3" />
                  Les mieux notés
                </h2>
                
                <div className="space-y-4">
                  {topRatedMovies.slice(0, 3).map((movie, index) => (
                    <motion.div
                      key={movie.imdbID}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      className="flex bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => navigate(`/movie/${movie.imdbID}`)}
                    >
                      <img 
                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/120x180?text=No+Poster'} 
                        alt={movie.Title}
                        className="w-20 h-auto object-cover"
                      />
                      <div className="p-3 flex-grow">
                        <h3 className="font-semibold text-gray-800 dark:text-white truncate">{movie.Title}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-300">{movie.Year}</span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200 px-2 py-1 rounded-full">
                            Top
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
              
              {/* Editors Choice */}
              <motion.section
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center mb-6">
                  <FaFilm className="text-primary-500 mr-3" />
                  Choix de l'éditeur
                </h2>
                
                <div className="relative overflow-hidden rounded-lg shadow-lg h-[300px] group">
                  <img 
                    src={topRatedMovies[0].Poster !== 'N/A' ? topRatedMovies[0].Poster : 'https://via.placeholder.com/500x300?text=Featured+Film'} 
                    alt={topRatedMovies[0].Title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-xs text-primary-500 bg-white/90 dark:bg-gray-800/90 px-3 py-1 rounded-full mb-2 inline-block">
                      À découvrir
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{topRatedMovies[0].Title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{topRatedMovies[0].Year}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/movie/${topRatedMovies[0].imdbID}`);
                        }}
                        className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-full text-sm transition-colors"
                      >
                        Voir détails
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.section>
            </div>
          )}
          
          {/* Trending Categories - Only show on homepage */}
          {!location.search && (
            <motion.section
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg mr-3 text-white">
                    <FaHeart />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Catégories populaires
                  </h2>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {[
                  { name: 'Action', id: 'action', gradient: 'from-red-500 via-red-400 to-orange-500', shadow: 'shadow-red-500/20' },
                  { name: 'Comédie', id: 'comedy', gradient: 'from-yellow-400 via-amber-400 to-orange-400', shadow: 'shadow-yellow-500/20' },
                  { name: 'Drame', id: 'drama', gradient: 'from-blue-500 via-blue-400 to-indigo-500', shadow: 'shadow-blue-500/20' },
                  { name: 'Sci-Fi', id: 'sci-fi', gradient: 'from-purple-500 via-violet-500 to-indigo-500', shadow: 'shadow-purple-500/20' },
                  { name: 'Aventure', id: 'adventure', gradient: 'from-green-500 via-emerald-500 to-teal-500', shadow: 'shadow-green-500/20' },
                  { name: 'Thriller', id: 'thriller', gradient: 'from-indigo-600 via-indigo-500 to-blue-600', shadow: 'shadow-indigo-500/20' },
                  { name: 'Animation', id: 'animation', gradient: 'from-sky-500 via-cyan-400 to-blue-500', shadow: 'shadow-sky-500/20' },
                  { name: 'Romance', id: 'romance', gradient: 'from-pink-500 via-rose-400 to-red-500', shadow: 'shadow-pink-500/20' },
                  { name: 'Horreur', id: 'horror', gradient: 'from-gray-800 via-gray-700 to-gray-900', shadow: 'shadow-gray-800/20' },
                  { name: 'Famille', id: 'family', gradient: 'from-amber-500 via-yellow-500 to-orange-400', shadow: 'shadow-amber-500/20' },
                  { name: 'Crime', id: 'crime', gradient: 'from-slate-700 via-slate-600 to-gray-700', shadow: 'shadow-slate-600/20' },
                  { name: 'Mystère', id: 'mystery', gradient: 'from-teal-500 via-teal-400 to-emerald-500', shadow: 'shadow-teal-500/20' }
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.05 * index, duration: 0.3 }
                    }}
                    whileHover={{ 
                      y: -7, 
                      scale: 1.02,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`bg-gradient-to-br ${category.gradient} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl ${category.shadow} transition-all cursor-pointer`}
                    onClick={() => handleTrendingClick(category.id)}
                  >
                    <div className="p-6 flex items-center justify-center aspect-square relative">
                      {/* Overlay de brillance pour un aspect premium */}
                      <div className="absolute inset-0 bg-white opacity-10 rounded-tl-full"></div>
                      
                      {/* Nom de la catégorie */}
                      <h3 className="font-bold text-white text-xl drop-shadow-md text-center">
                        {category.name}
                      </h3>
                      
                      {/* Point de lumière en haut à droite */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full blur-xl opacity-40"></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EnhancedHome;