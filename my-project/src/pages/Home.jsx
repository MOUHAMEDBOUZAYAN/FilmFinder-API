import { useState, useEffect } from 'react';
import { fetchPopularMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const data = searchQuery 
        ? await searchMovies(searchQuery) 
        : await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      getMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        {searchQuery ? `Résultats pour "${searchQuery}"` : 'Films Populaires'}
      </h1>
      
      {loading ? (
        <Loader />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-300 text-center py-10">
          Aucun film trouvé. Essayez une autre recherche.
        </p>
      )}
    </div>
  );
};

export default Home;