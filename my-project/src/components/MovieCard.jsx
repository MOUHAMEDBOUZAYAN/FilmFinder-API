import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useState } from 'react';

const MovieCard = ({ movie, index }) => {
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(fav => fav.imdbID === movie.imdbID);
  });

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index ? index * 0.05 : 0 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-dark-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 relative group"
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {/* Movie Poster */}
        <div className="relative pb-[150%] overflow-hidden">
          <motion.img
            src={
              movie.Poster && movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.Title || 'Movie poster'}
            className="absolute top-0 left-0 w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          {/* Rating Badge */}
          {movie.imdbRating && (
            <motion.div 
              className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-md flex items-center text-sm font-semibold"
              whileHover={{ scale: 1.1 }}
            >
              <FaStar className="mr-1" />
              {movie.imdbRating}
            </motion.div>
          )}
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate mb-1">
            {movie.Title || 'Unknown Title'}
          </h3>
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
            <span>{movie.Year || 'Unknown Year'}</span>
            <span className="capitalize">{movie.Type}</span>
          </div>
        </div>
      </Link>

      {/* Favorite Button */}
      <motion.button
        onClick={toggleFavorite}
        className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all ${isFavorite ? 'bg-red-500 text-white' : 'bg-white dark:bg-dark-700 text-gray-800 dark:text-white'}`}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaHeart />
      </motion.button>
    </motion.div>
  );
};

export default MovieCard;