import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from './store/playerStore';
import { useLanguageStore } from './store/languageStore';

// Components
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import SettingsScreen from './screens/SettingsScreen';
import MiniPlayer from './components/MiniPlayer';
import FullPlayer from './components/FullPlayer';
import AudioPlayer from './components/AudioPlayer';

type Screen = 'home' | 'search' | 'library' | 'settings';

// Loading Screen Component
const LoadingScreen = () => (
  <motion.div
    className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>

    <motion.div
      className="relative z-10"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    >
      <motion.div
        className="w-24 h-24 rounded-3xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
          boxShadow: '0 20px 60px rgba(212, 175, 55, 0.5)',
        }}
        animate={{
          boxShadow: [
            '0 20px 60px rgba(212, 175, 55, 0.3)',
            '0 30px 80px rgba(212, 175, 55, 0.6)',
            '0 20px 60px rgba(212, 175, 55, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-black text-5xl font-black">C</span>
      </motion.div>
    </motion.div>

    <motion.h1
      className="text-5xl font-black mt-8"
      style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      CENT
    </motion.h1>

    <motion.p
      className="text-amber-500/50 text-sm mt-2 tracking-widest uppercase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Premium Music
    </motion.p>

    <motion.div
      className="flex gap-1 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-8 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </motion.div>
  </motion.div>
);

// Bottom Navigation Component
const BottomNav = ({ active, onChange }: { active: Screen; onChange: (s: Screen) => void }) => {
  const { t } = useLanguageStore();

  const items: { id: Screen; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: t('nav.home'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9L12 2L21 9V20C21 21 20 22 19 22H5C4 22 3 21 3 20V9Z" />
          <path d="M9 22V12H15V22" />
        </svg>
      ),
    },
    {
      id: 'search',
      label: t('nav.search'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21L16.65 16.65" />
        </svg>
      ),
    },
    {
      id: 'library',
      label: t('nav.library'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2 max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <motion.button
              key={item.id}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                isActive ? 'text-amber-400' : 'text-gray-500'
              }`}
              onClick={() => onChange(item.id)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div animate={{ scale: isActive ? 1.1 : 1 }}>
                {item.icon}
              </motion.div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  className="absolute -bottom-0 w-10 h-0.5 bg-amber-400 rounded-full"
                  layoutId="navIndicator"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [showFullPlayer, setShowFullPlayer] = useState(false);
  const { currentTrack } = usePlayerStore();
  const { language } = useLanguageStore();

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'search':
        return <SearchScreen />;
      case 'library':
        return <LibraryScreen />;
      case 'settings':
        return <SettingsScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pb-20"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScreen}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {currentTrack && !showFullPlayer && (
                <MiniPlayer onExpand={() => setShowFullPlayer(true)} />
              )}
            </AnimatePresence>

            <FullPlayer isOpen={showFullPlayer} onClose={() => setShowFullPlayer(false)} />

            <BottomNav active={activeScreen} onChange={setActiveScreen} />

            <AudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
