import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Search = ({ onSearch, placeholder = "Rechercher un film..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Gestion optimisée de la recherche avec debounce intégré
  const handleSearch = useCallback((e) => {
    e?.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      setIsLoading(true);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('search', query);
      searchParams.delete('page'); // Reset pagination on new search

      navigate(`?${searchParams.toString()}`, { replace: true });

      // Simuler un chargement API (remplacer par votre appel réel)
      setTimeout(() => {
        onSearch?.(query);
        setIsLoading(false);
      }, 800);
    } else {
      clearSearch();
    }
  }, [searchQuery, navigate, location.search, onSearch]);

  // Nettoyage de la recherche
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('search');
    navigate(`?${searchParams.toString()}`, { replace: true });
    onSearch?.('');
  }, [navigate, location.search, onSearch]);

  // Synchronisation avec l'URL au chargement
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) setSearchQuery(decodeURIComponent(searchParam));
  }, [location.search]);

  // Debounce automatique (500ms)
  useEffect(() => {
    if (!searchQuery.trim()) return;

    const debounceTimer = setTimeout(handleSearch, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, handleSearch]);

  return (
    <form
      onSubmit={handleSearch}
      className="relative w-full max-w-md mx-auto"
      role="search"
    >
      <div className={`
        flex items-center border rounded-full px-4 py-2 transition-all duration-200
        ${isFocused
          ? 'ring-2 ring-yellow-500 border-transparent shadow-lg'
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }
        ${isLoading ? 'pr-10' : ''}
      `}>
        <MagnifyingGlassIcon
          className={`h-5 w-5 flex-shrink-0 ${isLoading
              ? 'text-yellow-500 animate-pulse'
              : 'text-gray-400 dark:text-gray-500'
            }`}
        />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-3 py-1 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          aria-label="Rechercher des films"
          enterKeyHint="search"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin h-4 w-4 border-2 border-yellow-500 rounded-full border-t-transparent"></div>
          </div>
        ) : searchQuery ? (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Effacer la recherche"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      {searchQuery && !isLoading && (
        <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2">
          <div className="px-4 py-2 text-sm text-gray-500">Suggestions...</div>
        </div>
      )}
    </form>
  );
};

export default Search;