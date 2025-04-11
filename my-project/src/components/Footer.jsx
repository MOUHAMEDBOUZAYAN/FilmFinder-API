import { FaGithub, FaTwitter, FaLinkedin, FaFilm, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-dark-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center mb-4">
              <FaFilm className="text-3xl text-primary-500 mr-2" />
              <span className="text-2xl font-bold text-gray-800 dark:text-white">FilmExplorer</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-center md:text-left mb-4">
              Votre guide ultime pour explorer le monde du cinéma.
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <FaHeart className="text-red-500 mr-1" />
              <span>Fait avec passion pour les cinéphiles</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Accueil
                </a>
              </li>
              <li>
                <a href="/favorites" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Films Favoris
                </a>
              </li>
              <li>
                <a href="/about" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  À Propos
                </a>
              </li>
              <li>
                <a href="/privacy" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Catégories</h3>
            <ul className="space-y-3">
              <li>
                <a href="/?search=action" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Action
                </a>
              </li>
              <li>
                <a href="/?search=comedy" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Comédie
                </a>
              </li>
              <li>
                <a href="/?search=drama" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Drame
                </a>
              </li>
              <li>
                <a href="/?search=sci-fi" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Science-Fiction
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Social/contact section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact</h3>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">Des questions ou suggestions ?</p>
              <a href="mailto:contact@filmexplorer.com" className="text-primary-500 hover:underline">
                contact@filmexplorer.com
              </a>
            </div>
            
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/MOUHAMEDBOUZAYAN/FilmFinder-API/commits/main/" aria-label="GitHub" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <FaGithub className="text-2xl" />
                </a>
                <a href="https://twitter.com/yourusername" aria-label="Twitter" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <FaTwitter className="text-2xl" />
                </a>
                <a href="https://www.linkedin.com/in/mouhamed-bouzayan-9a7222344/" aria-label="LinkedIn" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Développé avec par Mouhamed Bouzayan</p>
            </div>
          </motion.div>
        </div>

        {/* Copyright section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-600 dark:text-gray-300"
        >
          <p>© {new Date().getFullYear()} FilmExplorer. Tous droits réservés.</p>
          <p className="text-sm mt-2">Ce site utilise l'API OMDb mais n'est pas affilié à IMDb.</p>
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
            Les images et données des films sont fournies par OMDb API.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;