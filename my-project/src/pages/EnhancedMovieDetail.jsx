import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getMovieDetails } from '../services/api';
import Loader from '../components/ImprovedLoader';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/24/solid';
import { 
  FaImdb, FaHeart, FaClock, FaCalendar, FaVideo, FaGlobe, 
  FaLanguage, FaDollarSign, FaTrophy, FaUser, FaShare, 
  FaBookmark, FaPlay, FaChartLine, FaComment, FaExternalLinkAlt,
  FaTicketAlt, FaListUl
} from 'react-icons/fa';
import toast from 'react-hot-toast'; // Assurez-vous d'installer cette dépendance

const EnhancedMovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [showTrailer, setShowTrailer] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const detailsRef = useRef(null);

  // Fonction pour gérer le partage
  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: movie?.Title || 'Détails de film sur FilmExplorer',
        text: `Découvre ${movie?.Title} (${movie?.Year}) sur FilmExplorer !`,
        url: window.location.href,
      })
      .then(() => toast.success('Film partagé avec succès !'))
      .catch((error) => console.error('Erreur de partage:', error));
    } else {
      // Copier le lien si l'API Web Share n'est pas disponible
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Lien copié dans le presse-papier !'))
        .catch(() => toast.error('Impossible de copier le lien.'));
    }
  }, [movie]);

  // Effet pour charger les détails du film
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simuler une légère latence pour une meilleure UX avec le loader
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const data = await getMovieDetails(id);

        if (!data || data.Response === 'False') {
          throw new Error(data?.Error || 'Film non trouvé');
        }

        // Vérifier si le film est dans les favoris
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(fav => fav.imdbID === data.imdbID));

        // Mettre en cache les données pour les chargements suivants
        sessionStorage.setItem(`movie_${id}`, JSON.stringify(data));
        
        setMovie(data);
        document.title = `${data.Title} (${data.Year}) | FilmExplorer`;
        
        // Remonter au haut de la page
        window.scrollTo(0, 0);
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.message || 'Impossible de charger les détails du film.');
      } finally {
        setLoading(false);
      }
    };

    // Vérifier si les données sont dans le cache de session
    const cachedData = sessionStorage.getItem(`movie_${id}`);
    if (cachedData) {
      const data = JSON.parse(cachedData);
      setMovie(data);
      
      // Vérifier les favoris même pour les données en cache
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setIsFavorite(favorites.some(fav => fav.imdbID === data.imdbID));
      
      document.title = `${data.Title} (${data.Year}) | FilmExplorer`;
      setLoading(false);
    } else {
      fetchMovie();
    }
    
    // Nettoyage lors du démontage
    return () => {
      document.title = 'FilmExplorer';
    };
  }, [id]);

  // Charger des films similaires
  useEffect(() => {
    const fetchSimilarMovies = async () => {
      if (!movie) return;
      
      try {
        setLoadingSimilar(true);
        // Ici, vous pouvez implémenter un appel API pour récupérer des films similaires
        // en utilisant le titre ou les genres du film actuel
        
        // Simulation - à remplacer par votre véritable logique d'API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Exemple de données fictives - remplacer par votre véritable appel API
        const mockSimilarMovies = [
          {
            imdbID: 'tt0076759',
            Title: 'Film Similaire 1',
            Year: '2020',
            Poster: 'https://via.placeholder.com/300x450?text=Film+1',
            Type: 'movie'
          },
          {
            imdbID: 'tt0080684',
            Title: 'Film Similaire 2',
            Year: '2019',
            Poster: 'https://via.placeholder.com/300x450?text=Film+2',
            Type: 'movie'
          },
          {
            imdbID: 'tt0086190',
            Title: 'Film Similaire 3',
            Year: '2021',
            Poster: 'https://via.placeholder.com/300x450?text=Film+3',
            Type: 'movie'
          }
        ];
        
        setSimilarMovies(mockSimilarMovies);
      } catch (error) {
        console.error('Erreur lors du chargement des films similaires:', error);
      } finally {
        setLoadingSimilar(false);
      }
    };
    
    fetchSimilarMovies();
  }, [movie]);

  // Gérer l'ajout/retrait des favoris
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      const updated = favorites.filter(fav => fav.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(updated));
      toast.success('Retiré des favoris');
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
      toast.success('Ajouté aux favoris');
    }
    
    setIsFavorite(!isFavorite);
  };

  // Ajouter à la liste de films à voir
  const addToWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const isInWatchlist = watchlist.some(item => item.imdbID === movie.imdbID);
    
    if (isInWatchlist) {
      toast.error('Ce film est déjà dans votre liste à voir');
    } else {
      localStorage.setItem('watchlist', JSON.stringify([...watchlist, movie]));
      toast.success('Ajouté à votre liste à voir');
    }
  };

  // Simuler le lancement d'une bande-annonce
  const openTrailer = () => {
    setShowTrailer(true);
    // En production, vous pourriez intégrer l'API YouTube pour rechercher la bande-annonce
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 1 }
    }
  };

  const ratingColorClass = (rating) => {
    if (!rating) return 'bg-gray-500';
    const numRating = parseFloat(rating);
    if (numRating >= 8) return 'bg-green-500';
    if (numRating >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Amélioration: générer une couleur de fond dynamique basée sur le titre du film
  const generateDynamicColor = () => {
    if (!movie || !movie.Title) return 'from-primary-600 to-primary-800';
    
    const hash = movie.Title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360;
    
    return `from-[hsl(${hue},70%,45%)] to-[hsl(${(hue + 60) % 360},70%,30%)]`;
  };

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader size="lg" />
    </div>
  );
  
  if (error) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
        <p className="font-medium">{error}</p>
        <p className="text-sm mt-1">Veuillez réessayer ou retourner à la recherche</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
      >
        Retour
      </button>
    </div>
  );

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen"
      ref={detailsRef}
    >
      {/* Film Backdrop */}
      <motion.div 
        variants={backdropVariants}
        className="absolute top-0 left-0 w-full h-[500px] overflow-hidden z-0"
      >
        <div 
          className="w-full h-full bg-center bg-cover opacity-30 dark:opacity-25"
          style={{ 
            backgroundImage: `url(${movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/1600x900?text=No+Backdrop'})`,
            filter: 'blur(10px)'
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${generateDynamicColor()} opacity-50`}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-white dark:to-gray-900"></div>
      </motion.div>

      <div className="container mx-auto px-4 pt-10 pb-16 relative z-10">
        <motion.button
          variants={itemVariants}
          onClick={() => navigate(-1)}
          className="flex items-center text-white hover:text-primary-300 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Retour aux Films
        </motion.button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Colonne Poster */}
          <motion.div variants={itemVariants} className="lg:w-1/3">
            <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={
                  movie.Poster && movie.Poster !== 'N/A'
                    ? movie.Poster
                    : 'https://via.placeholder.com/500x750?text=No+Poster'
                }
                alt={movie.Title || 'Poster'}
                className="w-full h-auto rounded-xl"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                }}
              />
              
              {/* Bouton Bande-annonce */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openTrailer}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="bg-white/90 dark:bg-gray-800/90 p-4 rounded-full">
                  <FaPlay className="h-8 w-8 text-primary-500" />
                </div>
              </motion.button>
            </div>

            {/* Actions Rapides */}
            <motion.div 
              variants={itemVariants}
              className="flex gap-3 mt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFavorite}
                className={`flex items-center justify-center flex-1 p-3 rounded-lg shadow-md transition-colors ${
                  isFavorite ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white'
                }`}
              >
                <FaHeart className={`h-5 w-5 ${isFavorite ? 'text-white' : 'text-red-500'}`} />
                <span className="ml-2 font-medium">{isFavorite ? 'Favoris' : 'Ajouter'}</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addToWatchlist}
                className="flex items-center justify-center flex-1 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <FaBookmark className="h-5 w-5 text-primary-500" />
                <span className="ml-2 font-medium text-gray-800 dark:text-white">À voir</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-800 dark:text-white"
              >
                <FaShare className="h-5 w-5 text-primary-500" />
              </motion.button>
            </motion.div>

            {/* Infos rapides - Mobile uniquement */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 lg:hidden"
            >
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {movie.Title}
              </h1>
              
              <div className="flex items-center mb-4">
                {movie.imdbRating && (
                  <div className={`flex items-center ${ratingColorClass(movie.imdbRating)} text-white px-3 py-1 rounded-md mr-3`}>
                    <StarIcon className="h-5 w-5 mr-1" />
                    <span className="font-bold">{movie.imdbRating}</span>
                  </div>
                )}
                
                <span className="text-gray-600 dark:text-gray-300">{movie.Year}</span>
                
                {movie.Rated && (
                  <span className="ml-3 border border-gray-300 dark:border-gray-600 px-2 py-0.5 rounded">
                    {movie.Rated}
                  </span>
                )}
              </div>
            </motion.div>

            {/* Statistiques du film */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <FaChartLine className="w-5 h-5 text-primary-500 mr-2" />
                Informations
              </h3>
              
              <ul className="space-y-3">
                {movie.Runtime && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaClock className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.Runtime}</span>
                  </li>
                )}
                
                {movie.Year && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCalendar className="w-5 h-5 text-primary-500 mr-3" />
                    <span>Sorti en {movie.Year}</span>
                  </li>
                )}
                
                {movie.Language && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaLanguage className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.Language}</span>
                  </li>
                )}
                
                {movie.Country && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaGlobe className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.Country}</span>
                  </li>
                )}
                
                {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaDollarSign className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.BoxOffice}</span>
                  </li>
                )}
                
                {movie.Type && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaVideo className="w-5 h-5 text-primary-500 mr-3" />
                    <span className="capitalize">{movie.Type}</span>
                  </li>
                )}

                {movie.totalSeasons && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaListUl className="w-5 h-5 text-primary-500 mr-3" />
                    <span>{movie.totalSeasons} saison{parseInt(movie.totalSeasons) > 1 ? 's' : ''}</span>
                  </li>
                )}

                {movie.DVD && movie.DVD !== 'N/A' && (
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaTicketAlt className="w-5 h-5 text-primary-500 mr-3" />
                    <span>DVD: {movie.DVD}</span>
                  </li>
                )}
              </ul>
              
              {/* Liens externes */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Liens externes</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.imdbID && (
                    <a 
                      href={`https://www.imdb.com/title/${movie.imdbID}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-4 rounded-md transition-colors flex-1"
                    >
                      <FaImdb className="text-xl mr-2" /> IMDb
                    </a>
                  )}
                  
                  <a 
                    href={`https://www.google.com/search?q=${encodeURIComponent(`${movie.Title} ${movie.Year} film`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors flex-1"
                  >
                    <FaExternalLinkAlt className="mr-2" /> Google
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Section des commentaires utilisateurs */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                <FaComment className="w-5 h-5 text-primary-500 mr-2" />
                Vos impressions
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                Partagez votre avis sur ce film
              </p>
              
              <textarea 
                className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows="3"
                placeholder="Qu'avez-vous pensé de ce film ?"
              ></textarea>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-yellow-400 hover:text-yellow-500">
                      <StarIcon className="h-6 w-6" />
                    </button>
                  ))}
                </div>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition-colors">
                  Publier
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne Détails */}
          <motion.div variants={itemVariants} className="lg:w-2/3">
            {/* Titre et Note - Desktop uniquement */}
            <div className="hidden lg:block mb-6">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
                {movie.Title}
              </h1>
              
              <div className="flex items-center">
                {movie.imdbRating && (
                  <div className={`flex items-center ${ratingColorClass(movie.imdbRating)} text-white px-3 py-1 rounded-md mr-3`}>
                    <StarIcon className="h-5 w-5 mr-1" />
                    <span className="font-bold">{movie.imdbRating}</span>
                  </div>
                )}
                
                <span className="text-gray-600 dark:text-gray-300">{movie.Year}</span>
                
                {movie.Rated && (
                  <span className="ml-3 border border-gray-300 dark:border-gray-600 px-2 py-0.5 rounded">
                    {movie.Rated}
                  </span>
                )}
              </div>
            </div>

            {/* Genres */}
            {movie.Genre && (
              <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-6">
                {movie.Genre.split(',').map((genre) => (
                  <span
                    key={genre}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {genre.trim()}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Navigation par onglets */}
            <motion.div variants={itemVariants} className="mb-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTab('about')}
                  className={`whitespace-nowrap py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'about'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  À Propos
                </button>
                <button
                  onClick={() => setActiveTab('cast')}
                  className={`whitespace-nowrap py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'cast'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Casting & Équipe
                </button>
                <button
                  onClick={() => setActiveTab('awards')}
                  className={`whitespace-nowrap py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'awards'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Récompenses
                </button>
                <button
                  onClick={() => setActiveTab('similar')}
                  className={`whitespace-nowrap py-3 px-4 font-medium text-sm transition-colors ${
                    activeTab === 'similar'
                      ? 'text-primary-500 border-b-2 border-primary-500'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Films Similaires
                </button>
              </div>
            </motion.div>

            {/* Contenu des onglets */}
            <AnimatePresence mode="wait">
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                >
                  {movie.Plot && (
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                        <span className="inline-block w-8 h-1 bg-primary-500 mr-3"></span>
                        Synopsis
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {movie.Plot}
                      </p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {movie.Writer && movie.Writer !== 'N/A' && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Production
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {movie.Production}
                        </p>
                      </div>
                    )}
                    
                    {movie.Released && movie.Released !== 'N/A' && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Date de sortie
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {movie.Released}
                        </p>
                      </div>
                    )}
                    
                    {movie.Metascore && movie.Metascore !== 'N/A' && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          Metascore
                        </h3>
                        <div className={`inline-block px-3 py-1 rounded-md text-white font-bold ${
                          parseInt(movie.Metascore) >= 70 ? 'bg-green-500' :
                          parseInt(movie.Metascore) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}>
                          {movie.Metascore}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Call-to-action - regarder maintenant */}
                  <div className="mt-8 p-5 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg text-white">
                    <h3 className="text-xl font-bold mb-2">Vous aimez ce que vous voyez ?</h3>
                    <p className="opacity-90 mb-4">Ce film est disponible sur plusieurs plateformes de streaming.</p>
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors flex-1">
                        Netflix
                      </button>
                      <button className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors flex-1">
                        Amazon Prime
                      </button>
                      <button className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium transition-colors flex-1">
                        Disney+
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'cast' && (
                <motion.div
                  key="cast"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                >
                  {movie.Director && movie.Director !== 'N/A' && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <span className="inline-block w-8 h-1 bg-primary-500 mr-3"></span>
                        Réalisateur(s)
                      </h2>
                      <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full p-3 mr-4">
                          <FaUser className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                            {movie.Director}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            Réalisateur
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {movie.Writer && movie.Writer !== 'N/A' && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <span className="inline-block w-8 h-1 bg-primary-500 mr-3"></span>
                        Scénariste(s)
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {movie.Writer.split(',').map((writer, index) => (
                          <div 
                            key={index}
                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                          >
                            <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full p-3 mr-4">
                              <FaUser className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-gray-800 dark:text-gray-200 font-medium">
                                {writer.trim()}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Scénariste
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {movie.Actors && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                        <span className="inline-block w-8 h-1 bg-primary-500 mr-3"></span>
                        Acteurs principaux
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {movie.Actors.split(',').map((actor, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ 
                              opacity: 1, 
                              y: 0,
                              transition: { delay: index * 0.1 }
                            }}
                            className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-shadow"
                          >
                            <div className="flex-shrink-0 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden mr-4">
                              <img
                                src={`https://via.placeholder.com/150x150?text=${actor.trim().charAt(0)}`}
                                alt={actor.trim()}
                                className="w-16 h-16 object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                                {actor.trim()}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Acteur
                              </p>
                              <a 
                                href={`https://www.imdb.com/find?q=${encodeURIComponent(actor.trim())}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:text-primary-600 text-sm mt-1 inline-flex items-center"
                              >
                                <span>Voir sur IMDb</span>
                                <FaExternalLinkAlt className="ml-1 w-3 h-3" />
                              </a>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              
              {activeTab === 'awards' && (
                <motion.div
                  key="awards"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center mb-6">
                    <FaTrophy className="text-yellow-500 w-8 h-8 mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Récompenses et Nominations
                    </h2>
                  </div>
                  
                  {movie.Awards && movie.Awards !== 'N/A' ? (
                    <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-700/50 dark:to-gray-700/30 rounded-xl border border-yellow-100 dark:border-yellow-900/20">
                      <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                        {movie.Awards}
                      </p>
                    </div>
                  ) : (
                    <div className="p-5 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600">
                      <p className="text-gray-500 dark:text-gray-400 italic">
                        Aucune information disponible sur les récompenses.
                      </p>
                    </div>
                  )}
                  
                  {movie.Ratings && movie.Ratings.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Notes et Critiques
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {movie.Ratings.map((rating, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: { delay: index * 0.2 }
                            }}
                            className="bg-white dark:bg-gray-700 p-4 rounded-xl text-center shadow-sm border border-gray-100 dark:border-gray-600"
                          >
                            <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-full">
                              {rating.Source === 'Internet Movie Database' ? (
                                <FaImdb className="text-3xl text-yellow-500" />
                              ) : rating.Source === 'Rotten Tomatoes' ? (
                                <div className="text-red-500 font-bold text-xl">RT</div>
                              ) : rating.Source === 'Metacritic' ? (
                                <div className="text-blue-500 font-bold text-xl">MC</div>
                              ) : (
                                <StarIcon className="h-8 w-8 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                              {rating.Source}
                            </p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">
                              {rating.Value}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Visualisation graphique des notes */}
                  <div className="mt-8 p-5 bg-white dark:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                      Comparaison avec des films similaires
                    </h3>
                    <div className="h-64 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Graphique de comparaison des notes (à implémenter avec une bibliothèque de graphiques)
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Nouvel onglet: Films Similaires */}
              {activeTab === 'similar' && (
                <motion.div
                  key="similar"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                      <span className="inline-block w-8 h-1 bg-primary-500 mr-3"></span>
                      Films Similaires
                    </h2>
                    
                    <button className="text-primary-500 hover:text-primary-600 text-sm font-medium">
                      Voir plus
                    </button>
                  </div>
                  
                  {loadingSimilar ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader size="md" />
                    </div>
                  ) : similarMovies.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {similarMovies.map((similar, index) => (
                        <motion.div
                          key={similar.imdbID}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: index * 0.1 }
                          }}
                          className="bg-gray-50 dark:bg-gray-700/50 rounded-lg overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
                        >
                          <div className="relative pb-[56.25%]">
                            <img 
                              src={similar.Poster !== 'N/A' ? similar.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
                              alt={similar.Title}
                              className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                              <div>
                                <h3 className="text-white font-medium line-clamp-1">
                                  {similar.Title}
                                </h3>
                                <p className="text-gray-300 text-sm">{similar.Year}</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="text-gray-800 dark:text-gray-200 font-medium line-clamp-1 group-hover:text-primary-500 transition-colors">
                              {similar.Title}
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                              {similar.Year} · <span className="capitalize">{similar.Type}</span>
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">
                        Aucun film similaire trouvé.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-8 p-5 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Recommandations basées sur vos préférences
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Basé sur votre historique de visionnage et vos films favoris.
                    </p>
                    <button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors">
                      Personnaliser mes recommandations
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      
      {/* Modal Bande-annonce */}
      <AnimatePresence>
        {showTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
            >
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <p className="text-gray-400">
                  Bande-annonce de {movie.Title} (Simulée pour la démo)
                </p>
              </div>
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EnhancedMovieDetail;