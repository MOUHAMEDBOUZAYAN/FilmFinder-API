import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, FaTwitter, FaLinkedin, FaFilm, FaHeart, FaEnvelope, 
  FaInstagram, FaYoutube, FaTiktok, FaDiscord, FaPhone, FaMapMarkerAlt,
  FaCrown, FaNewspaper, FaShieldAlt, FaCookieBite, FaGift, FaStar,
  FaRocket, FaUsers, FaAward, FaChevronUp, FaChevronRight, FaMobile,
  FaDesktop, FaTabletAlt, FaTv, FaDownload, FaGlobe, FaHeadset, FaFire
} from 'react-icons/fa';
import { 
  HeartIcon, StarIcon, FilmIcon, SparklesIcon, 
  GlobeAltIcon, DevicePhoneMobileIcon, ComputerDesktopIcon
} from '@heroicons/react/24/solid';
import React from 'react';

const ProfessionalFooter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [stats, setStats] = useState({
    users: 0,
    movies: 0,
    reviews: 0,
    countries: 0
  });

  const currentYear = new Date().getFullYear();

  // Show back to top button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate stats
  useEffect(() => {
    const finalStats = {
      users: 1200000,
      movies: 50000,
      reviews: 250000,
      countries: 180
    };

    Object.keys(finalStats).forEach(key => {
      const finalValue = finalStats[key];
      let currentValue = 0;
      const increment = finalValue / 150;
      
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(timer);
        }
        
        setStats(prev => ({
          ...prev,
          [key]: Math.floor(currentValue)
        }));
      }, 20);
    });
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Footer sections data
  const footerSections = [
    {
      id: 'navigation',
      title: 'Navigation',
      icon: FaFilm,
      links: [
        { name: 'Accueil', path: '/', icon: FaFilm },
        { name: 'Films Populaires', path: '/?search=popular', icon: FaFire },
        { name: 'Nouveautés', path: '/?search=2024', icon: FaRocket },
        { name: 'Top Rated', path: '/?search=top', icon: FaStar },
        { name: 'Mes Favoris', path: '/favorites', icon: FaHeart },
        { name: 'À Propos', path: '/about', icon: FaUsers }
      ]
    },
    {
      id: 'categories',
      title: 'Genres',
      icon: StarIcon,
      links: [
        { name: 'Action', path: '/?search=action', color: 'text-red-400' },
        { name: 'Comédie', path: '/?search=comedy', color: 'text-yellow-400' },
        { name: 'Drame', path: '/?search=drama', color: 'text-blue-400' },
        { name: 'Science-Fiction', path: '/?search=sci-fi', color: 'text-purple-400' },
        { name: 'Horreur', path: '/?search=horror', color: 'text-gray-400' },
        { name: 'Romance', path: '/?search=romance', color: 'text-pink-400' }
      ]
    },
    {
      id: 'premium',
      title: 'Premium',
      icon: FaCrown,
      links: [
        { name: 'Avantages Premium', path: '/premium', icon: FaGift },
        { name: 'Plans & Tarifs', path: '/pricing', icon: FaStar },
        { name: 'Contenu Exclusif', path: '/exclusive', icon: FaCrown },
        { name: 'Support Priority', path: '/support', icon: FaHeadset },
        { name: 'Téléchargements', path: '/downloads', icon: FaDownload }
      ]
    },
    {
      id: 'company',
      title: 'Entreprise',
      icon: FaUsers,
      links: [
        { name: 'À Propos', path: '/about', icon: FaUsers },
        { name: 'Carrières', path: '/careers', icon: FaRocket },
        { name: 'Presse', path: '/press', icon: FaNewspaper },
        { name: 'Partenaires', path: '/partners', icon: FaAward },
        { name: 'Blog', path: '/blog', icon: FaNewspaper }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      icon: FaHeadset,
      links: [
        { name: 'Centre d\'aide', path: '/help', icon: FaHeadset },
        { name: 'Contact', path: '/contact', icon: FaEnvelope },
        { name: 'FAQ', path: '/faq', icon: FaUsers },
        { name: 'Signaler un Bug', path: '/bug-report', icon: FaShieldAlt },
        { name: 'Politique de Confidentialité', path: '/privacy', icon: FaShieldAlt },
        { name: 'Conditions d\'Utilisation', path: '/terms', icon: FaShieldAlt }
      ]
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: FaGithub, url: 'https://github.com', color: 'hover:text-gray-400' },
    { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com', color: 'hover:text-blue-600' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com', color: 'hover:text-pink-400' },
    { name: 'YouTube', icon: FaYoutube, url: 'https://youtube.com', color: 'hover:text-red-400' },
    { name: 'Discord', icon: FaDiscord, url: 'https://discord.com', color: 'hover:text-indigo-400' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com', color: 'hover:text-pink-500' }
  ];

  const platforms = [
    { name: 'Web', icon: FaDesktop, description: 'Expérience complète' },
    { name: 'Mobile', icon: FaMobile, description: 'iOS & Android' },
    { name: 'Tablette', icon: FaTabletAlt, description: 'Interface adaptée' },
    { name: 'Smart TV', icon: FaTv, description: 'Grand écran' }
  ];

  const achievements = [
    { icon: FaUsers, value: stats.users, label: 'Utilisateurs Actifs', suffix: '+' },
    { icon: FaFilm, value: stats.movies, label: 'Films Disponibles', suffix: '+' },
    { icon: FaStar, value: stats.reviews, label: 'Avis & Critiques', suffix: '+' },
    { icon: FaGlobe, value: stats.countries, label: 'Pays Couverts', suffix: '' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 12
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200,
        delay: 0.3
      }
    }
  };

  const newsletterVariants = {
    rest: { scale: 1 },
    focus: { 
      scale: 1.02,
      boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.1)"
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border-t border-gray-700/50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-500/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-b border-gray-700/50 py-16"
        >
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <SparklesIcon className="h-10 w-10 text-white" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Restez Connecté
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Recevez les dernières actualités, critiques exclusives et recommandations personnalisées directement dans votre boîte mail.
              </p>
              
              <motion.form 
                onSubmit={handleNewsletterSubmit}
                variants={newsletterVariants}
                initial="rest"
                whileFocus="focus"
                className="max-w-md mx-auto"
              >
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center"
                  >
                    {subscribed ? <FaHeart className="h-4 w-4" /> : <FaEnvelope className="h-4 w-4" />}
                  </motion.button>
                </div>
              </motion.form>

              <AnimatePresence>
                {subscribed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 text-green-400 font-medium"
                  >
                    ✨ Merci ! Vous êtes maintenant abonné à notre newsletter.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 border-b border-gray-700/50"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  variants={statsVariants}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {React.createElement(achievement.icon, { className: "h-8 w-8 text-white" })}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {achievement.value.toLocaleString()}{achievement.suffix}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
              {/* Brand Section */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <Link to="/" className="flex items-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4"
                  >
                    <FilmIcon className="h-6 w-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">FilmHub Pro</h3>
                    <p className="text-sm text-gray-400">Découvrez le cinéma</p>
                  </div>
                </Link>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  La plateforme de référence pour les passionnés de cinéma. Découvrez, explorez et partagez votre amour du septième art avec une communauté mondiale de cinéphiles.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <FaEnvelope className="h-4 w-4 text-indigo-400 mr-3" />
                    <span>contact@filmhub-pro.com</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaPhone className="h-4 w-4 text-green-400 mr-3" />
                    <span>+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="h-4 w-4 text-red-400 mr-3" />
                    <span>Paris, France</span>
                  </div>
                </div>

                {/* Platform Icons */}
                <div className="space-y-3">
                  <h4 className="text-white font-semibold mb-3">Available on</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {platforms.map((platform, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center p-3 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-500/50 transition-all"
                      >
                        {React.createElement(platform.icon, { className: "h-5 w-5 text-indigo-400 mr-3" })}
                        <div>
                          <div className="text-white text-sm font-medium">{platform.name}</div>
                          <div className="text-gray-400 text-xs">{platform.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Footer Sections */}
              {footerSections.map((section, sectionIndex) => (
                <motion.div 
                  key={section.id}
                  variants={itemVariants}
                  className="lg:col-span-1"
                >
                  <motion.button
                    onClick={() => toggleSection(section.id)}
                    className="lg:cursor-default w-full lg:w-auto flex items-center justify-between lg:justify-start mb-6 text-white font-semibold text-lg"
                  >
                    <div className="flex items-center">
                      {React.createElement(section.icon, { className: "h-5 w-5 text-indigo-400 mr-3" })}
                      {section.title}
                    </div>
                    <FaChevronRight 
                      className={`lg:hidden h-4 w-4 transition-transform ${
                        expandedSection === section.id ? 'rotate-90' : ''
                      }`} 
                    />
                  </motion.button>
                  
                  <AnimatePresence>
                    {(expandedSection === section.id || window.innerWidth >= 1024) && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3 overflow-hidden"
                      >
                        {section.links.map((link, linkIndex) => (
                          <motion.li
                            key={linkIndex}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: linkIndex * 0.05 }}
                          >
                            <Link
                              to={link.path}
                              className={`flex items-center text-gray-400 hover:text-white transition-colors group ${
                                link.color || ''
                              }`}
                            >
                              {link.icon && (
                                React.createElement(link.icon, { className: "h-4 w-4 mr-3 opacity-60 group-hover:opacity-100 transition-opacity" })
                              )}
                              <span className="group-hover:translate-x-1 transition-transform">
                                {link.name}
                              </span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Social Links & Copyright */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-700/50 py-8"
        >
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div variants={itemVariants} className="mb-6 md:mb-0">
                <p className="text-gray-400 text-center md:text-left">
                  © {currentYear} FilmHub Pro. Tous droits réservés.
                </p>
                <p className="text-gray-500 text-sm text-center md:text-left mt-1">
                  Développé avec <HeartIcon className="inline h-4 w-4 text-red-500 mx-1" /> pour les cinéphiles
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={iconVariants}
                    initial="rest"
                    whileHover="hover"
                    className={`p-3 bg-white/5 border border-white/10 rounded-full text-gray-400 ${social.color} transition-all group`}
                  >
                    {React.isValidElement(social.icon) ? social.icon : React.createElement(social.icon, { className: "h-5 w-5" })}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Additional Legal Links */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-gray-800 text-center"
            >
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Politique de Confidentialité
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Conditions d'Utilisation
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <FaCookieBite className="h-4 w-4 mr-1" />
                  Cookies
                </Link>
                <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                  Accessibilité
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-2xl hover:shadow-indigo-500/25 transition-all group"
          >
            <FaChevronUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default ProfessionalFooter;