import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchMovies, sampleMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { FaFire, FaSearch } from 'react-icons/fa';

const TRENDING_TERMS = ['action', 'comedy', 'drama', 'sci-fi', 'adventure'];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Load trending movies on first render
  useEffect(() => {
    const loadTrending = async () => {
      setTrendingLoading(true);
      try {
        const randomTerm = TRENDING_TERMS[Math.floor(Math.random() * TRENDING_TERMS.length)];
        const { Search } = await searchMovies(randomTerm);
        setTrendingMovies(sampleMovies(Search || []));
      } catch (error) {
        console.error('Error loading trending:', error);
      } finally {
        setTrendingLoading(false);
      }
    };

    loadTrending();
  }, []);

  // Load search results
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');

    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        if (searchQuery) {
          const { Search } = await searchMovies(searchQuery);
          setMovies(Search || []);
        } else {
          setMovies([]);
        }
      } catch (error) {
        setError(error.message.includes('API key')
          ? 'Database connection issue. Please try again later.'
          : 'Error loading movies');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(getMovies, 500);
    return () => clearTimeout(timer);
  }, [location.search]);

  const handleTrendingClick = (term) => {
    navigate(`/?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Search through thousands of films and save your favorites
        </p>
      </div>

      {/* Trending Terms */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white flex items-center">
          <FaFire className="text-primary-500 mr-2" /> Trending Searches
        </h2>
        <div className="flex flex-wrap gap-3">
          {TRENDING_TERMS.map((term) => (
            <button
              key={term}
              onClick={() => handleTrendingClick(term)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      {location.search && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            <FaSearch className="text-secondary-500 mr-2" />
            Results for "{new URLSearchParams(location.search).get('search')}"
          </h2>
          
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
              No movies found. Try another search.
            </p>
          )}
        </section>
      )}

      {/* Trending Movies */}
      {!location.search && (
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Popular This Week
          </h2>
          
          {trendingLoading ? (
            <Loader />
          ) : trendingMovies?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 py-10">
              Couldn't load trending movies
            </p>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;