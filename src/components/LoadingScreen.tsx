import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-600/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-400 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo container with advanced animations */}
        <motion.div
          className="relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className="absolute -inset-12 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(212, 175, 55, 0.3), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Middle rotating ring */}
          <motion.div
            className="absolute -inset-8 rounded-full border border-gold-400/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            {/* Ring dots */}
            {[0, 90, 180, 270].map((deg) => (
              <motion.div
                key={deg}
                className="absolute w-2 h-2 bg-gold-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${deg}deg) translateX(calc(50% + 28px)) translateY(-50%)`,
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: deg / 360 }}
              />
            ))}
          </motion.div>

          {/* Inner pulsing ring */}
          <motion.div
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-gold-500/20 to-gold-400/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Main logo */}
          <motion.div
            className="relative w-28 h-28 bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden"
            animate={{
              boxShadow: [
                '0 0 30px rgba(212, 175, 55, 0.3)',
                '0 0 60px rgba(212, 175, 55, 0.5)',
                '0 0 30px rgba(212, 175, 55, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            
            {/* Inner gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
            
            {/* Letter C */}
            <motion.span
              className="relative text-5xl font-black text-black"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              C
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Brand name with letter animation */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex items-center justify-center">
            {'Cent'.split('').map((letter, i) => (
              <motion.span
                key={i}
                className="text-5xl font-black bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* Tagline */}
          <motion.p
            className="text-center text-gold-400/50 text-sm mt-2 tracking-[0.3em] uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Premium Music
          </motion.p>
        </motion.div>

        {/* Modern loading indicator */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {/* Waveform loader */}
          <div className="flex items-end gap-1 h-12">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-gradient-to-t from-gold-600 via-gold-400 to-gold-300 rounded-full"
                animate={{
                  height: [8, 32 + Math.sin(i) * 16, 8],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          className="mt-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div
            className="flex gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-gold-400/60 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </motion.div>
          <span className="text-gold-400/40 text-sm ml-2">Loading your music</span>
        </motion.div>
      </div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.3 }}
        transition={{ delay: 2, duration: 1 }}
      />
    </div>
  );
};

export default LoadingScreen;
