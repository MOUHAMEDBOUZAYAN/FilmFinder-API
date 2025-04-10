import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Search = ({ placeholder = "Rechercher un film..." }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Sync with URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('search') || '');
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (query.trim()) {
      params.set('search', query);
      params.delete('page');
    } else {
      params.delete('search');
    }
    navigate(`?${params.toString()}`);
  };

  const clearSearch = () => {
    setQuery('');
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto">
      <div className="flex items-center border rounded-full px-4 py-2 transition-all duration-200 border-gray-300 dark:border-gray-600">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent border-none focus:outline-none px-3 py-1 text-gray-700 dark:text-gray-200"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </form>
  );
};

export default Search;