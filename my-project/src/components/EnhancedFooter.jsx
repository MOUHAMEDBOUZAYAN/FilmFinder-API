import { FaGithub, FaTwitter, FaLinkedin, FaFilm, FaHeart, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50 }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: { 
      scale: 1.2,
      transition: { duration: 0.2 }
    }
  };

  const categories = [
    { name: 'Action', path: '/?search=action' },
    { name: 'Comédie', path: '/?search=comedy' },
    { name: 'Drame', path: '/?search=drama' },
    { name: 'Sci-Fi', path: '/?search=sci-fi' },
    { name: 'Horreur', path: '/?search=horror' },
    { name: 'Animation', path: '/?search=animation' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {/* Brand section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center mb-4">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              >
                <FaFilm className="text-3xl text-primary-500 mr-2" />
              </motion.div>
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
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  Films Favoris
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                  <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                  À Propos
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Catégories</h3>
            <ul className="space-y-3">
              {categories.map(category => (
                <li key={category.name}>
                  <Link to={category.path} className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social/contact section */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Contact</h3>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-300 mb-2">Des questions ou suggestions ?</p>
              <a 
                href="mailto:contact@filmexplorer.com" 
                className="text-primary-500 hover:underline flex items-center"
              >
                <FaEnvelope className="mr-2" />
                contact@filmexplorer.com
              </a>
            </div>
            
            <div className="mb-4">
              <h4 className="text-md font-medium text-gray-800 dark:text-white mb-2">Suivez-nous</h4>
              <div className="flex space-x-4">
                <motion.a 
                  href="https://github.com/MOUHAMEDBOUZAYAN/FilmFinder-API/commits/main/" 
                  aria-label="GitHub" 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <FaGithub className="text-2xl" />
                </motion.a>
                <motion.a 
                  href="https://twitter.com/" 
                  aria-label="Twitter" 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <FaTwitter className="text-2xl" />
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/mouhamed-bouzayan-9a7222344/" 
                  aria-label="LinkedIn" 
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <FaLinkedin className="text-2xl" />
                </motion.a>
              </div>
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Développé par Mouhamed Bouzayan</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright section */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-600 dark:text-gray-300"
        >
          <p>© {currentYear} FilmExplorer. Tous droits réservés.</p>
          <p className="text-sm mt-2">Ce site utilise l'API OMDb mais n'est pas affilié à IMDb.</p>
          <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
            Les images et données des films sont fournies par OMDb API.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;