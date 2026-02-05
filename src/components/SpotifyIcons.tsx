import { motion } from 'framer-motion';

interface IconProps {
  size?: number;
  color?: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const iconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.15, rotate: [0, -5, 5, 0] },
  tap: { scale: 0.9 },
  active: { scale: 1.1 }
};

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  active: { opacity: 1, scale: 1.2 }
};

export const HomeIcon = ({ size = 24, isActive, onClick, className }: IconProps) => (
  <motion.div
    className={`relative cursor-pointer ${className}`}
    variants={iconVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    animate={isActive ? "active" : "initial"}
    onClick={onClick}
  >
    {isActive && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-xl"
        variants={glowVariants}
        initial="initial"
        animate="active"
      />
    )}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? "rgba(212, 175, 55, 0.2)" : "none"}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d="M9 21V12H15V21"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </svg>
  </motion.div>
);

export const SearchIcon = ({ size = 24, isActive, onClick, className }: IconProps) => (
  <motion.div
    className={`relative cursor-pointer ${className}`}
    variants={iconVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    animate={isActive ? "active" : "initial"}
    onClick={onClick}
  >
    {isActive && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-xl"
        variants={glowVariants}
        initial="initial"
        animate="active"
      />
    )}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.circle
        cx="11"
        cy="11"
        r="7"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        fill={isActive ? "rgba(212, 175, 55, 0.1)" : "none"}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
      <motion.path
        d="M21 21L16.5 16.5"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
    </svg>
  </motion.div>
);

export const LibraryIcon = ({ size = 24, isActive, onClick, className }: IconProps) => (
  <motion.div
    className={`relative cursor-pointer ${className}`}
    variants={iconVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    animate={isActive ? "active" : "initial"}
    onClick={onClick}
  >
    {isActive && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-xl"
        variants={glowVariants}
        initial="initial"
        animate="active"
      />
    )}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={4 + i * 6}
          y="4"
          width="4"
          height="16"
          rx="1"
          stroke={isActive ? "#D4AF37" : "#888"}
          strokeWidth="1.5"
          fill={isActive ? `rgba(212, 175, 55, ${0.3 - i * 0.1})` : "none"}
          initial={{ scaleY: 0, originY: 1 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        />
      ))}
    </svg>
  </motion.div>
);

export const SettingsIcon = ({ size = 24, isActive, onClick, className }: IconProps) => (
  <motion.div
    className={`relative cursor-pointer ${className}`}
    variants={iconVariants}
    initial="initial"
    whileHover="hover"
    whileTap="tap"
    animate={isActive ? "active" : "initial"}
    onClick={onClick}
  >
    {isActive && (
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-xl"
        variants={glowVariants}
        initial="initial"
        animate="active"
      />
    )}
    <motion.svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none"
      animate={{ rotate: isActive ? 90 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        fill={isActive ? "rgba(212, 175, 55, 0.2)" : "none"}
      />
      <motion.path
        d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.svg>
  </motion.div>
);

export const PlayIcon = ({ size = 24, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M8 5.14V19.14L19 12.14L8 5.14Z"
        fill="#D4AF37"
        stroke="#D4AF37"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </svg>
  </motion.div>
);

export const PauseIcon = ({ size = 24, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.rect
        x="6"
        y="4"
        width="4"
        height="16"
        rx="1"
        fill="#D4AF37"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.rect
        x="14"
        y="4"
        width="4"
        height="16"
        rx="1"
        fill="#D4AF37"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      />
    </svg>
  </motion.div>
);

export const SkipNextIcon = ({ size = 24, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1, x: 3 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M5 5L15 12L5 19V5Z"
        fill="#888"
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      />
      <motion.rect
        x="17"
        y="5"
        width="2"
        height="14"
        fill="#888"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.1 }}
      />
    </svg>
  </motion.div>
);

export const SkipPrevIcon = ({ size = 24, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1, x: -3 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M19 5L9 12L19 19V5Z"
        fill="#888"
        initial={{ x: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      />
      <motion.rect
        x="5"
        y="5"
        width="2"
        height="14"
        fill="#888"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.1 }}
      />
    </svg>
  </motion.div>
);

export const HeartIcon = ({ size = 24, isActive, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.8 }}
    onClick={onClick}
  >
    <motion.svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        fill={isActive ? "#D4AF37" : "none"}
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.svg>
  </motion.div>
);

export const ShuffleIcon = ({ size = 24, isActive, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M16 3H21V8M4 20L21 3M21 16V21H16M15 15L21 21M4 4L9 9"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    </svg>
  </motion.div>
);

export const RepeatIcon = ({ size = 24, mode = 'none', onClick, className }: IconProps & { mode?: 'none' | 'one' | 'all' }) => (
  <motion.div
    className={`cursor-pointer relative ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M17 1L21 5L17 9M3 11V9C3 7.89543 3.89543 7 5 7H21M7 23L3 19L7 15M21 13V15C21 16.1046 20.1046 17 19 17H3"
        stroke={mode !== 'none' ? "#D4AF37" : "#888"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {mode === 'one' && (
      <motion.span
        className="absolute -top-1 -right-1 text-[8px] text-amber-400 font-bold"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        1
      </motion.span>
    )}
  </motion.div>
);

export const VolumeIcon = ({ size = 24, level = 80, isMuted, onClick, className }: IconProps & { level?: number; isMuted?: boolean }) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke="#888"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="rgba(136, 136, 136, 0.2)"
      />
      {!isMuted && level > 0 && (
        <motion.path
          d="M15.54 8.46C16.4774 9.39764 17.004 10.6692 17.004 11.995C17.004 13.3208 16.4774 14.5924 15.54 15.53"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: level > 30 ? 1 : 0 }}
        />
      )}
      {!isMuted && level > 50 && (
        <motion.path
          d="M18.07 5.93C19.9447 7.80528 20.9979 10.3478 20.9979 13C20.9979 15.6522 19.9447 18.1947 18.07 20.07"
          stroke="#888"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
        />
      )}
      {isMuted && (
        <motion.path
          d="M23 9L17 15M17 9L23 15"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      )}
    </svg>
  </motion.div>
);

export const MicIcon = ({ size = 24, isActive, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
    transition={{ repeat: isActive ? Infinity : 0, duration: 1 }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.rect
        x="9"
        y="2"
        width="6"
        height="11"
        rx="3"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        fill={isActive ? "rgba(212, 175, 55, 0.3)" : "none"}
      />
      <motion.path
        d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V23M8 23H16"
        stroke={isActive ? "#D4AF37" : "#888"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {isActive && (
        <>
          <motion.circle
            cx="12"
            cy="7"
            r="1"
            fill="#D4AF37"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
          />
        </>
      )}
    </svg>
  </motion.div>
);

export const ChevronDownIcon = ({ size = 24, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1, y: 2 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M6 9L12 15L18 9"
        stroke="#888"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ y: -5 }}
        animate={{ y: 0 }}
      />
    </svg>
  </motion.div>
);

export const MoreIcon = ({ size = 24, onClick, className }: IconProps) => (
  <motion.div
    className={`cursor-pointer ${className}`}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {[6, 12, 18].map((cy, i) => (
        <motion.circle
          key={i}
          cx="12"
          cy={cy}
          r="1.5"
          fill="#888"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </svg>
  </motion.div>
);
