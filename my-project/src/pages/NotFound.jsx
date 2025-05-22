import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilm, FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
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
      transition: { 
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const films = [
    { scale: 0.8, rotate: -15, top: '25%', left: '15%', delay: 0.2 },
    { scale: 0.6, rotate: 10, top: '60%', left: '20%', delay: 0.4 },
    { scale: 0.7, rotate: -5, top: '40%', right: '15%', delay: 0.3 },
    { scale: 0.5, rotate: 15, top: '70%', right: '20%', delay: 0.5 },
  ];

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-800 dark:to-dark-900 overflow-hidden relative">
      {/* Animated film strips background */}
      {films.map((film, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0, rotate: film.rotate }}
          animate={{ 
            scale: film.scale, 
            opacity: 0.1,
            rotate: film.rotate 
          }}
          transition={{ delay: film.delay, duration: 0.7 }}
          style={{ 
            position: 'absolute',
            top: film.top,
            left: film.left,
            right: film.right
          }}
          className="pointer-events-none"
        >
          <FaFilm className="text-primary-500 dark:text-primary-600" style={{ fontSize: '10rem' }} />
        </motion.div>
      ))}
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-xl mx-auto text-center px-4 py-10 bg-white dark:bg-dark-800 rounded-xl shadow-2xl z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 300,
            damping: 20,
            delay: 0.1
          }}
          className="text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-primary-500"
        >
          404
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Page Non Trouvée
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-300 mb-8"
        >
          Oups ! Il semble que vous ayez exploré une partie inconnue de l'univers du cinéma.
          Cette page n'existe pas ou a été déplacée.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-full shadow-lg transition-colors w-full"
            >
              <FaHome className="mr-2" />
              Retour à l'accueil
            </Link>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/?search=popular"
              className="inline-flex items-center justify-center bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 text-gray-800 dark:text-white py-3 px-6 rounded-full shadow-lg transition-colors w-full"
            >
              <FaSearch className="mr-2" />
              Explorer les films populaires
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;