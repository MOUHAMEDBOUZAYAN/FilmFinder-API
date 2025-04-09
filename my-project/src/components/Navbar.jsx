import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Search from './Search';
import { FilmIcon } from '@heroicons/react/24/solid'; // Icône pour le logo mobile

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo - Texte sur desktop, Icône sur mobile */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Accueil"
        >
          <FilmIcon className="h-6 w-6 text-yellow-500 block md:hidden" /> {/* Visible uniquement sur mobile */}
          <span className="text-xl font-bold text-gray-800 dark:text-white hidden md:block"> {/* Caché sur mobile */}
            FilmExplorer
          </span>
        </Link>

        {/* Conteneur flex pour la recherche et le toggle */}
        <div className="flex items-center space-x-4 w-full max-w-md justify-end md:justify-between">
          {/* Search - Prend toute la largeur disponible sauf sur mobile */}
          <div className="w-full md:w-auto flex-grow md:flex-grow-0">
            <Search />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;