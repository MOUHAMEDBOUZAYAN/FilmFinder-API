import React, { useState, useEffect } from 'react';
import { 
  FaFilm, FaHeart, FaSearch, FaStar, FaCode, FaUsers, FaEnvelope, 
  FaReact, FaNodeJs, FaDatabase, FaAward, FaGithub, FaLinkedin, 
  FaTwitter, FaPlay, FaQuoteLeft, FaRocket, FaShieldAlt, FaMobile,
  FaChartLine, FaGlobe, FaClock, FaDownload
} from 'react-icons/fa';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [visibleSection, setVisibleSection] = useState('');
  const [stats, setStats] = useState({
    users: 0,
    movies: 0,
    reviews: 0,
    countries: 0
  });

  // Animation des statistiques
  useEffect(() => {
    const targetStats = { users: 25000, movies: 180000, reviews: 45000, countries: 95 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        users: Math.floor(targetStats.users * progress),
        movies: Math.floor(targetStats.movies * progress),
        reviews: Math.floor(targetStats.reviews * progress),
        countries: Math.floor(targetStats.countries * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <FaSearch className="text-3xl text-blue-500" />,
      title: "Recherche Intelligente",
      description: "IA avancée pour des recommandations personnalisées basées sur vos goûts et votre historique.",
      stats: "99.2% de précision"
    },
    {
      icon: <FaHeart className="text-3xl text-red-500" />,
      title: "Listes Personnalisées",
      description: "Créez des collections thématiques, partagez vos découvertes et suivez vos amis cinéphiles.",
      stats: "15+ types de listes"
    },
    {
      icon: <FaStar className="text-3xl text-yellow-500" />,
      title: "Critiques Communautaires",
      description: "Notes et avis vérifiés de notre communauté passionnée de plus de 25 000 cinéphiles.",
      stats: "45K+ avis vérifiés"
    },
    {
      icon: <FaMobile className="text-3xl text-green-500" />,
      title: "Multi-Plateforme",
      description: "Synchronisation parfaite entre tous vos appareils avec sauvegarde cloud automatique.",
      stats: "iOS, Android, Web"
    }
  ];

  const teamMembers = [
    {
      name: "Marie Dubois",
      role: "Fondatrice & CEO",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      description: "Ex-Netflix, spécialisée en systèmes de recommandation et expérience utilisateur. Diplômée de Polytechnique.",
      social: { github: "#", linkedin: "#", twitter: "#" },
      achievements: ["Prix Innovation 2024", "Forbes 30 under 30"]
    },
    {
      name: "Thomas Lefèvre",
      role: "CTO & Co-fondateur",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Architecte cloud avec 12 ans d'expérience chez Google et Amazon. Expert en machine learning.",
      social: { github: "#", linkedin: "#", twitter: "#" },
      achievements: ["Google Cloud Champion", "AWS Solutions Architect"]
    },
    {
      name: "Sophie Martin",
      role: "Head of Design",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      description: "Designer primée avec une expertise en psychologie cognitive et accessibilité numérique.",
      social: { github: "#", linkedin: "#", twitter: "#" },
      achievements: ["UX Design Awards 2023", "Accessibility Champion"]
    }
  ];

  const testimonials = [
    {
      quote: "FilmExplorer a révolutionné ma façon de découvrir des films. Les recommandations sont d'une précision incroyable !",
      author: "Alexandre D.",
      role: "Critique de cinéma",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "Interface intuitive, base de données énorme, et une communauté passionnante. Un must pour tout cinéphile !",
      author: "Juliette M.",
      role: "Journaliste culturelle",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face"
    },
    {
      quote: "Grâce à FilmExplorer, j'ai découvert des perles rares que je n'aurais jamais trouvées ailleurs.",
      author: "Pierre L.",
      role: "Réalisateur indépendant",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face"
    }
  ];

  const technologies = [
    { name: "React", icon: <FaReact className="text-3xl text-blue-500" />, description: "Interface utilisateur moderne" },
    { name: "Node.js", icon: <FaNodeJs className="text-3xl text-green-500" />, description: "Backend haute performance" },
    { name: "MongoDB", icon: <FaDatabase className="text-3xl text-green-700" />, description: "Base de données NoSQL" },
    { name: "AI/ML", icon: <FaRocket className="text-3xl text-purple-500" />, description: "Intelligence artificielle" },
  ];

  const timeline = [
    { year: "2020", event: "Création de FilmExplorer", description: "Lancement de la première version avec 1000 films" },
    { year: "2021", event: "Partenariat OMDb", description: "Accès à plus de 100 000 films et séries" },
    { year: "2022", event: "Application mobile", description: "Lancement sur iOS et Android" },
    { year: "2023", event: "IA de recommandation", description: "Système d'IA propriétaire développé" },
    { year: "2024", event: "Communauté mondiale", description: "25 000 utilisateurs dans 95 pays" }
  ];

  const tabContent = {
    mission: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Notre Mission</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Démocratiser la découverte cinématographique en rendant accessible à tous une expérience de recherche 
          et de recommandation de films personnalisée, intelligente et communautaire.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <FaGlobe className="text-2xl text-blue-500 mb-2" />
            <h4 className="font-semibold">Accessible Mondialement</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Disponible en 12 langues</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <FaShieldAlt className="text-2xl text-green-500 mb-2" />
            <h4 className="font-semibold">Données Sécurisées</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Chiffrement end-to-end</p>
          </div>
        </div>
      </div>
    ),
    vision: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Notre Vision</h3>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Devenir la référence mondiale pour la découverte et l'exploration cinématographique, 
          en créant une communauté unie par la passion du 7ème art.
        </p>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
          <h4 className="text-xl font-bold mb-2">Objectif 2025</h4>
          <p>100 000 utilisateurs actifs et partenariats avec les principaux festivals de cinéma mondiaux.</p>
        </div>
      </div>
    ),
    values: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Nos Valeurs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Innovation", desc: "Technologie de pointe au service de l'art" },
            { title: "Communauté", desc: "Entraide et partage entre passionnés" },
            { title: "Diversité", desc: "Promotion de tous les cinémas du monde" },
            { title: "Qualité", desc: "Excellence dans chaque fonctionnalité" }
          ].map((value, index) => (
            <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-800 dark:text-white">{value.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section avec vidéo de fond */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-400">
            FilmExplorer
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            L'avenir de la découverte cinématographique est ici
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold transition-colors flex items-center">
              <FaPlay className="mr-2" /> Voir la démo
            </button>
            <button className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-full font-semibold transition-colors flex items-center">
              <FaDownload className="mr-2" /> Télécharger l'app
            </button>
          </div>
          
          {/* Statistiques en temps réel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400">{stats.users.toLocaleString()}</div>
              <div className="text-sm opacity-80">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400">{stats.movies.toLocaleString()}</div>
              <div className="text-sm opacity-80">Films référencés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400">{stats.reviews.toLocaleString()}</div>
              <div className="text-sm opacity-80">Avis vérifiés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-400">{stats.countries}</div>
              <div className="text-sm opacity-80">Pays</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Fonctionnalités améliorées */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Pourquoi FilmExplorer ?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une plateforme conçue par des cinéphiles, pour des cinéphiles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-gray-800 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
                  {feature.description}
                </p>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full text-center">
                  {feature.stats}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section à onglets Mission/Vision/Valeurs */}
        <div className="mb-20 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <div className="flex flex-wrap justify-center mb-8 border-b">
            {Object.keys(tabContent).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold text-lg capitalize transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="max-w-4xl mx-auto">
            {tabContent[activeTab]}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Notre Parcours</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">5 années d'innovation continue</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            {timeline.map((item, index) => (
              <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{item.year}</div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{item.event}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Équipe améliorée */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              L'Équipe qui Révolutionne le Cinéma
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Des experts passionnés venus des plus grandes entreprises tech
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Social links overlay */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a href={member.social.github} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30">
                      <FaGithub className="text-white" />
                    </a>
                    <a href={member.social.linkedin} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30">
                      <FaLinkedin className="text-white" />
                    </a>
                    <a href={member.social.twitter} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30">
                      <FaTwitter className="text-white" />
                    </a>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{member.description}</p>
                  
                  {/* Achievements */}
                  <div className="space-y-2">
                    {member.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <FaAward className="text-yellow-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Témoignages carrousel */}
        <div className="mb-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Ils nous font confiance
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Plus de 25 000 utilisateurs satisfaits dans le monde
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-shadow duration-300"
              >
                <FaQuoteLeft className="text-3xl text-blue-200 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} text-lg mr-1`} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies avec descriptions */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Stack Technologique de Pointe
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Les meilleures technologies pour une expérience optimale
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{tech.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action final */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Rejoignez l'Aventure FilmExplorer</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Découvrez une nouvelle façon d'explorer le cinéma et connectez-vous avec une communauté passionnée du 7ème art.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center">
              <FaUsers className="mr-2" /> Rejoindre la communauté
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold transition-colors flex items-center">
              <FaEnvelope className="mr-2" /> Nous contacter
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-lg opacity-90">
              <FaEnvelope className="inline mr-2" />
              contact@filmexplorer.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;