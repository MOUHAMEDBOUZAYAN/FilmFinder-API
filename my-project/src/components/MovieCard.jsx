import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaStar, FaHeart } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {/* Movie Poster */}
        <div className="relative pb-[150%] overflow-hidden">
          <img
            src={
              movie.Poster && movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.Title || 'Movie poster'}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Rating Badge */}
          {movie.imdbRating && (
            <div className="absolute top-2 left-2 bg-primary-500 text-white px-2 py-1 rounded-md flex items-center text-sm font-semibold">
              <FaStar className="mr-1" />
              {movie.imdbRating}
            </div>
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
      <button
        className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-primary-500 hover:text-white"
        aria-label="Add to favorites"
      >
        <FaHeart />
      </button>
    </motion.div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string,
    Poster: PropTypes.string,
    Year: PropTypes.string,
    Type: PropTypes.string,
    imdbRating: PropTypes.string,
  }).isRequired,
};

export default MovieCard;