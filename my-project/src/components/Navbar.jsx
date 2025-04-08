import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          FilmExplorer
        </Link>
        <div className="flex items-center space-x-4">
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;