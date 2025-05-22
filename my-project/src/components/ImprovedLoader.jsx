import { motion } from 'framer-motion';
import { FaFilm } from 'react-icons/fa';

const ImprovedLoader = ({ size = 'md', text = 'Chargement...' }) => {
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
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const iconVariants = {
    animate: {
      rotateY: [0, 180, 360],
      transition: {
        duration: 2,
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

  // Color animation for the film icon
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
  const colorVariants = {
    animate: {
      color: colors,
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      {/* Shimmering background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        <motion.div
          variants={containerVariants}
          animate="animate"
          className={`relative ${sizes[size].container}`}
        >
          {/* Circular glow animation */}
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="absolute inset-0 bg-primary-500 rounded-full opacity-30"
          />
          
          {/* Blurred shadow for depth */}
          <motion.div 
            animate={{ 
              boxShadow: ["0 0 10px rgba(59, 130, 246, 0.3)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 10px rgba(59, 130, 246, 0.3)"] 
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
          />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div variants={iconVariants} animate="animate">
              <motion.div variants={colorVariants} animate="animate">
                <FaFilm className={`${sizes[size].icon}`} />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Loading text with animated dots */}
      <motion.div 
        className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
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

      {/* Optional hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center max-w-md"
      >
        Nous préparons votre contenu cinématographique...
      </motion.p>
    </div>
  );
};

export default ImprovedLoader;