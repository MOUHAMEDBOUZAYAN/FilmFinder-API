import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import Loader from '../components/Loader';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (!movie) return <div className="text-center py-10">Film non trouvé</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {movie.title}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">
              {movie.vote_average.toFixed(1)}/10
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {movie.release_date.split('-')[0]} • {movie.runtime} min
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Synopsis
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {movie.overview || 'Aucun synopsis disponible.'}
          </p>
          {movie.credits?.cast.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Acteurs principaux
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movie.credits.cast.slice(0, 4).map((actor) => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                          : 'https://via.placeholder.com/200x300?text=No+Image'
                      }
                      alt={actor.name}
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {actor.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;