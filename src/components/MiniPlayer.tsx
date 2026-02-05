import { motion } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';

interface MiniPlayerProps {
  onExpand: () => void;
}

export default function MiniPlayer({ onExpand }: MiniPlayerProps) {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    playNext,
    progress,
    duration,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  } = usePlayerStore();

  if (!currentTrack) return null;

  const liked = isFavorite(currentTrack.id);
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <motion.div
      className="fixed bottom-20 left-2 right-2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-t-xl overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
          style={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.div
        className="backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
        }}
        whileHover={{ borderColor: 'rgba(212, 175, 55, 0.3)' }}
      >
        <div className="flex items-center p-3 gap-3">
          {/* Thumbnail */}
          <motion.div
            className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExpand}
          >
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
            {isPlaying && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex gap-0.5">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-amber-400 rounded-full"
                      animate={{ height: [8, 16, 8] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Track Info */}
          <div className="flex-1 min-w-0 cursor-pointer" onClick={onExpand}>
            <motion.h4
              className="text-white text-sm font-medium truncate"
              animate={isPlaying ? { opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {currentTrack.title}
            </motion.h4>
            <p className="text-white/50 text-xs truncate">{currentTrack.artist}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* Like Button */}
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => liked ? removeFromFavorites(currentTrack.id) : addToFavorites(currentTrack)}
            >
              <motion.svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={liked ? "#D4AF37" : "none"}
                animate={liked ? { scale: [1, 1.3, 1] } : {}}
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  stroke={liked ? "#D4AF37" : "#888"}
                  strokeWidth="2"
                />
              </motion.svg>
            </motion.button>

            {/* Play/Pause Button */}
            <motion.button
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
            >
              {isPlaying ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000">
                  <path d="M8 5.14V19.14L19 12.14L8 5.14Z" />
                </svg>
              )}
            </motion.button>

            {/* Next Button */}
            <motion.button
              className="w-10 h-10 rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={playNext}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#888">
                <path d="M5 5L15 12L5 19V5Z" />
                <rect x="17" y="5" width="2" height="14" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
