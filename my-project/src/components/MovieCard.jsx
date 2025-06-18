import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import { 
  FaStar, FaHeart, FaClock, FaFilm, FaUser, FaPlay, FaCalendar, 
  FaGlobe, FaBookmark, FaShare, FaEye, FaThumbsUp, FaDownload,
  FaCrown, FaFire, FaAward, FaPlus
} from 'react-icons/fa';
import { 
  StarIcon, HeartIcon, PlayIcon, BookmarkIcon, 
  ShareIcon, EyeIcon, ClockIcon, FilmIcon, ArrowTrendingUpIcon
} from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

const MovieCard = ({ movie, index, layout = 'grid', isPremium = false }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.imdbID === movie.imdbID);
  });
  
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [popularity, setPopularity] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const controls = useAnimation();

  // Simulate popularity and trending status
  useEffect(() => {
    setPopularity(Math.floor(Math.random() * 100) + 1);
    
    // Check if in watchlist
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setIsWatchlisted(watchlist.some(item => item.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  // Intersection Observer for lazy loading and animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(entry.target);
      }
    };
  }, [controls]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updated));
      // Add notification for removing from favorites
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.unshift({
        id: Date.now(),
        type: 'favorite',
        message: `Vous avez retiré "${movie.Title}" de vos favoris`,
        timestamp: new Date().toISOString(),
        read: false
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
      // Show toast notification
      toast.success(`"${movie.Title}" retiré des favoris`);
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
      // Add notification for adding to favorites
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.unshift({
        id: Date.now(),
        type: 'favorite',
        message: `Vous avez ajouté "${movie.Title}" à vos favoris`,
        timestamp: new Date().toISOString(),
        read: false
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
      // Show toast notification
      toast.success(`"${movie.Title}" ajouté aux favoris`);
    }

    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (isWatchlisted) {
      const updated = watchlist.filter(item => item.imdbID !== movie.imdbID);
      localStorage.setItem('watchlist', JSON.stringify(updated));
      // Add notification for removing from watchlist
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.unshift({
        id: Date.now(),
        type: 'watchlist',
        message: `Vous avez retiré "${movie.Title}" de votre liste à voir`,
        timestamp: new Date().toISOString(),
        read: false
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } else {
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, movie]));
      // Add notification for adding to watchlist
      const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
      notifications.unshift({
        id: Date.now(),
        type: 'watchlist',
        message: `Vous avez ajouté "${movie.Title}" à votre liste à voir`,
        timestamp: new Date().toISOString(),
        read: false
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }

    setIsWatchlisted(!isWatchlisted);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: movie.Title,
        text: `Découvre ${movie.Title} sur FilmHub Pro!`,
        url: `${window.location.origin}/movie/${movie.imdbID}`
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/movie/${movie.imdbID}`);
    }
  };

  const handleQuickPlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return 'Unknown';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const getRatingColor = (rating) => {
    if (!rating) return 'bg-gray-500';
    const numRating = parseFloat(rating);
    if (numRating >= 8) return 'bg-emerald-500';
    if (numRating >= 7) return 'bg-green-500';
    if (numRating >= 6) return 'bg-yellow-500';
    if (numRating >= 5) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getPopularityLevel = () => {
    if (popularity >= 90) return { level: 'Viral', color: 'from-red-500 to-pink-500', icon: FaFire };
    if (popularity >= 75) return { level: 'Trending', color: 'from-orange-500 to-red-500', icon: ArrowTrendingUpIcon };
    if (popularity >= 50) return { level: 'Popular', color: 'from-blue-500 to-purple-500', icon: FaStar };
    return { level: 'Rising', color: 'from-green-500 to-blue-500', icon: FaPlus };
  };

  const generateGradient = () => {
    const gradients = [
      'from-blue-600 via-purple-600 to-indigo-600',
      'from-emerald-500 via-teal-500 to-cyan-500',
      'from-pink-500 via-rose-500 to-red-500',
      'from-amber-500 via-orange-500 to-red-500',
      'from-violet-600 via-purple-600 to-blue-600',
      'from-indigo-500 via-blue-500 to-cyan-500',
      'from-green-500 via-emerald-500 to-teal-500',
      'from-rose-500 via-pink-500 to-purple-500'
    ];
    
    const id = movie.imdbID || '';
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  const popularityData = getPopularityLevel();
  const randomGradient = generateGradient();

  // Animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.6, 
        delay: index ? Math.min(index * 0.1, 0.8) : 0,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: { 
      y: -16,
      scale: 1.03,
      rotateX: 5,
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const actionButtonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 500, 
        delay: 0.1
      }
    },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 }
  };

  const quickActionsVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        staggerChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 500,
        delay: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative group cursor-pointer transform-gpu ${
        layout === 'list' ? 'flex' : 'block'
      }`}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-xl ${
          layout === 'list' ? 'flex' : 'block'
        }`}>
          {/* Premium Badge */}
          {isPremium && (
            <motion.div
              variants={badgeVariants}
              initial="initial"
              animate="animate"
              className="absolute top-3 left-3 z-30 flex items-center px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full"
            >
              <FaCrown className="mr-1" />
              PREMIUM
            </motion.div>
          )}

          {/* Popularity Badge */}
          {popularity >= 75 && (
            <motion.div
              variants={badgeVariants}
              initial="initial"
              animate="animate"
              className={`absolute top-3 right-3 z-30 flex items-center px-3 py-1 bg-gradient-to-r ${popularityData.color} text-white text-xs font-bold rounded-full shadow-lg`}
            >
              <popularityData.icon className="mr-1" />
              {popularityData.level}
            </motion.div>
          )}

          {/* Movie Poster */}
          <div className={`relative overflow-hidden ${
            layout === 'list' ? 'w-32 h-48 flex-shrink-0' : 'pb-[150%]'
          }`}>
            {/* Loading Shimmer */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
            )}

            {imageError || !movie.Poster || movie.Poster === 'N/A' ? (
              <div className={`absolute inset-0 bg-gradient-to-br ${randomGradient} flex items-center justify-center text-white p-6`}>
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="mb-4"
                  >
                    <FilmIcon className="w-16 h-16 mx-auto opacity-75" />
                  </motion.div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">{truncateText(movie.Title, 25)}</h3>
                  <div className="flex justify-center items-center text-sm opacity-80">
                    <FaCalendar className="mr-2" />
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
                
                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              </>
            )}
            
            {/* Rating Badge */}
            {movie.imdbRating && (
              <motion.div 
                variants={badgeVariants}
                initial="initial"
                animate="animate"
                className={`absolute top-4 left-4 ${getRatingColor(movie.imdbRating)} text-white px-3 py-1 rounded-xl flex items-center text-sm font-bold shadow-lg z-20`}
              >
                <StarIcon className="mr-1 h-4 w-4" />
                {movie.imdbRating}
              </motion.div>
            )}

            {/* Year Badge */}
            {movie.Year && (
              <motion.div 
                variants={badgeVariants}
                initial="initial"
                animate="animate"
                className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-xl text-sm font-semibold z-20 border border-white/20"
              >
                {movie.Year}
              </motion.div>
            )}

            {/* Quick Play Button */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <motion.button
                    onClick={handleQuickPlay}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:bg-white transition-colors"
                  >
                    <PlayIcon className="h-6 w-6 text-gray-900 ml-1" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover Overlay with Details */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6 z-10"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.h3 
                    className="text-xl font-bold text-white mb-2 leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {truncateText(movie.Title, 30)}
                  </motion.h3>
                  
                  <motion.div 
                    className="flex justify-between items-center text-sm text-gray-300 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="flex items-center">
                      <FaCalendar className="mr-1" />
                      {movie.Year}
                    </span>
                    <span className="flex items-center capitalize bg-white/20 px-2 py-1 rounded-full">
                      <FaFilm className="mr-1" />
                      {movie.Type}
                    </span>
                  </motion.div>
                  
                  {/* Genre Tags */}
                  {movie.Genre && (
                    <motion.div
                      className="flex flex-wrap gap-1 mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {movie.Genre.split(',').slice(0, 3).map((genre, i) => (
                        <span 
                          key={i}
                          className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white border border-white/30"
                        >
                          {genre.trim()}
                        </span>
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Quick Actions */}
                  <motion.div
                    variants={quickActionsVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex justify-between items-center"
                  >
                    <div className="flex space-x-2">
                      <motion.button 
                        variants={actionButtonVariants}
                        onClick={toggleFavorite}
                        className={`p-2 rounded-full transition-all ${
                          isFavorite 
                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                            : 'bg-white/20 backdrop-blur-sm text-white hover:bg-red-500'
                        }`}
                      >
                        <HeartIcon className="h-4 w-4" />
                      </motion.button>
                      
                      <motion.button 
                        variants={actionButtonVariants}
                        onClick={toggleWatchlist}
                        className={`p-2 rounded-full transition-all ${
                          isWatchlisted 
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                            : 'bg-white/20 backdrop-blur-sm text-white hover:bg-blue-500'
                        }`}
                      >
                        <BookmarkIcon className="h-4 w-4" />
                      </motion.button>
                      
                      <motion.button 
                        variants={actionButtonVariants}
                        onClick={handleShare}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-indigo-500 transition-all"
                      >
                        <ShareIcon className="h-4 w-4" />
                      </motion.button>
                    </div>
                    
                    <motion.button
                      variants={actionButtonVariants}
                      onClick={handleQuickPlay}
                      className="flex items-center px-4 py-2 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      Voir
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Movie Info (visible when not hovered) */}
          <AnimatePresence>
            {!isHovered && (
              <motion.div 
                className={`p-6 ${layout === 'list' ? 'flex-1' : ''}`}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-white leading-tight flex-1 mr-2">
                    {truncateText(movie.Title, layout === 'list' ? 40 : 25)}
                  </h3>
                  
                  {/* Popularity Indicator */}
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${popularityData.color} animate-pulse`}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                  <span className="flex items-center">
                    <FaCalendar className="mr-1" />
                    {movie.Year}
                  </span>
                  <span className="capitalize px-2 py-1 bg-gray-800 rounded-full text-xs">
                    {movie.Type}
                  </span>
                </div>

                {/* Enhanced Details */}
                <div className="space-y-3">
                  {movie.Runtime && (
                    <div className="flex items-center text-sm text-gray-300">
                      <ClockIcon className="h-4 w-4 text-indigo-400 mr-2" />
                      <span>{movie.Runtime}</span>
                    </div>
                  )}
                  
                  {movie.Language && (
                    <div className="flex items-center text-sm text-gray-300">
                      <FaGlobe className="h-4 w-4 text-green-400 mr-2" />
                      <span>{truncateText(movie.Language, 20)}</span>
                    </div>
                  )}
                  
                  {movie.Director && (
                    <div className="flex items-center text-sm text-gray-300">
                      <FaUser className="h-4 w-4 text-purple-400 mr-2" />
                      <span>{truncateText(movie.Director, 20)}</span>
                    </div>
                  )}
                  
                  {/* Popularity Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Popularité</span>
                      <span className="text-xs text-gray-300">{popularity}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <motion.div 
                        className={`h-1.5 rounded-full bg-gradient-to-r ${popularityData.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${popularity}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>

      {/* Floating Action Buttons */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-30">
        <motion.button
          onClick={toggleFavorite}
          variants={actionButtonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          className={`p-3 rounded-full shadow-2xl transition-all backdrop-blur-sm ${
            isFavorite
              ? 'bg-red-500 text-white shadow-red-500/40'
              : 'bg-white/10 text-white hover:bg-red-500 border border-white/20'
          }`}
        >
          <HeartIcon className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Enhanced Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl"></div>
      </div>
    </motion.div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  index: PropTypes.number,
  layout: PropTypes.oneOf(['grid', 'list']),
  isPremium: PropTypes.bool,
};

export default MovieCard;
