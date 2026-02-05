import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';

interface FullPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FullPlayer({ isOpen, onClose }: FullPlayerProps) {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    playPrevious,
    progress,
    duration,
    setProgress,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    isShuffled,
    toggleShuffle,
    repeatMode,
    cycleRepeatMode,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  } = usePlayerStore();

  const progressRef = useRef<HTMLDivElement>(null);

  const liked = currentTrack ? isFavorite(currentTrack.id) : false;
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setProgress(percent * duration);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!currentTrack) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 scale-150 blur-3xl opacity-30"
              style={{
                backgroundImage: `url(${currentTrack.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              animate={{ scale: [1.5, 1.6, 1.5] }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/80 to-black" />
          </div>

          <div className="relative h-full flex flex-col px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <motion.button
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </motion.button>

              <div className="text-center">
                <p className="text-white/50 text-xs uppercase tracking-wider">Now Playing</p>
                <p className="text-white text-sm font-medium">From Queue</p>
              </div>

              <motion.button
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="6" r="1.5" fill="#fff" />
                  <circle cx="12" cy="12" r="1.5" fill="#fff" />
                  <circle cx="12" cy="18" r="1.5" fill="#fff" />
                </svg>
              </motion.button>
            </div>

            {/* Artwork */}
            <div className="flex-1 flex items-center justify-center my-8">
              <motion.div
                className="relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                {/* Vinyl Effect */}
                <motion.div
                  className="absolute -inset-4 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900"
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  {/* Vinyl grooves */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 rounded-full border border-white/5"
                      style={{
                        margin: `${(i + 1) * 8}px`,
                      }}
                    />
                  ))}
                  {/* Center hole */}
                  <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-amber-500/20" />
                </motion.div>

                {/* Album Art */}
                <motion.div
                  className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 100px rgba(212, 175, 55, 0.2)',
                  }}
                  animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                  transition={isPlaying ? { duration: 20, repeat: Infinity, ease: 'linear' } : {}}
                >
                  <img
                    src={currentTrack.thumbnail}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Playing indicator */}
                {isPlaying && (
                  <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-amber-500 rounded-full"
                        animate={{ height: [10, 25, 10] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Track Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <motion.h2
                    className="text-white text-2xl font-bold truncate"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    {currentTrack.title}
                  </motion.h2>
                  <motion.p
                    className="text-white/60 text-lg truncate"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {currentTrack.artist}
                  </motion.p>
                </div>
                <motion.button
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => liked ? removeFromFavorites(currentTrack.id) : addToFavorites(currentTrack)}
                >
                  <motion.svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill={liked ? '#D4AF37' : 'none'}
                    animate={liked ? { scale: [1, 1.3, 1] } : {}}
                  >
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      stroke={liked ? '#D4AF37' : '#fff'}
                      strokeWidth="2"
                    />
                  </motion.svg>
                </motion.button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div
                ref={progressRef}
                className="relative h-2 bg-white/20 rounded-full cursor-pointer group"
                onClick={handleProgressClick}
              >
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100"
                  style={{ left: `calc(${progressPercent}% - 8px)` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-white/50 text-xs">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-8">
              {/* Shuffle */}
              <motion.button
                className="w-12 h-12 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleShuffle}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 3H21V8M4 20L21 3M21 16V21H16M15 15L21 21M4 4L9 9"
                    stroke={isShuffled ? '#D4AF37' : '#888'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              {/* Previous */}
              <motion.button
                className="w-14 h-14 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, x: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={playPrevious}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                  <path d="M19 5L9 12L19 19V5Z" />
                  <rect x="5" y="5" width="2" height="14" />
                </svg>
              </motion.button>

              {/* Play/Pause */}
              <motion.button
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
                  boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#000">
                    <path d="M8 5.14V19.14L19 12.14L8 5.14Z" />
                  </svg>
                )}
              </motion.button>

              {/* Next */}
              <motion.button
                className="w-14 h-14 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1, x: 3 }}
                whileTap={{ scale: 0.9 }}
                onClick={playNext}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
                  <path d="M5 5L15 12L5 19V5Z" />
                  <rect x="17" y="5" width="2" height="14" />
                </svg>
              </motion.button>

              {/* Repeat */}
              <motion.button
                className="w-12 h-12 rounded-full flex items-center justify-center relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={cycleRepeatMode}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M17 1L21 5L17 9M3 11V9C3 7.89543 3.89543 7 5 7H21M7 23L3 19L7 15M21 13V15C21 16.1046 20.1046 17 19 17H3"
                    stroke={repeatMode !== 'none' ? '#D4AF37' : '#888'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {repeatMode === 'one' && (
                  <span className="absolute -top-1 -right-1 text-[10px] text-amber-400 font-bold">1</span>
                )}
              </motion.button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center gap-4">
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11 5L6 9H2V15H6L11 19V5Z"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgba(136, 136, 136, 0.2)"
                  />
                  {!isMuted && volume > 0 && (
                    <path
                      d="M15.54 8.46C16.48 9.4 17 10.68 17 12C17 13.32 16.48 14.6 15.54 15.54"
                      stroke="#888"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                  {isMuted && (
                    <path
                      d="M23 9L17 15M17 9L23 15"
                      stroke="#D4AF37"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
              </motion.button>

              <div
                className="relative w-32 h-2 bg-white/20 rounded-full cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  setVolume(Math.round(percent * 100));
                }}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-white/50 rounded-full"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                />
              </div>

              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15M7 10L12 15M12 15L17 10M12 15V3"
                    stroke="#888"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
