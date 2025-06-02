import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBell, FaFilm, FaHeart, FaBookmark, FaStar, 
  FaClock, FaTrash, FaCheck, FaTimes 
} from 'react-icons/fa';

const EnhancedNotifications = ({ activeDropdown, setActiveDropdown }) => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Ref for the notifications panel for click outside handling
  const notificationsRef = useRef(null);

  // Load notifications from localStorage
  useEffect(() => {
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(savedNotifications);
  }, []);

  // Handle clicks outside the notifications panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notifications panel if click is outside the panel and it's currently open
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        if (activeDropdown === 'notifications') {
          setActiveDropdown('none');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]); // Depend on activeDropdown to re-run effect

  // Save notifications to localStorage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Add a new notification
  const addNotification = (type, message, data = {}) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      data,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'new_film':
        return <FaFilm className="text-blue-500" />;
      case 'favorite':
        return <FaHeart className="text-red-500" />;
      case 'watchlist':
        return <FaBookmark className="text-yellow-500" />;
      case 'rating':
        return <FaStar className="text-purple-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const notificationVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      x: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="relative" ref={notificationsRef}>
      {/* Notification Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? 'none' : 'notifications')}
        className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
      >
        <FaBell className="text-lg" />
        {notifications.filter(n => !n.read).length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {notifications.filter(n => !n.read).length}
          </span>
        )}
      </motion.button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {activeDropdown === 'notifications' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    Tout effacer
                  </button>
                )}
              </div>

              {/* Tabs */}
              <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
                {['all', 'unread', 'new_film', 'favorite', 'watchlist'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${
                      activeTab === tab
                        ? 'bg-indigo-500 text-white'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {tab === 'all' ? 'Tout' :
                     tab === 'unread' ? 'Non lus' :
                     tab === 'new_film' ? 'Nouveaux films' :
                     tab === 'favorite' ? 'Favoris' :
                     'À voir'}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Aucune notification
                </div>
              ) : (
                <AnimatePresence>
                  {filteredNotifications.map(notification => (
                    <motion.div
                      key={notification.id}
                      variants={notificationVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                        !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {notification.message}
                          </p>
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <FaClock className="mr-1" />
                            {new Date(notification.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex space-x-1">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 text-gray-400 hover:text-green-500 dark:hover:text-green-400"
                            >
                              <FaCheck className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedNotifications; 