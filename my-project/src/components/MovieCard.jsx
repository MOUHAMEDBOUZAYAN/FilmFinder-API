import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={
            movie.Poster && movie.Poster !== 'N/A'
              ? movie.Poster
              : 'https://via.placeholder.com/500x750?text=No+Poster'
          }
          alt={movie.Title || 'Movie poster'}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
            {movie.Title || 'Titre inconnu'}
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {movie.Year || 'Année inconnue'} • {movie.Type}
          </div>
        </div>
      </Link>
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
  }).isRequired,
};

export default MovieCard;
