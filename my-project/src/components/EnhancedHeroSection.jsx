import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaFilm, FaArrowRight, FaPlay, FaTicketAlt, 
  FaStar, FaCrown, FaUsers, FaAward, FaHeart, FaFire,
  FaChevronDown, FaGlobe, FaRocket
} from 'react-icons/fa';
import { 
  SparklesIcon, PlayIcon, StarIcon, FilmIcon,
  TrophyIcon, UsersIcon, HeartIcon
} from '@heroicons/react/24/solid';
import React from 'react';

const ProfessionalHeroSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({
    movies: 0,
    users: 0,
    rating: 0,
    awards: 0
  });
  
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const heroRef = useRef(null);
  const controls = useAnimation();
  
  // Enhanced backgrounds avec des images de haute qualité
  const backgrounds = [
    {
      id: 1,
      gradient: 'from-indigo-900 via-purple-900 to-pink-900',
      overlay: 'from-black/60 via-black/40 to-transparent',
      quote: '"Le cinéma, c\'est l\'écriture moderne dont l\'encre est la lumière."',
      author: 'Jean Cocteau',
      image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&w=1920&q=80',
      theme: 'classic'
    },
    {
      id: 2,
      gradient: 'from-blue-900 via-indigo-900 to-purple-900',
      overlay: 'from-black/70 via-black/50 to-transparent',
      quote: '"Un film est une fenêtre qui s\'ouvre sur le monde."',
      author: 'Georges Méliès',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&w=1920&q=80',
      theme: 'modern'
    },
    {
      id: 3,
      gradient: 'from-emerald-900 via-teal-900 to-cyan-900',
      overlay: 'from-black/60 via-black/40 to-transparent',
      quote: '"Le cinéma, c\'est 24 fois la vérité par seconde."',
      author: 'Jean-Luc Godard',
      image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&w=1920&q=80',
      theme: 'cinematic'
    },
    {
      id: 4,
      gradient: 'from-orange-900 via-red-900 to-pink-900',
      overlay: 'from-black/70 via-black/50 to-transparent',
      quote: '"Les films, c\'est mieux que la vie; il n\'y a pas d\'embouteillages dans les films."',
      author: 'Henri Miller',
      image: 'https://images.unsplash.com/photo-1489599833288-09aac0a0e956?ixlib=rb-4.0.3&w=1920&q=80',
      theme: 'dynamic'
    }
  ];

  // Features rotatives
  const features = [
    {
      icon: FaFilm,
      title: 'Catalogue Immense',
      description: '50,000+ films et séries',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: FaStar,
      title: 'Critiques Expert',
      description: 'Notes professionnelles',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: FaUsers,
      title: 'Communauté Active',
      description: '1M+ cinéphiles',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FaAward,
      title: 'Contenu Premium',
      description: 'Exclusivités & Primeurs',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  // Stats animées
  const finalStats = {
    movies: 50000,
    users: 1200000,
    rating: 4.9,
    awards: 150
  };

  // Catégories quick access avec design amélioré
  const quickCategories = [
    { 
      name: 'Action', 
      icon: FaRocket, 
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      glow: 'shadow-red-500/30',
      count: '12.5K'
    },
    { 
      name: 'Comédie', 
      icon: FaHeart, 
      gradient: 'from-yellow-400 via-yellow-500 to-orange-500',
      glow: 'shadow-yellow-500/30',
      count: '8.2K'
    },
    { 
      name: 'Drame', 
      icon: FaFilm, 
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      glow: 'shadow-blue-500/30',
      count: '15.7K'
    },
    { 
      name: 'Top Films', 
      icon: FaCrown, 
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      glow: 'shadow-purple-500/30',
      count: '2.1K'
    }
  ];

  // Cycle automatique des arrière-plans
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex(prevIndex => (prevIndex + 1) % backgrounds.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  // Cycle des features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Animation des stats au chargement
  useEffect(() => {
    const animateStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Délai initial
      
      Object.keys(finalStats).forEach(key => {
        const finalValue = finalStats[key];
        let currentValue = 0;
        const increment = finalValue / 100;
        
        const timer = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            currentValue = finalValue;
            clearInterval(timer);
          }
          
          setStats(prev => ({
            ...prev,
            [key]: key === 'rating' ? currentValue.toFixed(1) : Math.floor(currentValue)
          }));
        }, 20);
      });
    };

    animateStats();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x: (x - 0.5) * 20, y: (y - 0.5) * 20 });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/?search=${encodeURIComponent(category.name.toLowerCase())}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.15,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 2, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 1.5 }
    }
  };

  const searchVariants = {
    rest: { scale: 1, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
    focus: { 
      scale: 1.02, 
      boxShadow: "0 20px 60px rgba(99, 102, 241, 0.3)",
      transition: { type: "spring", stiffness: 300 }
    },
    hover: { 
      scale: 1.01,
      transition: { duration: 0.2 }
    }
  };

  const statVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200,
        delay: 0.5
      }
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={backgroundIndex}
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0"
          >
            {/* Background Image with Parallax */}
            <motion.div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${backgrounds[backgroundIndex].image})`,
                transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(1.1)`
              }}
            />
            
            {/* Dynamic Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${backgrounds[backgroundIndex].gradient} opacity-80`} />
            <div className={`absolute inset-0 bg-gradient-to-t ${backgrounds[backgroundIndex].overlay}`} />
          </motion.div>
        </AnimatePresence>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              animate={{
                x: [0, 100 + Math.random() * 200],
                y: [0, 100 + Math.random() * 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-8 py-20">
          <motion.div 
            className="max-w-6xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Premium Badge */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-8"
            >
              <SparklesIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">Plateforme #1 du Cinéma</span>
              <div className="ml-3 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full">
                NOUVEAU
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="block text-white mb-2">Découvrez le</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Cinéma
                </span>
                <span className="block text-white">Autrement</span>
              </h1>
              
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="inline-block"
              >
                <FilmIcon className="h-16 w-16 text-indigo-400 mx-auto" />
              </motion.div>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed"
            >
              Explorez des milliers de films, créez vos listes personnalisées et plongez dans l'univers du septième art avec la plateforme la plus avancée du marché.
            </motion.p>

            {/* Enhanced Search Bar */}
            <motion.form 
              variants={searchVariants}
              initial="rest"
              whileHover="hover"
              whileFocus="focus"
              animate={isInputFocused ? "focus" : "rest"}
              onSubmit={handleSearch}
              className="max-w-3xl mx-auto mb-16"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-30"></div>
                <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-full border border-white/20 shadow-2xl overflow-hidden">
                  <div className="pl-8 pr-4">
                    <FaSearch className="h-6 w-6 text-gray-400" />
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Rechercher des films, acteurs, réalisateurs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="flex-1 px-4 py-6 bg-transparent text-gray-800 placeholder-gray-500 text-lg focus:outline-none"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="m-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg flex items-center"
                  >
                    Rechercher
                    <FaArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.form>

            {/* Quick Categories */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
            >
              {quickCategories.map((category, index) => (
                <motion.button
                  key={category.name}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(category)}
                  className={`relative group p-6 rounded-2xl bg-gradient-to-br ${category.gradient} shadow-2xl ${category.glow} hover:shadow-3xl transition-all duration-300`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 text-center text-white">
                    <category.icon className="text-4xl mb-3 mx-auto" />
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count} films</p>
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>
              ))}
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16"
            >
              <motion.div 
                variants={statVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <FaFilm className="text-3xl text-blue-400 mb-3 mx-auto" />
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stats.movies.toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Films Disponibles</div>
                </div>
              </motion.div>

              <motion.div 
                variants={statVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <FaUsers className="text-3xl text-purple-400 mb-3 mx-auto" />
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {Math.floor(stats.users / 1000)}K+
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Utilisateurs Actifs</div>
                </div>
              </motion.div>

              <motion.div 
                variants={statVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <FaStar className="text-3xl text-yellow-400 mb-3 mx-auto" />
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stats.rating}★
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Note Moyenne</div>
                </div>
              </motion.div>

              <motion.div 
                variants={statVariants}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all">
                  <FaAward className="text-3xl text-green-400 mb-3 mx-auto" />
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stats.awards}+
                  </div>
                  <div className="text-sm text-gray-300 font-medium">Prix Remportés</div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold text-lg rounded-full shadow-2xl transition-all flex items-center group"
              >
                <PlayIcon className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                Commencer Maintenant
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-5 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg rounded-full hover:bg-white/20 transition-all flex items-center group"
              >
                <FaCrown className="h-5 w-5 mr-3 text-yellow-400 group-hover:scale-110 transition-transform" />
                Découvrir Premium
              </motion.button>
            </motion.div>

            {/* Rotating Feature Highlight */}
            <motion.div 
              variants={itemVariants}
              className="relative max-w-md mx-auto"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${features[currentFeature].color} rounded-full mb-4`}>
                    {React.createElement(features[currentFeature].icon, { className: "h-6 w-6 text-white" })}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {features[currentFeature].title}
                  </h3>
                  <p className="text-gray-300">
                    {features[currentFeature].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Quote Section */}
            <motion.div
              variants={itemVariants}
              className="mt-20 max-w-3xl mx-auto"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={backgroundIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="text-center"
                >
                  <blockquote className="text-xl md:text-2xl text-white/90 italic mb-4 font-light">
                    {backgrounds[backgroundIndex].quote}
                  </blockquote>
                  <cite className="text-gray-400 font-medium">
                    — {backgrounds[backgroundIndex].author}
                  </cite>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-sm font-medium mb-2">Découvrir plus</span>
          <FaChevronDown className="text-2xl" />
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/4 right-10 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-xl"></div>
    </section>
  );
};

export default ProfessionalHeroSection;