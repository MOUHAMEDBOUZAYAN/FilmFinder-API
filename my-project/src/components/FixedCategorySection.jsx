import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaFilm, FaHeart, FaTheaterMasks, FaRunning, FaLaugh, 
  FaGhost, FaRocket, FaMagic, FaSmileBeam, FaSkull,
  FaChild, FaBookOpen, FaPause, FaGlobeAmericas
} from 'react-icons/fa';

/**
 * Composant amélioré pour la section de catégories
 * Avec support du mode sombre et correction des problèmes de responsivité
 */
const FixedCategorySection = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Catégories principales avec icônes et couleurs adaptées au mode sombre
  const mainCategories = [
    { 
      name: 'Action', 
      icon: FaRunning,
      color: 'from-red-500 to-orange-500',
      darkColor: 'dark:from-red-700 dark:to-orange-700'
    },
    { 
      name: 'Comédie', 
      icon: FaLaugh,
      color: 'from-yellow-400 to-yellow-600',
      darkColor: 'dark:from-yellow-600 dark:to-yellow-800'
    },
    { 
      name: 'Drame', 
      icon: FaTheaterMasks,
      color: 'from-blue-500 to-indigo-600',
      darkColor: 'dark:from-blue-700 dark:to-indigo-800'
    },
    { 
      name: 'Sci-Fi', 
      icon: FaRocket,
      color: 'from-purple-500 to-pink-500',
      darkColor: 'dark:from-purple-700 dark:to-pink-700'
    },
    { 
      name: 'Horreur', 
      icon: FaGhost,
      color: 'from-gray-700 to-gray-900',
      darkColor: 'dark:from-gray-800 dark:to-gray-900'
    },
    { 
      name: 'Fantastique', 
      icon: FaMagic,
      color: 'from-green-500 to-teal-500',
      darkColor: 'dark:from-green-700 dark:to-teal-700'
    },
    { 
      name: 'Animation', 
      icon: FaChild,
      color: 'from-cyan-500 to-sky-500',
      darkColor: 'dark:from-cyan-700 dark:to-sky-700'
    },
    { 
      name: 'Romance', 
      icon: FaHeart,
      color: 'from-pink-400 to-rose-500',
      darkColor: 'dark:from-pink-600 dark:to-rose-700'
    },
    {
      name: 'Thriller',
      icon: FaSkull,
      color: 'from-neutral-500 to-stone-700',
      darkColor: 'dark:from-neutral-700 dark:to-stone-800'
    },
    {
      name: 'Documentaire',
      icon: FaBookOpen,
      color: 'from-emerald-500 to-green-600',
      darkColor: 'dark:from-emerald-700 dark:to-green-800'
    },
    {
      name: 'Famille',
      icon: FaSmileBeam,
      color: 'from-amber-400 to-orange-500',
      darkColor: 'dark:from-amber-600 dark:to-orange-700'
    },
    {
      name: 'Biographie',
      icon: FaPause,
      color: 'from-slate-500 to-zinc-600',
      darkColor: 'dark:from-slate-700 dark:to-zinc-800'
    }
  ];

  // Animation variants pour différentes tailles d'écran
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 50, damping: 9 }
    },
    hover: { 
      y: -5, 
      scale: 1.03,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.97 }
  };

  // Handler pour naviguer vers la recherche par catégorie
  const handleCategoryClick = (category) => {
    navigate(`/?search=${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <section className="py-10 px-4 lg:py-16">
      <div className="container mx-auto">
        <div className="mb-6 md:mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center"
          >
            <FaFilm className="text-primary-500 mr-3" />
            <span>Catégories Populaires</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-600 dark:text-gray-300 mt-2 md:text-lg"
          >
            Explorez notre vaste catalogue de films par genre
          </motion.p>
        </div>
        
        {/* Grille de catégories responsive */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {mainCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              custom={index}
              className={`bg-gradient-to-br ${category.color} ${category.darkColor} rounded-lg cursor-pointer transition-all shadow-md hover:shadow-xl overflow-hidden relative aspect-square`}
              onClick={() => handleCategoryClick(category.name)}
              onMouseEnter={() => setHoveredCategory(category.name)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Overlay d'effet de survol */}
              <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${
                hoveredCategory === category.name ? 'opacity-10' : ''
              }`}></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white transition-transform duration-300 transform">
                <category.icon className={`text-3xl mb-3 ${
                  hoveredCategory === category.name ? 'scale-110' : 'scale-100'
                } transition-transform duration-300`} />
                
                <h3 className="font-bold text-center text-lg">
                  {category.name}
                </h3>
                
                {/* Effet d'animation au survol */}
                {hoveredCategory === category.name && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-white/80 text-center"
                  >
                    Découvrir &rarr;
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Section d'exploration supplémentaire - meilleure visibilité en mode sombre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <button
            onClick={() => navigate('/?search=popular')}
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <FaGlobeAmericas className="mr-2" />
            Explorer plus de genres
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FixedCategorySection;