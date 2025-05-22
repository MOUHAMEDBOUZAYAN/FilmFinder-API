import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilm, FaArrowRight, FaPlay, FaTicketAlt, FaStar } from 'react-icons/fa';

/**
 * Section Hero améliorée avec:
 * - Meilleur support du mode sombre
 * - Responsivité améliorée pour tablettes
 * - Performance optimisée
 * - Meilleures animations
 */
const ImprovedFixedHeroSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  
  // Arrière-plans optimisés avec des couleurs compatibles avec le mode sombre
  const backgrounds = [
    {
      gradient: 'bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-900',
      quote: '"Le cinéma, c\'est l\'écriture moderne dont l\'encre est la lumière."',
      author: 'Jean Cocteau',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      gradient: 'bg-gradient-to-br from-primary-500 to-yellow-600 dark:from-primary-700 dark:to-yellow-800',
      quote: '"Un film est une fenêtre qui s\'ouvre sur le monde."',
      author: 'Georges Méliès',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80'
    },
    {
      gradient: 'bg-gradient-to-br from-green-500 to-blue-600 dark:from-green-700 dark:to-blue-800',
      quote: '"Le cinéma, c\'est 24 fois la vérité par seconde."',
      author: 'Jean-Luc Godard',
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'
    },
  ];
  
  // Cycler automatiquement entre les arrière-plans
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prevIndex => (prevIndex + 1) % backgrounds.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  const searchVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.6,
        type: "spring", 
        stiffness: 100
      }
    },
    focus: {
      scale: 1.02,
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
    }
  };
  
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 1.5 } }
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 0.9, 
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.7
      }
    }
  };

  // Catégories de navigation rapide avec icônes
  const quickCategories = [
    { name: 'Action', icon: FaPlay, color: 'from-red-500 to-orange-500 dark:from-red-700 dark:to-orange-700' },
    { name: 'Comédie', icon: FaTicketAlt, color: 'from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800' },
    { name: 'Drame', icon: FaFilm, color: 'from-blue-500 to-indigo-600 dark:from-blue-700 dark:to-indigo-800' },
    { name: 'Top Films', icon: FaStar, color: 'from-purple-500 to-pink-500 dark:from-purple-700 dark:to-pink-700' }
  ];
  
  return (
    <div className="relative overflow-hidden">
      {/* Arrière-plan animé avec support du mode sombre */}
      <AnimatePresence mode="wait">
        <motion.div
          key={backgroundIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={backgroundVariants}
          className={`absolute inset-0 ${backgrounds[backgroundIndex].gradient}`}
        >
          {/* Image d'arrière-plan avec opacité réduite en mode sombre */}
          {backgrounds[backgroundIndex].image && (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 dark:opacity-15"
              style={{ 
                backgroundImage: `url(${backgrounds[backgroundIndex].image})` 
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Overlay amélioré pour contraste en mode sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60"></div>
      
      {/* Contenu principal */}
      <div className="relative py-16 sm:py-20 md:py-28 px-4">
        <motion.div 
          className="container mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo Film animé */}
          <motion.div 
            variants={childVariants} 
            className="flex justify-center mb-4"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                transition: {
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "linear"
                }
              }}
            >
              <FaFilm className="text-white text-5xl md:text-6xl" />
            </motion.div>
          </motion.div>
          
          {/* Titre avec taille adaptative */}
          <motion.h1 
            variants={childVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white"
          >
            FilmExplorer
          </motion.h1>
          
          {/* Sous-titre responsive */}
          <motion.p 
            variants={childVariants}
            className="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 max-w-3xl mx-auto"
          >
            Découvrez, recherchez et sauvegardez vos films préférés
          </motion.p>
          
          {/* Barre de recherche améliorée */}
          <motion.form 
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            whileHover={isInputFocused ? "focus" : "visible"}
            onSubmit={handleSearch}
            className="max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10"
          >
            <div className="flex flex-col sm:flex-row shadow-lg rounded-full overflow-hidden">
              <div className="flex-grow flex items-center bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <FaSearch className="ml-4 text-gray-500 dark:text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Rechercher un film..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="w-full px-4 py-3 sm:py-4 outline-none bg-transparent text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full sm:w-auto mt-2 sm:mt-0 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white px-6 py-3 sm:py-4 font-semibold transition-colors sm:rounded-r-full flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Rechercher
                <FaArrowRight className="ml-2" />
              </motion.button>
            </div>
          </motion.form>
          
          {/* Catégories de navigation rapide */}
          <motion.div
            variants={childVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl sm:max-w-2xl mx-auto mb-8"
          >
            {quickCategories.map((category, index) => (
              <motion.button
                key={category.name}
                className={`bg-gradient-to-br ${category.color} rounded-lg p-3 cursor-pointer shadow-md hover:shadow-lg`}
                whileHover={{ y: -3, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/?search=${encodeURIComponent(category.name.toLowerCase())}`)}
              >
                <div className="flex flex-col items-center text-white py-1">
                  <category.icon className="text-xl sm:text-2xl mb-1" />
                  <span className="font-medium text-sm sm:text-base">{category.name}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
          
          {/* Statistiques - masquées sur mobile pour économiser de l'espace */}
          <motion.div 
            variants={childVariants}
            className="hidden sm:flex justify-center space-x-10 md:space-x-16"
          >
            <div className="text-white">
              <span className="text-2xl md:text-3xl font-bold">1000+</span>
              <p className="text-sm opacity-80">Films</p>
            </div>
            <div className="text-white">
              <span className="text-2xl md:text-3xl font-bold">HD</span>
              <p className="text-sm opacity-80">Qualité</p>
            </div>
            <div className="text-white">
              <span className="text-2xl md:text-3xl font-bold">IMDb</span>
              <p className="text-sm opacity-80">Données</p>
            </div>
          </motion.div>

          {/* Citation de film */}
          <motion.div
            variants={quoteVariants}
            className="mt-8 sm:mt-10 md:mt-12 text-white opacity-80 max-w-xl mx-auto"
          >
            <p className="text-base sm:text-lg italic">
              {backgrounds[backgroundIndex].quote}
            </p>
            <p className="text-xs sm:text-sm mt-2">
              — {backgrounds[backgroundIndex].author}
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Vague SVG au bas avec support du mode sombre */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="fill-white dark:fill-gray-900"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ImprovedFixedHeroSection;