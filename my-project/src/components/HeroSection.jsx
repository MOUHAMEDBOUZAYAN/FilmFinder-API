import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaFilm } from 'react-icons/fa';

const HeroSection = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // Array of background gradients and popular movie backdrops
  const backgrounds = [
    'bg-gradient-to-br from-indigo-600 to-purple-600',
    'bg-gradient-to-r from-primary-500 to-yellow-600',
    'bg-gradient-to-br from-green-500 to-blue-600',
  ];
  
  // Automatically cycle through backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
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
    }
  };
  
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5 } },
    exit: { opacity: 0, transition: { duration: 1.5 } }
  };
  
  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <motion.div
        key={backgroundIndex}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={backgroundVariants}
        className={`absolute inset-0 ${backgrounds[backgroundIndex]}`}
      />
      
      {/* Overlay with waves */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="relative py-20 md:py-32 px-4">
        <motion.div 
          className="container mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={childVariants} className="flex justify-center mb-4">
            <FaFilm className="text-white text-5xl" />
          </motion.div>
          
          <motion.h1 
            variants={childVariants}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Explorez le Monde du <span className="text-yellow-400">Cinéma</span>
          </motion.h1>
          
          <motion.p 
            variants={childVariants}
            className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto"
          >
            Découvrez, recherchez et sauvegardez vos films préférés en un seul endroit
          </motion.p>
          
          <motion.form 
            variants={searchVariants}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto"
          >
            <div className="flex flex-col md:flex-row shadow-lg rounded-full overflow-hidden">
              <div className="flex-grow flex items-center bg-white dark:bg-dark-800">
                <FaSearch className="ml-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un film..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-4 outline-none dark:bg-dark-800 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 font-semibold transition-colors md:rounded-r-full"
              >
                Rechercher
              </button>
            </div>
          </motion.form>
          
          <motion.div 
            variants={childVariants}
            className="mt-8 flex justify-center space-x-4"
          >
            <div className="text-white">
              <span className="text-3xl font-bold">1000+</span>
              <p className="text-sm opacity-80">Films</p>
            </div>
            <div className="text-white">
              <span className="text-3xl font-bold">HD</span>
              <p className="text-sm opacity-80">Qualité</p>
            </div>
            <div className="text-white">
              <span className="text-3xl font-bold">IMDb</span>
              <p className="text-sm opacity-80">Données</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Wave SVG at the bottom */}
      <div className="absolute -bottom-1 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;