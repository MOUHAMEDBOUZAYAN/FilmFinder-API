import { motion } from 'framer-motion';
import { FaFilm, FaHeart, FaSearch, FaStar, FaCode, FaUsers, FaEnvelope, FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaSearch className="text-3xl text-primary-500" />,
      title: "Recherche Avancée",
      description: "Trouvez facilement vos films préférés avec notre système de recherche puissant et personnalisable."
    },
    {
      icon: <FaHeart className="text-3xl text-primary-500" />,
      title: "Gestion des Favoris",
      description: "Sauvegardez vos films préférés pour les retrouver facilement plus tard et créez des listes personnalisées."
    },
    {
      icon: <FaStar className="text-3xl text-primary-500" />,
      title: "Détails Complets",
      description: "Accédez à toutes les informations sur vos films : casting, synopsis, notes, bandes-annonces et critiques."
    },
    {
      icon: <FaFilm className="text-3xl text-primary-500" />,
      title: "Interface Moderne",
      description: "Une expérience utilisateur fluide et agréable avec un design élégant et adaptatif sur tous les appareils."
    }
  ];

  const teamMembers = [
    {
      name: "Marie Dubois",
      role: "Fondatrice & Développeuse Frontend",
      photo: "/api/placeholder/150/150",
      description: "Passionnée de cinéma et d'UX/UI design avec plus de 8 ans d'expérience dans le développement web."
    },
    {
      name: "Thomas Lefèvre",
      role: "Développeur Backend",
      photo: "/api/placeholder/150/150",
      description: "Expert en architecture de bases de données et API avec une spécialisation dans les systèmes de recommandation."
    },
    {
      name: "Sophie Martin",
      role: "UX Designer",
      photo: "/api/placeholder/150/150",
      description: "Designer créative avec une formation en psychologie cognitive et une passion pour l'expérience utilisateur."
    }
  ];

  const testimonials = [
    {
      quote: "FilmExplorer a complètement changé ma façon de découvrir de nouveaux films. Une interface intuitive et des recommandations pertinentes !",
      author: "Alexandre D., cinéphile",
      rating: 5
    },
    {
      quote: "En tant que critique de cinéma, j'utilise FilmExplorer quotidiennement. La base de données est impressionnante et constamment mise à jour.",
      author: "Juliette M., journaliste",
      rating: 4.5
    }
  ];

  const technologies = [
    { name: "React", icon: <FaReact className="text-2xl text-blue-500" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-2xl text-green-500" /> },
    { name: "MongoDB", icon: <FaDatabase className="text-2xl text-green-700" /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      {/* Header Section */}
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          À Propos de <span className="text-primary-500">FilmExplorer</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez une nouvelle façon d'explorer le monde du cinéma avec notre plateforme intuitive et complète.
        </p>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white dark:bg-dark-700 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-white">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Notre Mission</h2>
          <p className="text-lg mb-6">
            FilmExplorer a été créé pour les amoureux du cinéma qui souhaitent découvrir, explorer et organiser leurs films préférés en un seul endroit. Notre plateforme utilise l'API OMDb pour vous offrir une vaste collection de films avec des informations détaillées.
          </p>
          <p className="text-lg mb-6">
            Nous nous engageons à offrir l'expérience la plus complète et personnalisée pour tous les cinéphiles, des novices aux experts. Notre objectif est de vous aider à découvrir de nouveaux films qui correspondent parfaitement à vos goûts et préférences.
          </p>
          <div className="flex items-center">
            <FaCode className="text-2xl mr-2" />
            <span className="text-lg">Développé avec passion pour les passionnés de cinéma</span>
          </div>
        </div>
      </motion.div>

      {/* Team Section - NOUVEAU */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Notre Équipe</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Une équipe passionnée qui travaille chaque jour pour améliorer votre expérience cinématographique.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index + 0.8 }}
              className="bg-white dark:bg-dark-700 rounded-lg shadow-md p-6 text-center"
            >
              <img 
                src={member.photo} 
                alt={member.name} 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1 text-gray-800 dark:text-white">{member.name}</h3>
              <p className="text-primary-500 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 dark:text-gray-300">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section - NOUVEAU */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mb-16 bg-gray-100 dark:bg-dark-800 rounded-xl p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Ce que disent nos utilisateurs</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * index + 1 }}
              className="bg-white dark:bg-dark-700 rounded-lg shadow-md p-6"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} text-xl mr-1`} 
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <p className="text-gray-600 dark:text-gray-400 font-medium">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technologies Section - NOUVEAU */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mb-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Technologies Utilisées</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            FilmExplorer est construit avec des technologies modernes pour une expérience optimale.
          </p>
        </div>
        
        <div className="flex justify-center items-center space-x-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index + 1.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-2">
                {tech.icon}
              </div>
              <p className="text-gray-800 dark:text-gray-200 font-medium">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contact Section - NOUVEAU */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl p-8 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
          <p className="text-lg mb-6">
            Vous avez des questions ou des suggestions ? Notre équipe est à votre écoute pour améliorer continuellement votre expérience.
          </p>
          <div className="inline-flex items-center justify-center">
            <FaEnvelope className="text-2xl mr-2" />
            <span className="text-lg">contact@filmexplorer.com</span>
          </div>
          <div className="mt-6">
            <button className="bg-white text-primary-500 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300">
              Envoyez-nous un message
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;