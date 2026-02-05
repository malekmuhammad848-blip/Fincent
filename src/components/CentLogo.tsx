import { motion } from 'framer-motion';

interface CentLogoProps {
  size?: 'small' | 'medium' | 'large' | 'hero';
  animated?: boolean;
}

const CentLogo = ({ size = 'medium', animated = true }: CentLogoProps) => {
  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl',
    hero: 'text-7xl md:text-8xl',
  };

  const iconSizes = {
    small: 32,
    medium: 48,
    large: 72,
    hero: 96,
  };

  return (
    <div className="flex flex-col items-center">
      {/* Animated Icon */}
      <motion.div
        className="relative mb-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Outer glow rings */}
        {animated && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                width: iconSizes[size] + 40,
                height: iconSizes[size] + 40,
                left: -20,
                top: -20,
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute rounded-full border border-gold-400/30"
              style={{
                width: iconSizes[size] + 24,
                height: iconSizes[size] + 24,
                left: -12,
                top: -12,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute rounded-full border border-gold-500/20"
              style={{
                width: iconSizes[size] + 40,
                height: iconSizes[size] + 40,
                left: -20,
                top: -20,
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          </>
        )}

        {/* Main icon container */}
        <motion.div
          className="relative rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 flex items-center justify-center shadow-2xl"
          style={{
            width: iconSizes[size],
            height: iconSizes[size],
          }}
          animate={animated ? {
            boxShadow: [
              '0 0 30px rgba(212, 175, 55, 0.3)',
              '0 0 50px rgba(212, 175, 55, 0.5)',
              '0 0 30px rgba(212, 175, 55, 0.3)',
            ],
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {/* Inner shine */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent" />
          
          {/* Letter C */}
          <span 
            className="relative text-black font-black"
            style={{ fontSize: iconSizes[size] * 0.5 }}
          >
            C
          </span>
        </motion.div>
      </motion.div>

      {/* Decorative Cent Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        {/* Background glow */}
        <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-gold-400/30 via-gold-300/40 to-gold-500/30" />
        
        {/* Main text with decorative elements */}
        <div className="relative flex items-center gap-2">
          {/* Left decoration */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-gold-400" />
            <div className="w-2 h-2 rounded-full bg-gold-400" />
          </motion.div>

          {/* Cent text */}
          <h1 className={`${sizeClasses[size]} font-black tracking-tight`}>
            <span className="relative inline-block">
              {/* Shadow layer */}
              <span className="absolute inset-0 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text text-transparent blur-sm">
                Cent
              </span>
              {/* Main text */}
              <span className="relative bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-clip-text text-transparent">
                C
              </span>
              <span className="relative bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
                e
              </span>
              <span className="relative bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">
                n
              </span>
              <span className="relative bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                t
              </span>
            </span>
          </h1>

          {/* Right decoration */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <div className="w-2 h-2 rounded-full bg-gold-400" />
            <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-gold-400" />
          </motion.div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gold-400/70 text-sm mt-1 tracking-widest uppercase"
        >
          Premium Music Experience
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-3"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-400/50 to-gold-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold-400/60" />
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent via-gold-400/50 to-gold-400" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CentLogo;
