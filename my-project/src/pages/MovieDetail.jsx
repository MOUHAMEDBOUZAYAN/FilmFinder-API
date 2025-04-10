import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import Loader from '../components/Loader';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieDetails(id);

        if (!data || data.Response === 'False') {
          throw new Error('Movie not found');
        }

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

  if (loading) return <Loader />;
  if (error) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="text-red-500 mb-4">{error}</div>
      <button
        onClick={() => navigate(-1)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
      >
        Go Back
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-yellow-500 hover:text-yellow-600 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Movies
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={
              movie.Poster && movie.Poster !== 'N/A'
                ? movie.Poster
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.Title || 'Poster'}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {movie.Title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-600 dark:text-gray-300">
            <span>{movie.Year}</span>
            {movie.Runtime && <span>{movie.Runtime}</span>}
            {movie.Rated && <span>{movie.Rated}</span>}
          </div>

          {movie.Genre && (
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.Genre.split(',').map((genre) => (
                <span
                  key={genre}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Synopsis
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {movie.Plot || 'No plot available.'}
          </p>

          {movie.Actors && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Cast
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {movie.Actors}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
