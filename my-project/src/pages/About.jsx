import { motion } from 'framer-motion';
import { FaFilm, FaHeart, FaSearch, FaStar, FaCode } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaSearch className="text-3xl text-primary-500" />,
      title: "Recherche Avancée",
      description: "Trouvez facilement vos films préférés avec notre système de recherche puissant."
    },
    {
      icon: <FaHeart className="text-3xl text-primary-500" />,
      title: "Gestion des Favoris",
      description: "Sauvegardez vos films préférés pour les retrouver facilement plus tard."
    },
    {
      icon: <FaStar className="text-3xl text-primary-500" />,
      title: "Détails Complets",
      description: "Accédez à toutes les informations sur vos films : casting, synopsis, notes, etc."
    },
    {
      icon: <FaFilm className="text-3xl text-primary-500" />,
      title: "Interface Moderne",
      description: "Une expérience utilisateur fluide et agréable avec un design élégant."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
          À Propos de <span className="text-primary-500">FilmExplorer</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Découvrez une nouvelle façon d'explorer le monde du cinéma avec notre plateforme intuitive et complète.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
          <p className="mb-6">
            FilmExplorer a été créé pour les amoureux du cinéma qui souhaitent découvrir, explorer et organiser leurs films préférés en un seul endroit. Notre plateforme utilise l'API OMDb pour vous offrir une vaste collection de films avec des informations détaillées.
          </p>
          <div className="flex items-center">
            <FaCode className="text-2xl mr-2" />
            <span>Développé avec passion pour les passionnés de cinéma</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;