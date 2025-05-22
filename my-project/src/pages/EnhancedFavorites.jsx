import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTrash, FaArrowRight, FaExclamationCircle, FaSearch } from 'react-icons/fa';
import { getMovieDetails } from '../services/api';
import ImprovedMovieCard from '../components/ImprovedMovieCard';
import Loader from '../components/ImprovedLoader';

const EnhancedFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  // Fetch fresh details for each favorite movie
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const stored = JSON.parse(localStorage.getItem('favorites')) || [];
        
        if (stored.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }
        
        // Get updated details for each favorite
        const updatedFavorites = await Promise.all(
          stored.map(async (fav) => {
            try {
              const details = await getMovieDetails(fav.imdbID);
              return details || fav; // Fallback to stored if API fails
            } catch {
              return fav; // Return original if update fails
            }
          })
        );

        setFavorites(updatedFavorites);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Erreur de chargement des favoris');
        // Fallback to locally stored if API fails
        const stored = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(stored);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (movie) => {
    if (deleteMode) {
      setSelectedMovie(movie);
    } else {
      performRemove(movie.imdbID);
    }
  };

  const performRemove = (imdbID) => {
    const updated = favorites.filter(movie => movie.imdbID !== imdbID);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    setSelectedMovie(null);
  };

  const cancelRemove = () => {
    setSelectedMovie(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 text-gray-800 dark:text-white"
        >
          Films Favoris
        </motion.h1>
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 dark:text-white flex items-center"
        >
          <FaHeart className="text-red-500 mr-3" />
          Films Favoris
          <span className="ml-3 bg-primary-500 text-white text-sm py-1 px-2 rounded-full">
            {favorites.length}
          </span>
        </motion.h1>
        
        {favorites.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setDeleteMode(!deleteMode)}
            className={`px-4 py-2 rounded-full flex items-center ${
              deleteMode 
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            <FaTrash className={`mr-2 ${deleteMode ? 'text-red-500' : ''}`} />
            {deleteMode ? 'Annuler' : 'Gérer les favoris'}
          </motion.button>
        )}
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md" 
          role="alert"
        >
          <div className="flex items-center">
            <FaExclamationCircle className="mr-2" />
            <p>{error} (affichage des données locales)</p>
          </div>
        </motion.div>
      )}

      {favorites.length > 0 ? (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                variants={itemVariants}
                exit="exit"
                className="relative"
                layout
              >
                <div className="relative">
                  <ImprovedMovieCard movie={movie} index={index} />
                  
                  {deleteMode && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onClick={() => handleRemoveFavorite(movie)}
                      className="absolute top-0 right-0 left-0 bottom-0 bg-black/50 flex items-center justify-center rounded-lg"
                    >
                      <div className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full">
                        <FaTrash className="h-6 w-6" />
                      </div>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <FaHeart className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-700 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Aucun film dans vos favoris
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Explorez notre catalogue et ajoutez des films à vos favoris pour les retrouver facilement plus tard.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-full shadow-md transition-colors inline-flex items-center"
          >
            Découvrir des films 
            <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={cancelRemove}
          >
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Confirmation
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Êtes-vous sûr de vouloir supprimer "{selectedMovie.Title}" de vos favoris ?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelRemove}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => performRemove(selectedMovie.imdbID)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedFavorites;