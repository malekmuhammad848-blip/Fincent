import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { useLanguageStore } from '../store/languageStore';
import { getRecommendations } from '../services/youtubeApi';
import { Track } from '../types';

type TabType = 'favorites' | 'recent' | 'playlists';

const TabButton = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
  <motion.button
    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
      isActive 
        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black' 
        : 'bg-white/10 text-white/70'
    }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);

const TrackListItem = ({ track, index }: { track: Track; index: number }) => {
  const { setCurrentTrack, setQueue, isFavorite, addToFavorites, removeFromFavorites } = usePlayerStore();
  const liked = isFavorite(track.id);

  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', x: 5 }}
      onClick={() => { setCurrentTrack(track); setQueue([track]); }}
    >
      {/* Rank Number */}
      <div className="w-8 text-center">
        <span className="text-white/30 text-sm font-medium group-hover:hidden">{index + 1}</span>
        <motion.div className="hidden group-hover:block">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M8 5.14V19.14L19 12.14L8 5.14Z"/>
          </svg>
        </motion.div>
      </div>

      {/* Thumbnail */}
      <motion.div 
        className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0"
        whileHover={{ scale: 1.05 }}
      >
        <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />
      </motion.div>
      
      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium line-clamp-1">{track.title}</h4>
        <p className="text-white/50 text-sm line-clamp-1">{track.artist}</p>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-3">
        <span className="text-white/30 text-sm hidden sm:block">{track.duration}</span>
        
        <motion.button
          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            liked ? removeFromFavorites(track.id) : addToFavorites(track);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "#D4AF37" : "none"}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={liked ? "#D4AF37" : "#888"} strokeWidth="2"/>
          </svg>
        </motion.button>

        <motion.button
          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="6" r="1.5" fill="#888"/>
            <circle cx="12" cy="12" r="1.5" fill="#888"/>
            <circle cx="12" cy="18" r="1.5" fill="#888"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

const EmptyState = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => (
  <motion.div 
    className="flex flex-col items-center justify-center py-20"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    <motion.div
      className="text-6xl mb-4"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {icon}
    </motion.div>
    <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
    <p className="text-white/50 text-center max-w-xs">{subtitle}</p>
  </motion.div>
);

const PlaylistCard = ({ name, count, gradient }: { name: string; count: number; gradient: string }) => (
  <motion.div
    className="relative h-32 rounded-2xl overflow-hidden cursor-pointer"
    style={{ background: gradient }}
    whileHover={{ scale: 1.03, y: -3 }}
    whileTap={{ scale: 0.97 }}
  >
    <div className="absolute inset-0 p-4 flex flex-col justify-end">
      <h3 className="text-white font-bold text-lg">{name}</h3>
      <p className="text-white/70 text-sm">{count} songs</p>
    </div>
  </motion.div>
);

export default function LibraryScreen() {
  const { t } = useLanguageStore();
  const { favorites, recentlyPlayed } = usePlayerStore();
  const [activeTab, setActiveTab] = useState<TabType>('favorites');
  const [aiRecommendations, setAiRecommendations] = useState<Track[]>([]);

  useEffect(() => {
    // Generate AI recommendations based on listening history
    const generateRecommendations = async () => {
      if (recentlyPlayed.length > 0) {
        const randomTrack = recentlyPlayed[Math.floor(Math.random() * recentlyPlayed.length)];
        const recs = await getRecommendations(randomTrack.artist);
        setAiRecommendations(recs);
      } else {
        const recs = await getRecommendations();
        setAiRecommendations(recs);
      }
    };
    
    generateRecommendations();
  }, [recentlyPlayed]);

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        if (favorites.length === 0) {
          return (
            <EmptyState 
              icon="❤️" 
              title="No liked songs yet" 
              subtitle="Start liking songs and they will appear here"
            />
          );
        }
        return (
          <div className="space-y-1">
            {favorites.map((track, i) => (
              <TrackListItem key={track.id} track={track} index={i} />
            ))}
          </div>
        );

      case 'recent':
        if (recentlyPlayed.length === 0) {
          return (
            <EmptyState 
              icon="🎵" 
              title="No recent activity" 
              subtitle="Songs you play will appear here"
            />
          );
        }
        return (
          <div className="space-y-1">
            {recentlyPlayed.map((track, i) => (
              <TrackListItem key={track.id} track={track} index={i} />
            ))}
          </div>
        );

      case 'playlists':
        return (
          <div className="grid grid-cols-2 gap-3">
            <PlaylistCard 
              name="My Favorites" 
              count={favorites.length}
              gradient="linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)"
            />
            <PlaylistCard 
              name="Recently Played" 
              count={recentlyPlayed.length}
              gradient="linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)"
            />
            <PlaylistCard 
              name="Chill Vibes" 
              count={0}
              gradient="linear-gradient(135deg, #3498DB 0%, #2980B9 100%)"
            />
            <PlaylistCard 
              name="Workout" 
              count={0}
              gradient="linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="px-4 pt-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">{t('library.title')}</h1>
          <motion.button
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19M5 12H19" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <TabButton 
            label={t('library.favorites')} 
            isActive={activeTab === 'favorites'} 
            onClick={() => setActiveTab('favorites')} 
          />
          <TabButton 
            label={t('library.recent')} 
            isActive={activeTab === 'recent'} 
            onClick={() => setActiveTab('recent')} 
          />
          <TabButton 
            label={t('library.playlists')} 
            isActive={activeTab === 'playlists'} 
            onClick={() => setActiveTab('playlists')} 
          />
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-amber-400">{favorites.length}</p>
            <p className="text-xs text-white/50">Liked</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-amber-400">{recentlyPlayed.length}</p>
            <p className="text-xs text-white/50">Played</p>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold text-amber-400">4</p>
            <p className="text-xs text-white/50">Playlists</p>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <motion.section 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                ✨
              </motion.div>
              <h2 className="text-lg font-semibold">{t('home.recommendations')}</h2>
            </div>
            <p className="text-white/50 text-sm mb-4">Based on your listening history</p>
            <div className="space-y-1">
              {aiRecommendations.slice(0, 5).map((track, i) => (
                <TrackListItem key={track.id} track={track} index={i} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
