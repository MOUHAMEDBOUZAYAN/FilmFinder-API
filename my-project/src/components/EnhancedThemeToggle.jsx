import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const EnhancedThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Vérifie d'abord le localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) return JSON.parse(savedMode);
    
    // Fallback à la préférence système
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Applique la classe au document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Sauvegarde dans localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setDarkMode(!darkMode);
      setTimeout(() => setIsAnimating(false), 300);
    }, 150);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-colors overflow-hidden ${
        darkMode 
          ? 'bg-gray-700 text-yellow-300' 
          : 'bg-blue-100 text-orange-500'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {/* Background animation on toggle */}
      <AnimatePresence mode="wait">
        {isAnimating && (
          <motion.div 
            key="ripple"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`absolute inset-0 rounded-full ${
              darkMode ? 'bg-blue-100' : 'bg-gray-700'
            }`}
            style={{ transformOrigin: 'center' }}
          />
        )}
      </AnimatePresence>
      
      {/* Icon with rotation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={darkMode ? 'moon' : 'sun'}
          initial={{ y: -30, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 30, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default EnhancedThemeToggle;