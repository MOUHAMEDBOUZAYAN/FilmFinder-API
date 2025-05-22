import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaStar, FaHeart, FaClock, FaFilm, FaUser, FaPlay, FaCalendar, FaGlobe } from 'react-icons/fa';

const EnhancedMovieCard = ({ movie, index }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.imdbID === movie.imdbID);
  });
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = useRef(null);

  // Load animation when card is in viewport
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updated));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    }

    setIsFavorite(!isFavorite);
  };

  const handleImageError = (e) => {
    setImageError(true);
    e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return 'Unknown';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Get color based on rating
  const getRatingColor = (rating) => {
    if (!rating) return 'bg-gray-500';
    const numRating = parseFloat(rating);
    if (numRating >= 8) return 'bg-green-500';
    if (numRating >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: index ? Math.min(index * 0.1, 0.5) : 0,
        ease: "easeOut"
      }
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px rgba(0, 0, 0, 0.2)",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const favoriteVariants = {
    initial: { 
      scale: 0, 
      opacity: 0 
    },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        delay: 0.2 
      }
    },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 }
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  // Generate color gradients for cards without images
  const generateGradient = () => {
    const gradients = [
      'bg-gradient-to-br from-blue-500 to-purple-600',
      'bg-gradient-to-br from-primary-500 to-yellow-600',
      'bg-gradient-to-br from-green-500 to-blue-600',
      'bg-gradient-to-br from-red-500 to-yellow-500',
      'bg-gradient-to-br from-pink-500 to-purple-500',
      'bg-gradient-to-br from-yellow-400 to-orange-600',
      'bg-gradient-to-br from-teal-400 to-blue-500',
      'bg-gradient-to-br from-indigo-500 to-purple-500'
    ];
    
    // Use movie ID to get a consistent gradient
    const id = movie.imdbID || '';
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  const randomGradient = generateGradient();

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden relative group"
      style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {/* Movie Poster */}
        <div className="relative pb-[150%] overflow-hidden">
          {/* Shimmer loading effect */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          )}

          {imageError || !movie.Poster || movie.Poster === 'N/A' ? (
            <div className={`absolute inset-0 ${randomGradient} flex items-center justify-center text-white p-4`}>
              <div className="text-center">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
                >
                  <FaFilm className="w-12 h-12 mx-auto mb-3 opacity-75" />
                </motion.div>
                <h3 className="text-lg font-bold">{truncateText(movie.Title, 20)}</h3>
                <div className="flex justify-center items-center mt-2 text-sm opacity-80">
                  <FaCalendar className="mr-1" />
                  <span>{movie.Year}</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              <motion.img
                src={movie.Poster}
                alt={movie.Title || 'Movie poster'}
                className="absolute top-0 left-0 w-full h-full object-cover"
                variants={imageVariants}
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{ opacity: imageLoaded ? 1 : 0 }}
              />
              
              {/* Subtle image overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
            </>
          )}
          
          {/* Rating Badge */}
          {movie.imdbRating && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.2, duration: 0.3 }
              }}
              className={`absolute top-2 left-2 ${getRatingColor(movie.imdbRating)} text-white px-2 py-1 rounded-md flex items-center text-sm font-semibold z-10`}
            >
              <FaStar className="mr-1" />
              {movie.imdbRating}
            </motion.div>
          )}

          {/* Year Badge */}
          {movie.Year && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: { delay: 0.3, duration: 0.3 }
              }}
              className="absolute top-2 right-10 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md flex items-center text-xs font-medium z-10"
            >
              {movie.Year}
            </motion.div>
          )}

          {/* Overlay on hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-4"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.h3 
                  className="text-lg font-bold text-white truncate mb-1"
                  variants={infoVariants}
                >
                  {movie.Title || 'Unknown Title'}
                </motion.h3>
                
                <motion.div 
                  className="flex justify-between items-center text-sm text-gray-300 mb-3"
                  variants={infoVariants}
                >
                  <span className="flex items-center">
                    <FaCalendar className="mr-1" />
                    {movie.Year || 'Unknown Year'}
                  </span>
                  <span className="flex items-center capitalize">
                    <FaFilm className="mr-1" />
                    {movie.Type}
                  </span>
                </motion.div>
                
                {movie.Genre && (
                  <motion.div
                    variants={infoVariants}
                    className="flex flex-wrap gap-1 mb-3"
                  >
                    {movie.Genre.split(',').map((genre, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full"
                      >
                        {genre.trim()}
                      </span>
                    ))}
                  </motion.div>
                )}
                
                <motion.div
                  variants={infoVariants}
                  className="flex justify-center items-center"
                >
                  <motion.button 
                    className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-full transition-colors w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Redirection directe vers la page de détails
                    }}
                  >
                    <FaPlay /> Voir Détails
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Movie Info (shown only when not hovered) */}
        <AnimatePresence>
          {!isHovered && (
            <motion.div 
              className="p-4"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate mb-1">
                {truncateText(movie.Title, 25)}
              </h3>

              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>{movie.Year || 'Unknown Year'}</span>
                <span className="capitalize">{movie.Type}</span>
              </div>

              {/* Additional Info */}
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1 mt-2">
                {movie.Runtime && (
                  <div className="flex items-center gap-2">
                    <FaClock className="text-primary-500" />
                    <span>{movie.Runtime}</span>
                  </div>
                )}
                {movie.Language && (
                  <div className="flex items-center gap-2">
                    <FaGlobe className="text-primary-500" />
                    <span>{truncateText(movie.Language, 15)}</span>
                  </div>
                )}
                {movie.Director && (
                  <div className="flex items-center gap-2">
                    <FaUser className="text-primary-500" />
                    <span>{truncateText(movie.Director, 15)}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Favorite Button */}
      <motion.button
        onClick={toggleFavorite}
        variants={favoriteVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        whileTap="tap"
        className={`absolute top-2 right-2 p-2 rounded-full shadow-lg transition-all z-20 ${
          isFavorite
            ? 'bg-red-500 text-white'
            : 'bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 text-gray-800 dark:text-white'
        }`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <FaHeart className={isFavorite ? 'text-white' : 'text-red-500'} />
      </motion.button>
    </motion.div>
  );
};

EnhancedMovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default EnhancedMovieCard;