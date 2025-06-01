import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaFilm, FaStar, FaHeart, FaPlay, FaDownload, FaEye,
  FaRocket, FaGlobe, FaCrown, FaUsers
} from 'react-icons/fa';
import { 
  FilmIcon, StarIcon, SparklesIcon, PlayIcon,
  HeartIcon, EyeIcon, RocketLaunchIcon
} from '@heroicons/react/24/solid';

const ProfessionalLoader = ({ 
  size = 'md', 
  text = 'Chargement...', 
  type = 'default',
  progress = null,
  tips = null
}) => {
  const [currentTip, setCurrentTip] = useState(0);
  const [loadingStage, setLoadingStage] = useState(0);
  const [animationPhase, setAnimationPhase] = useState('intro');

  const sizes = {
    sm: {
      container: 'h-12 w-12',
      icon: 'text-3xl',
      text: 'text-sm',
      spacing: 'space-y-4'
    },
    md: {
      container: 'h-20 w-20',
      icon: 'text-5xl',
      text: 'text-base',
      spacing: 'space-y-6'
    },
    lg: {
      container: 'h-32 w-32',
      icon: 'text-7xl',
      text: 'text-lg',
      spacing: 'space-y-8'
    },
    xl: {
      container: 'h-40 w-40',
      icon: 'text-8xl',
      text: 'text-xl',
      spacing: 'space-y-10'
    }
  };

  const defaultTips = [
    "Saviez-vous que le premier film a été créé en 1888 ?",
    "Il y a plus de 50,000 films dans notre base de données !",
    "Les utilisateurs ont donné plus de 1M d'avis sur FilmHub Pro",
    "Nouvelle fonctionnalité : Listes collaboratives disponibles !",
    "Découvrez notre section films indépendants",
    "Activez les notifications pour ne rien manquer"
  ];

  const loadingIcons = [
    FaFilm, FaStar, FaHeart, FaPlay, FaEye, FaRocket, FaGlobe, FaCrown
  ];

  const loaderTypes = {
    default: {
      primary: 'from-indigo-500 to-purple-500',
      secondary: 'from-purple-500 to-pink-500',
      accent: 'from-blue-500 to-indigo-500'
    },
    cinema: {
      primary: 'from-yellow-400 to-orange-500',
      secondary: 'from-red-500 to-pink-500',
      accent: 'from-purple-500 to-indigo-500'
    },
    premium: {
      primary: 'from-yellow-400 to-yellow-600',
      secondary: 'from-yellow-600 to-orange-500',
      accent: 'from-orange-500 to-red-500'
    },
    dark: {
      primary: 'from-gray-600 to-gray-800',
      secondary: 'from-gray-800 to-black',
      accent: 'from-blue-500 to-purple-500'
    }
  };

  const currentTheme = loaderTypes[type] || loaderTypes.default;

  // Cycle through tips
  useEffect(() => {
    if (tips && tips.length > 0) {
      const interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % tips.length);
      }, 3000);
      return () => clearInterval(interval);
    } else if (defaultTips.length > 0) {
      const interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % defaultTips.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [tips]);

  // Loading stages progression
  useEffect(() => {
    const stages = ['Initialisation...', 'Chargement des données...', 'Préparation...', 'Presque prêt...'];
    const interval = setInterval(() => {
      setLoadingStage(prev => (prev + 1) % stages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animation phases
  useEffect(() => {
    const phases = ['intro', 'main', 'pulse', 'rotate'];
    const interval = setInterval(() => {
      setAnimationPhase(prev => {
        const currentIndex = phases.indexOf(prev);
        return phases[(currentIndex + 1) % phases.length];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const containerVariants = {
    intro: {
      scale: [0.8, 1.2, 1],
      opacity: [0, 1, 1],
      transition: { duration: 1, ease: "easeOut" }
    },
    main: {
      scale: 1,
      rotate: [0, 360],
      transition: { 
        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
        scale: { duration: 0.5 }
      }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    },
    rotate: {
      rotate: [0, 360],
      scale: [1, 1.05, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.4, 1],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const orbitVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    animate: {
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const tipVariants = {
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const progressVariants = {
    animate: {
      width: `${progress || 0}%`,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const currentTips = tips || defaultTips;

  return (
    <div className="flex flex-col items-center justify-center py-12 relative">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${currentTheme.accent} rounded-full`}
            variants={particleVariants}
            animate="animate"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Loader Container */}
      <div className="relative mb-8">
        {/* Pulsing Background */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className={`absolute inset-0 bg-gradient-to-r ${currentTheme.primary} rounded-full opacity-30 ${sizes[size].container}`}
        />
        
        {/* Orbiting Elements */}
        <motion.div
          variants={orbitVariants}
          animate="animate"
          className={`relative ${sizes[size].container}`}
        >
          {loadingIcons.slice(0, 4).map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${index * 90}deg) translateX(${size === 'sm' ? '30px' : size === 'md' ? '50px' : '70px'}) translateY(-50%)`
              }}
              animate={{
                rotate: [0, -360],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
              }}
            >
              <div className={`w-6 h-6 bg-gradient-to-r ${currentTheme.secondary} rounded-full flex items-center justify-center`}>
                <Icon className="text-white text-xs" />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Central Icon */}
        <motion.div
          variants={containerVariants}
          animate={animationPhase}
          className={`absolute inset-0 flex items-center justify-center ${sizes[size].container}`}
        >
          <div className={`w-full h-full bg-gradient-to-br ${currentTheme.primary} rounded-full flex items-center justify-center shadow-2xl`}>
            <motion.div
              animate={{
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <FilmIcon className={`text-white ${sizes[size].icon}`} />
            </motion.div>
          </div>
        </motion.div>

        {/* Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 ${sizes[size].container}`}
        >
          <div className={`w-full h-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 rounded-full`}></div>
        </motion.div>

        {/* Secondary Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-2 ${sizes[size].container.replace('h-20 w-20', 'h-16 w-16').replace('h-12 w-12', 'h-8 w-8').replace('h-32 w-32', 'h-28 w-28').replace('h-40 w-40', 'h-36 w-36')}`}
        >
          <div className={`w-full h-full border-2 border-transparent border-b-pink-500 border-l-yellow-500 rounded-full opacity-60`}></div>
        </motion.div>
      </div>
      
      {/* Loading Text with Stage */}
      <motion.div 
        variants={textVariants}
        animate="animate"
        className={`text-center ${sizes[size].spacing}`}
      >
        <h3 className={`font-bold text-gray-800 dark:text-gray-200 ${sizes[size].text} mb-2`}>
          {text}
        </h3>
        
        {/* Loading Stage */}
        <motion.p
          key={loadingStage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          {['Initialisation...', 'Chargement des données...', 'Préparation...', 'Presque prêt...'][loadingStage]}
        </motion.p>

        {/* Animated Dots */}
        <div className="flex justify-center space-x-1 mt-3">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className={`w-2 h-2 bg-gradient-to-r ${currentTheme.primary} rounded-full`}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Progress Bar */}
      {progress !== null && (
        <div className="w-full max-w-md mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Progression</span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              variants={progressVariants}
              animate="animate"
              className={`h-full bg-gradient-to-r ${currentTheme.primary} rounded-full relative overflow-hidden`}
            >
              {/* Animated shimmer effect */}
              <motion.div
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>
      )}

      {/* Tips Section */}
      {currentTips.length > 0 && (
        <div className="mt-8 max-w-md text-center">
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-center"
          >
            <SparklesIcon className="h-4 w-4 text-yellow-500 mr-2" />
            Le saviez-vous ?
          </motion.h4>
          
          <div className="relative h-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTip}
                variants={tipVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-center justify-center text-center px-4"
              >
                {currentTips[currentTip]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          {/* Tip indicators */}
          <div className="flex justify-center space-x-1 mt-3">
            {currentTips.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTip 
                    ? `bg-gradient-to-r ${currentTheme.primary}` 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                animate={{
                  scale: index === currentTip ? 1.2 : 1
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Decorative Elements */}
      <div className="absolute top-4 left-4">
        <motion.div
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className={`w-3 h-3 bg-gradient-to-r ${currentTheme.accent} rounded-full opacity-60`}
        />
      </div>
      
      <div className="absolute top-4 right-4">
        <motion.div
          animate={{ 
            rotate: [360, 180, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className={`w-2 h-2 bg-gradient-to-r ${currentTheme.secondary} rounded-full opacity-40`}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 0.5
          }}
          className={`w-4 h-4 bg-gradient-to-r ${currentTheme.primary} rounded-full opacity-50`}
        />
      </div>

      {/* Performance Metrics (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 right-4 text-xs text-gray-500 dark:text-gray-400">
          <div>Type: {type}</div>
          <div>Size: {size}</div>
          <div>Phase: {animationPhase}</div>
        </div>
      )}
    </div>
  );
};

// Predefined loader configurations
export const LoaderPresets = {
  // Quick loaders for common scenarios
  MovieSearch: (props) => (
    <ProfessionalLoader 
      {...props}
      type="cinema"
      text="Recherche de films..."
      tips={[
        "Utilisez des mots-clés spécifiques pour de meilleurs résultats",
        "Essayez de rechercher par acteur ou réalisateur",
        "Filtrez par année pour affiner votre recherche"
      ]}
    />
  ),

  MovieDetails: (props) => (
    <ProfessionalLoader 
      {...props}
      type="default"
      text="Chargement des détails..."
      tips={[
        "Découvrez la filmographie complète des acteurs",
        "Consultez les critiques et notes des utilisateurs",
        "Ajoutez le film à vos favoris d'un clic"
      ]}
    />
  ),

  PremiumContent: (props) => (
    <ProfessionalLoader 
      {...props}
      type="premium"
      text="Accès au contenu premium..."
      tips={[
        "Contenu exclusif disponible pour les membres Premium",
        "Bénéficiez de recommandations personnalisées",
        "Accédez aux avant-premières et contenus bonus"
      ]}
    />
  ),

  UserProfile: (props) => (
    <ProfessionalLoader 
      {...props}
      type="dark"
      text="Chargement du profil..."
      tips={[
        "Personnalisez votre profil pour de meilleures recommandations",
        "Partagez vos listes avec vos amis",
        "Suivez vos statistiques de visionnage"
      ]}
    />
  )
};

export default ProfessionalLoader;