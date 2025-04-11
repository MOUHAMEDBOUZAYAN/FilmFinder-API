import { FaGithub, FaTwitter, FaLinkedin, FaFilm } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <FaFilm className="text-2xl text-blue-500 mr-2" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">FilmExplorer</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center md:text-left">
              Découvrez, explorez et sauvegardez vos films préférés.
            </p>
          </div>

          {/* Links section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Accueil</a></li>
              <li><a href="/favorites" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Favoris</a></li>
              <li><a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">À propos</a></li>
              <li><a href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">Confidentialité</a></li>
            </ul>
          </div>

          {/* Social/contact section */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Nous suivre</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/MOUHAMEDBOUZAYAN/FilmFinder-API/commits/main/" aria-label="GitHub" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                <FaGithub className="text-2xl" />
              </a>
              <a href="https://twitter.com/yourusername" aria-label="Twitter" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="https://www.linkedin.com/in/mouhamed-bouzayan-9a7222344/" aria-label="LinkedIn" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
            <a href="mailto:contact@filmexplorer.com" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              contact@filmexplorer.com
            </a>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} FilmExplorer. Tous droits réservés.</p>
          <p className="text-sm mt-2">Utilise l'API OMDb pour les données des films.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;