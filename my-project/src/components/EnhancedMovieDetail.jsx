 import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getMovieDetails } from '../services/api';
import Loader from '../components/Loader';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { FaImdb, FaHeart, FaClock, FaCalendar, FaVideo, FaGlobe, FaLanguage, FaDollarSign, FaTrophy } from 'react-icons/fa';

const EnhancedMovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);

        if (!data || data.Response === 'False') {
          throw new Error('Movie not found');
        }

        // Check if movie is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(fav => fav.imdbID === data.imdbID));

        setMovie(data);
        // Scroll to top on new movie
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      const updated = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updated));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    }
    
    setIsFavorite(!isFavorite);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="text-red-500 mb-4">{error}</div>
      <button
        onClick={() => navigate(-1)}
        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      {/* Movie Backdrop */}
      <motion.div 
        variants={backdropVariants}
        className="absolute top-0 left-0 w-full h-[500px] overflow-hidden z-0"
      >
        <div 
          className="w-full h-full bg-center bg-cover opacity-25 dark:opacity-20"
          style={{ 
            backgroundImage: `url(${movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1600x900?text=No+Backdrop'})`,
            filter: 'blur(10px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-white dark:to-dark-900"></div>
      </motion.div>

      <div className="container mx-auto px-4 pt-8 pb-12 relative z-10">
        <motion.button
          variants={itemVariants}
          onClick={() => navigate(-1)}
          className="flex items-center text-primary-500 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Retour aux Films
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster Column */}
          <motion.div variants={itemVariants} className="lg:w-1/3">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={
                  movie.Poster && movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
                alt={movie.Title || 'Poster'}
                className="w-full h-auto rounded-lg"
              />
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleFavorite}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-colors ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <FaHeart className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Quick Info - Mobile Only */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 lg:hidden"
            >
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {movie.Title}
              </h1>
              
              <div className="flex items-center mb-4">
                {movie.imdbRating && (
                  <div className="flex items-center bg-yellow-500 text-gray-900 px-3 py-1 rounded-md mr-3">
                    <StarIcon className="h-5 w-5 mr-1" />
                    <span className="font-bold">{movie.imdbRating}</span>
                  </div>
                )}
                
                <span className="text-gray-600 dark:text-gray-300">{movie.Year}</span>
                
                {movie.Rated && (
                  <span className="ml-3 border border-gray-300 dark:border-gray-600 px-2 py-0.5 rounded">
                    {movie.Rated}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Movie Stats */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 bg-white dark:bg-dark-700 p-5 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Informations
              </h3>
              
              <ul className="space-y-3">
                {movie.Runtime && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaClock className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.Runtime}</span>
                  </li>
                )}
                
                {movie.Year && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCalendar className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Sorti en {movie.Year}</span>
                  </li>
                )}
                
                {movie.Language && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaLanguage className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.Language}</span>
                  </li>
                )}
                
                {movie.Country && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaGlobe className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.Country}</span>
                  </li>
                )}
                
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaDollarSign className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.BoxOffice}</span>
                  </li>
                )}
                
                {movie.Type && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaVideo className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="capitalize">{movie.Type}</span>
                  </li>
                )}
              </ul>
              
              {movie.imdbID && (
                <a 
                  href={`https://www.imdb.com/title/${movie.imdbID}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center mt-5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded-md transition-colors"
                >
                  <FaImdb className="text-xl mr-2" /> Voir sur IMDb
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Details Column */}
          <motion.div variants={itemVariants} className="lg:w-2/3">
            {/* Title and Rating - Desktop Only */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
                {movie.Title}
              </h1>
              
              <div className="flex items-center">
                {movie.imdbRating && (
                  <div className="flex items-center bg-yellow-500 text-gray-900 px-3 py-1 rounded-md mr-3">
                    <StarIcon className="h-5 w-5 mr-1" />
                    <span className="font-bold">{movie.imdbRating}</span>
                  </div>
                )}
                
                <span className="text-gray-600 dark:text-gray-300">{movie.Year}</span>
                
                {movie.Rated && (
                  <span className="ml-3 border border-gray-300 dark:border-gray-600 px-2 py-0.5 rounded">
                    {movie.Rated}
                  </span>
                )}
              </div>
            </div>

            {/* Genres */}
            {movie.Genre && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                {movie.Genre.split(',').map((genre) => (
                  <span
                    key={genre}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Tabs Navigation */}
            <motion.div variants={itemVariants} className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'about'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  À Propos
                </button>
                <button
                  onClick={() => setActiveTab('cast')}
                  className={`py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'cast'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Casting & Équipe
                </button>
                <button
                  onClick={() => setActiveTab('awards')}
                  className={`py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'awards'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Récompenses
                </button>
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md"
                >
                  {movie.Plot && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                        Synopsis
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {movie.Plot}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {movie.Writer && movie.Writer !== 'N/A' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Scénariste(s)
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {movie.Writer}
                        </p>
                      </div>
                    )}
                    
                    {movie.Production && movie.Production !== 'N/A' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Production
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {movie.Production}
                        </p>
                      </div>
                    )}
                    
                    {movie.Released && movie.Released !== 'N/A' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Date de sortie
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {movie.Released}
                        </p>
                      </div>
                    )}
                    
                    {movie.Metascore && movie.Metascore !== 'N/A' && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Metascore
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-md text-white font-bold ${
                          parseInt(movie.Metascore) >= 70 ? 'bg-green-500' :
                          parseInt(movie.Metascore) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {movie.Metascore}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'cast' && (
                <motion.div
                  key="cast"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md"
                >
                  {movie.Director && movie.Director !== 'N/A' && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                        Réalisateur(s)
                      </h2>
                      <div className="flex items-center p-3 bg-gray-50 dark:bg-dark-600 rounded-lg">
                        <div className="flex-shrink-0 bg-gray-200 dark:bg-dark-500 rounded-full p-3 mr-4">
                          <FaUser className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">
                            {movie.Director}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Réalisateur
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {movie.Actors && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                        Acteurs principaux
                      </h2>
                      <div className="space-y-3">
                        {movie.Actors.split(',').map((actor, index) => (
                          <div 
                            key={index}
                            className="flex items-center p-3 bg-gray-50 dark:bg-dark-600 rounded-lg"
                          >
                            <div className="flex-shrink-0 bg-gray-200 dark:bg-dark-500 rounded-full p-3 mr-4">
                              <FaUser className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <p className="text-gray-800 dark:text-gray-200 font-medium">
                                {actor.trim()}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Acteur
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              {activeTab === 'awards' && (
                <motion.div
                  key="awards"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-dark-700 rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-center mb-6">
                    <FaTrophy className="text-yellow-500 w-8 h-8 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Récompenses et Nominations
                    </h2>
                  </div>
                  
                  {movie.Awards && movie.Awards !== 'N/A' ? (
                    <div className="p-4 bg-gray-50 dark:bg-dark-600 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {movie.Awards}
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Aucune information disponible sur les récompenses.
                    </p>
                  )}
                  
                  {movie.Ratings && movie.Ratings.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                        Notes
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {movie.Ratings.map((rating, index) => (
                          <div 
                            key={index}
                            className="bg-gray-50 dark:bg-dark-600 p-4 rounded-lg text-center"
                          >
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                              {rating.Source}
                            </p>
                            <p className="text-xl font-bold text-gray-800 dark:text-white">
                              {rating.Value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedMovieDetail;