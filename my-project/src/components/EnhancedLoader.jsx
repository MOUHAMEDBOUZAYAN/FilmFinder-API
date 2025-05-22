import { motion } from 'framer-motion';
import { FaFilm } from 'react-icons/fa';

const EnhancedLoader = ({ size = 'md', text = 'Chargement...' }) => {
  const sizes = {
    sm: {
      container: 'h-10 w-10',
      icon: 'text-2xl',
      text: 'text-sm'
    },
    md: {
      container: 'h-16 w-16',
      icon: 'text-4xl',
      text: 'text-base'
    },
    lg: {
      container: 'h-24 w-24',
      icon: 'text-6xl',
      text: 'text-lg'
    }
  };

  // Animation variants
  const containerVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const dotsVariants = {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        times: [0, 0.5, 1],
        staggerChildren: 0.2
      }
    }
  };

  const dotVariant = {
    animate: {
      opacity: [0, 1, 0],
      y: [0, -10, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Rotating film icon */}
      <div className="relative mb-6">
        <motion.div
          variants={containerVariants}
          animate="animate"
          className={`relative ${sizes[size].container}`}
        >
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute inset-0 bg-primary-500 rounded-full opacity-30"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaFilm className={`text-primary-500 ${sizes[size].icon}`} />
          </div>
        </motion.div>
      </div>
      
      {/* Loading text with animated dots */}
      <motion.div 
        className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 font-medium"
      >
        <span className={sizes[size].text}>{text}</span>
        <motion.div 
          variants={dotsVariants}
          animate="animate"
          className="flex space-x-1"
        >
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              variants={dotVariant}
              className="w-1 h-1 bg-primary-500 rounded-full"
              style={{ display: 'block' }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EnhancedLoader;