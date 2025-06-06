import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import EnhancedNavbar from './components/EnhancedNavbar';
import Footer from './components/EnhancedFooter';
import EnhancedLoader from './components/EnhancedLoader';
import { Toaster } from 'react-hot-toast';

// Lazy load pages for better performance
const EnhancedHome = lazy(() => import('./pages/EnhancedHome'));
const EnhancedMovieDetail = lazy(() => import('./pages/EnhancedMovieDetail'));
const EnhancedFavorites = lazy(() => import('./pages/EnhancedFavorites'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Wrapper component for route change animations
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><EnhancedLoader size="lg" /></div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<EnhancedHome />} />
          <Route path="/movie/:id" element={<EnhancedMovieDetail />} />
          <Route path="/favorites" element={<EnhancedFavorites />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

// Main App component
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-900 transition-colors duration-200">
        <EnhancedNavbar />
        <main className="flex-grow pt-16 lg:pt-20">
          <AnimatedRoutes />
        </main>
        <Footer />
        {/* Toaster for displaying notifications */}
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;