import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMovies, sampleMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        // OMDb doesn't have a "popular movies" endpoint, so we default to searching "movie"
        const { Search } = searchQuery
          ? await searchMovies(searchQuery)
          : await searchMovies('movie'); // Fallback search term
        
        const displayedMovies = searchQuery ? Search : sampleMovies(Search || []);
        setMovies(displayedMovies || []);
      } catch (error) {
        setError(error.message.includes('API key')
          ? 'Problème de connexion à la base de données. Veuillez réessayer plus tard.'
          : 'Erreur de chargement des films');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(getMovies, 500);
    return () => clearTimeout(timer);
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        {location.search
          ? `Résultats pour "${new URLSearchParams(location.search).get('search')}"`
          : 'Films suggérés'}
      </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : movies?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300 py-10">
          Aucun film trouvé. Essayez une autre recherche.
        </p>
      )}
    </div>
  );
};

export default Home;