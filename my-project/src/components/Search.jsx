import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/');
  };

  useEffect(() => {
    // Synchronisation avec l'URL si paramètre de recherche présent
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(decodeURIComponent(searchParam));
    }
  }, []);

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <div className={`flex items-center border rounded-full px-4 py-2 transition-all duration-200 ${isFocused ? 'ring-2 ring-yellow-500 border-transparent' : 'border-gray-300 dark:border-gray-600'}`}>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Rechercher un film..."
          className="w-full bg-transparent border-none focus:outline-none focus:ring-0 px-3 py-1 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          aria-label="Recherche de films"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Effacer la recherche"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="absolute right-0 top-0 bottom-0 opacity-0 w-0"
        aria-hidden="true"
      >
        Rechercher
      </button>
    </form>
  );
};

export default Search;