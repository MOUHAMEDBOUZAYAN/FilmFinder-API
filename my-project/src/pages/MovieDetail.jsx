import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import Loader from '../components/Loader';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { FaImdb } from 'react-icons/fa';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

  if (loading) return <Loader />;
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
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-primary-500 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Movies
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Poster Column */}
        <div className="lg:w-1/3">
          <div className="relative">
            <img
              src={
                movie.Poster && movie.Poster !== 'N/A'
                  ? movie.Poster
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              alt={movie.Title || 'Poster'}
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
            <button
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-lg ${isFavorite ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'}`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Details Column */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {movie.Title}
            </h1>
            
            {movie.imdbRating && (
              <div className="flex items-center bg-yellow-500 text-gray-900 px-3 py-1 rounded-md">
                <StarIcon className="h-5 w-5 mr-1" />
                <span className="font-bold">{movie.imdbRating}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600 dark:text-gray-300">
            <span>{movie.Year}</span>
            {movie.Runtime && <span>{movie.Runtime}</span>}
            {movie.Rated && (
              <span className="border border-gray-300 dark:border-gray-600 px-2 py-0.5 rounded">
                {movie.Rated}
              </span>
            )}
            {movie.imdbID && (
              <a 
                href={`https://www.imdb.com/title/${movie.imdbID}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
              >
                <FaImdb className="text-2xl mr-1" /> IMDb
              </a>
            )}
          </div>

          {movie.Genre && (
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.Genre.split(',').map((genre) => (
                <span
                  key={genre}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {movie.Plot && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Synopsis
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {movie.Plot}
                </p>
              </div>
            )}

            {movie.Director && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Director
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {movie.Director}
                </p>
              </div>
            )}

            {movie.Actors && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Cast
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {movie.Actors}
                </p>
              </div>
            )}

            {movie.Awards && movie.Awards !== 'N/A' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Awards
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {movie.Awards}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;