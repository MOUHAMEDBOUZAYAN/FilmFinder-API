import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { getMovieDetails } from '../services/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch fresh details for each favorite movie
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const stored = JSON.parse(localStorage.getItem('favorites')) || [];
        
        // Get updated details for each favorite
        const updatedFavorites = await Promise.all(
          stored.map(async (fav) => {
            try {
              const details = await getMovieDetails(fav.imdbID);
              return details || fav; // Fallback to stored if API fails
            } catch {
              return fav; // Return original if update fails
            }
          })
        );

        setFavorites(updatedFavorites);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Erreur de chargement des favoris');
        // Fallback to locally stored if API fails
        const stored = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(stored);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = (imdbID) => {
    const updated = favorites.filter(movie => movie.imdbID !== imdbID);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Films Favoris</h1>
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Films Favoris</h1>
      
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p>{error} (affichage des données locales)</p>
        </div>
      )}

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleRemoveFavorite(movie.imdbID)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Retirer des favoris"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Aucun film dans vos favoris.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Découvrir des films
          </button>
        </div>
      )}
    </div>
  );
};

export default Favorites;