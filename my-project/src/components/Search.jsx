import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Gestion optimisée de la recherche
  const handleSearch = useCallback((e) => {
    e?.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('search', query);
      navigate(`?${searchParams.toString()}`, { replace: true });
      onSearch?.(query); // Callback optionnel pour le parent
    } else {
      clearSearch();
    }
  }, [searchQuery, navigate, location.search, onSearch]);

  // Nettoyage optimisé
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('search');
    navigate(`?${searchParams.toString()}`, { replace: true });
    onSearch?.(''); // Reset dans le parent si besoin
  }, [navigate, location.search, onSearch]);

  // Synchronisation avec l'URL au chargement
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, [location.search]);

  // Debounce automatique (recherche après 500ms d'inactivité)
  useEffect(() => {
    if (searchQuery.trim()) {
      const timer = setTimeout(handleSearch, 500);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, handleSearch]);

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative w-full max-w-md"
      role="search"
    >
      <div className={`
        flex items-center border rounded-full px-4 py-2 transition-all duration-200
        ${isFocused 
          ? 'ring-2 ring-yellow-500 border-transparent shadow-lg' 
          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }
      `}>
        <MagnifyingGlassIcon 
          className="h-5 w-5 text-gray-400 dark:text-gray-500 flex-shrink-0" 
          aria-hidden="true"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Rechercher un film..."
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-3 py-1 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          aria-label="Rechercher des films"
          enterKeyHint="search"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Effacer la recherche"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default Search;