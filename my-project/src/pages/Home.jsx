import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies, sampleMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { FaFire, FaSearch, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TRENDING_TERMS = ['action', 'comedy', 'drama', 'sci-fi', 'adventure', 'fantasy', 'horror'];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrending = async () => {
      setTrendingLoading(true);
      try {
        const randomTerm = TRENDING_TERMS[Math.floor(Math.random() * TRENDING_TERMS.length)];
        const { Search } = await searchMovies(randomTerm);
        setTrendingMovies(sampleMovies(Search || []));
      } catch (error) {
        console.error('Error loading trending:', error);
      } finally {
        setTrendingLoading(false);
      }
    };

    loadTrending();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchQuery) {
          const { Search } = await searchMovies(searchQuery);
          setMovies(Search || []);
        } else {
          setMovies([]);
        }
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          Explorez le Monde du <span className="text-primary-500">Cinéma</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Découvrez, recherchez et sauvegardez vos films préférés
        </p>
      </motion.div>

      {/* Trending Terms */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
          <FaFire className="text-primary-500 mr-2" /> Tendances
        </h2>
        <div className="flex flex-wrap gap-3">
          {TRENDING_TERMS.map((term, index) => (
            <motion.button
              key={term}
              onClick={() => handleTrendingClick(term)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="px-4 py-2 bg-gray-100 dark:bg-dark-700 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
            >
              {term}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Search Results */}
      {location.search && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <FaSearch className="text-secondary-500 mr-2" />
            Résultats pour "{new URLSearchParams(location.search).get('search')}"
          </h2>
          
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="text-center text-red-500 py-10">{error}</div>
          ) : movies?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie, index) => (
                <motion.div
                  key={movie.imdbID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-600 dark:text-gray-300 py-10"
            >
              Aucun film trouvé. Essayez une autre recherche.
            </motion.p>
          )}
        </motion.section>
      )}

      {/* Trending Movies */}
      {!location.search && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <FaHeart className="text-primary-500 mr-2" /> Suggestions
          </h2>
          
          {trendingLoading ? (
            <Loader />
          ) : trendingMovies?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingMovies.map((movie, index) => (
                <motion.div
                  key={movie.imdbID}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
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
    </motion.div>
  );
};

export default Home;