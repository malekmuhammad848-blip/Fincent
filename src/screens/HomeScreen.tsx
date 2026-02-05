import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { useLanguageStore } from '../store/languageStore';
import { getTrendingMusic, getNewReleases, getRecommendations, getTopCharts } from '../services/youtubeApi';
import { Track } from '../types';

// Animated Cent Logo Component
const CentLogo = () => {
  return (
    <motion.div 
      className="relative flex items-center justify-center py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Outer Glow Rings */}
      <motion.div
        className="absolute w-40 h-40 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(212, 175, 55, 0.3), transparent, rgba(241, 196, 15, 0.3), transparent)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: 'conic-gradient(from 180deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main Logo Container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
      >
        {/* Music Icon */}
        <motion.div
          className="relative mb-2"
          animate={{ 
            y: [0, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 50%, #D4AF37 100%)',
              boxShadow: '0 10px 40px rgba(212, 175, 55, 0.5)',
            }}
            animate={{
              boxShadow: [
                '0 10px 40px rgba(212, 175, 55, 0.5)',
                '0 20px 60px rgba(212, 175, 55, 0.7)',
                '0 10px 40px rgba(212, 175, 55, 0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 18V5l12-2v13" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6" cy="18" r="3" fill="#000"/>
              <circle cx="18" cy="16" r="3" fill="#000"/>
            </svg>
          </motion.div>
          
          {/* Sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * 60 * Math.PI / 180) * 40],
                y: [0, Math.sin(i * 60 * Math.PI / 180) * 40],
                opacity: [1, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
        
        {/* CENT Text */}
        <motion.h1 
          className="text-5xl font-black tracking-wider"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 25%, #FFD700 50%, #F1C40F 75%, #D4AF37 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
            fontFamily: "'Playfair Display', serif",
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          CENT
        </motion.h1>
        
        {/* Tagline */}
        <motion.p 
          className="text-xs text-amber-500/60 tracking-[0.3em] uppercase mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Premium Music
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// Track Card Component
const TrackCard = ({ track, index, variant = 'default' }: { track: Track; index: number; variant?: 'default' | 'large' | 'compact' }) => {
  const { setCurrentTrack, setQueue, isFavorite, addToFavorites, removeFromFavorites } = usePlayerStore();
  const [isHovered, setIsHovered] = useState(false);
  const liked = isFavorite(track.id);

  const handlePlay = () => {
    setCurrentTrack(track);
    setQueue([track]);
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      removeFromFavorites(track.id);
    } else {
      addToFavorites(track);
    }
  };

  if (variant === 'large') {
    return (
      <motion.div
        className="relative min-w-[280px] h-[320px] rounded-3xl overflow-hidden cursor-pointer group"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handlePlay}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        >
          <img 
            src={track.thumbnail} 
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        {/* Glassmorphism Card */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-5"
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 10 }}
        >
          <motion.div
            className="backdrop-blur-xl bg-white/10 rounded-2xl p-4 border border-white/10"
            animate={{ 
              backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255, 255, 255, 0.1)',
              borderColor: isHovered ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3 className="text-white font-bold text-lg line-clamp-1 mb-1">{track.title}</h3>
            <p className="text-white/60 text-sm line-clamp-1">{track.artist}</p>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-white/40 text-xs">
                <span>{track.duration}</span>
                <span>•</span>
                <span>{track.views} views</span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleLike}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "#D4AF37" : "none"}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={liked ? "#D4AF37" : "#fff"} strokeWidth="2"/>
                  </svg>
                </motion.button>
                
                <motion.button
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                    <path d="M8 5.14V19.14L19 12.14L8 5.14Z"/>
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Rank Badge */}
        <motion.div
          className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-sm flex items-center justify-center border border-amber-500/30"
          animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
        >
          <span className="text-amber-400 font-bold">#{index + 1}</span>
        </motion.div>
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={{ 
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          x: 5,
        }}
        onClick={handlePlay}
      >
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4AF37">
              <path d="M8 5.14V19.14L19 12.14L8 5.14Z"/>
            </svg>
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-medium line-clamp-1">{track.title}</h4>
          <p className="text-white/40 text-xs line-clamp-1">{track.artist}</p>
        </div>
        
        <span className="text-white/30 text-xs">{track.duration}</span>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      className="relative min-w-[160px] cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
        <motion.img 
          src={track.thumbnail} 
          alt={track.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        />
        
        <motion.div 
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center shadow-xl"
            initial={{ scale: 0 }}
            animate={{ scale: isHovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
              <path d="M8 5.14V19.14L19 12.14L8 5.14Z"/>
            </svg>
          </motion.div>
        </motion.div>
        
        <motion.button
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleLike}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "#D4AF37" : "none"}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={liked ? "#D4AF37" : "#fff"} strokeWidth="2"/>
          </svg>
        </motion.button>
      </div>
      
      <h4 className="text-white text-sm font-medium line-clamp-1 mb-0.5">{track.title}</h4>
      <p className="text-white/40 text-xs line-clamp-1">{track.artist}</p>
    </motion.div>
  );
};

// Section Component
const Section = ({ title, children, onViewAll }: { title: string; children: React.ReactNode; onViewAll?: () => void }) => (
  <motion.section 
    className="mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center justify-between mb-4 px-1">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {onViewAll && (
        <motion.button 
          className="text-amber-500 text-sm font-medium"
          whileHover={{ x: 5 }}
        >
          View All
        </motion.button>
      )}
    </div>
    {children}
  </motion.section>
);

// Quick Play Card
const QuickPlayCard = ({ track, color }: { track: Track; color: string }) => {
  const { setCurrentTrack, setQueue } = usePlayerStore();
  
  return (
    <motion.div
      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer overflow-hidden"
      style={{ backgroundColor: `${color}20` }}
      whileHover={{ backgroundColor: `${color}40`, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        setCurrentTrack(track);
        setQueue([track]);
      }}
    >
      <img src={track.thumbnail} alt={track.title} className="w-12 h-12 rounded object-cover" />
      <span className="text-white text-sm font-medium line-clamp-1 flex-1">{track.title}</span>
    </motion.div>
  );
};

export default function HomeScreen() {
  const { t } = useLanguageStore();
  const { recentlyPlayed } = usePlayerStore();
  const [trending, setTrending] = useState<Track[]>([]);
  const [newReleases, setNewReleases] = useState<Track[]>([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [topCharts, setTopCharts] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t('home.greeting.morning');
    if (hour < 18) return t('home.greeting.afternoon');
    return t('home.greeting.evening');
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [trendingData, newData, recsData, chartsData] = await Promise.all([
          getTrendingMusic(),
          getNewReleases(),
          getRecommendations(),
          getTopCharts(),
        ]);
        
        setTrending(trendingData);
        setNewReleases(newData);
        setRecommendations(recsData);
        setTopCharts(chartsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickPlayColors = ['#D4AF37', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71', '#F39C12'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border-4 border-amber-500/30 border-t-amber-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p 
            className="text-amber-500 mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 px-4 pt-6">
        {/* Logo */}
        <CentLogo />
        
        {/* Greeting */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-2xl font-bold text-white">{getGreeting()}</h2>
          <p className="text-white/50 text-sm">What would you like to listen to?</p>
        </motion.div>

        {/* Quick Play Grid */}
        {recentlyPlayed.length > 0 && (
          <Section title={t('home.recentlyPlayed')}>
            <div className="grid grid-cols-2 gap-3">
              {recentlyPlayed.slice(0, 6).map((track, i) => (
                <QuickPlayCard key={track.id} track={track} color={quickPlayColors[i % quickPlayColors.length]} />
              ))}
            </div>
          </Section>
        )}

        {/* Featured / Top Charts */}
        <Section title={t('home.topCharts')} onViewAll={() => {}}>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {topCharts.slice(0, 5).map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} variant="large" />
            ))}
          </div>
        </Section>

        {/* Trending */}
        <Section title={t('home.trending')} onViewAll={() => {}}>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {trending.slice(0, 10).map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} variant="default" />
            ))}
          </div>
        </Section>

        {/* New Releases */}
        <Section title={t('home.newReleases')} onViewAll={() => {}}>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {newReleases.slice(0, 10).map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} variant="default" />
            ))}
          </div>
        </Section>

        {/* Recommendations */}
        <Section title={t('home.recommendations')} onViewAll={() => {}}>
          <div className="space-y-1">
            {recommendations.slice(0, 8).map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} variant="compact" />
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
