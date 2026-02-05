import { motion } from 'framer-motion';
import { Music, Headphones, Disc3, Radio, Sparkles } from 'lucide-react';

interface CentLogo3DProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export default function CentLogo3D({ size = 'large', animated = true }: CentLogo3DProps) {
  const sizes = {
    small: { container: 80, text: 'text-2xl', icon: 16 },
    medium: { container: 120, text: 'text-4xl', icon: 24 },
    large: { container: 200, text: 'text-7xl', icon: 32 }
  };

  const s = sizes[size];

  return (
    <div className="relative flex items-center justify-center" style={{ width: s.container * 1.5, height: s.container * 1.5 }}>
      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
        }}
        animate={animated ? {
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Rotating Rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: s.container + i * 40,
            height: s.container + i * 40,
            borderColor: `rgba(212, 175, 55, ${0.3 - i * 0.08})`,
            borderWidth: 2 - i * 0.5,
          }}
          animate={animated ? {
            rotate: i % 2 === 0 ? 360 : -360,
            scale: [1, 1.02, 1],
          } : {}}
          transition={{
            rotate: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      ))}

      {/* Floating Icons */}
      {animated && (
        <>
          <motion.div
            className="absolute"
            style={{ top: '5%', left: '10%' }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Music size={s.icon} className="text-[#D4AF37] opacity-60" />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ top: '10%', right: '10%' }}
            animate={{
              y: [10, -10, 10],
              x: [5, -5, 5],
              rotate: [0, -10, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Headphones size={s.icon} className="text-[#F1C40F] opacity-60" />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ bottom: '10%', left: '15%' }}
            animate={{
              y: [-5, 15, -5],
              rotate: [0, 360],
            }}
            transition={{ 
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
          >
            <Disc3 size={s.icon} className="text-[#D4AF37] opacity-50" />
          </motion.div>
          <motion.div
            className="absolute"
            style={{ bottom: '15%', right: '15%' }}
            animate={{
              y: [5, -15, 5],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Radio size={s.icon} className="text-[#F1C40F] opacity-50" />
          </motion.div>
        </>
      )}

      {/* Main Logo Container */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        style={{ 
          width: s.container, 
          height: s.container,
          perspective: '1000px',
        }}
        animate={animated ? {
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, -3, 0, 3, 0],
        } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 3D Background Shape */}
        <motion.div
          className="absolute inset-0 rounded-3xl morph-shape"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0.8) 50%, rgba(241,196,15,0.2) 100%)',
            boxShadow: `
              0 0 60px rgba(212,175,55,0.3),
              inset 0 0 60px rgba(212,175,55,0.1),
              0 20px 40px rgba(0,0,0,0.5)
            `,
            border: '2px solid rgba(212,175,55,0.3)',
          }}
          animate={animated ? {
            boxShadow: [
              '0 0 60px rgba(212,175,55,0.3), inset 0 0 60px rgba(212,175,55,0.1), 0 20px 40px rgba(0,0,0,0.5)',
              '0 0 80px rgba(212,175,55,0.5), inset 0 0 80px rgba(212,175,55,0.2), 0 30px 60px rgba(0,0,0,0.6)',
              '0 0 60px rgba(212,175,55,0.3), inset 0 0 60px rgba(212,175,55,0.1), 0 20px 40px rgba(0,0,0,0.5)',
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sparkles */}
        {animated && (
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={s.icon * 0.8} className="text-[#F1C40F]" />
          </motion.div>
        )}

        {/* Main Text */}
        <motion.div
          className={`relative z-10 font-black ${s.text}`}
          style={{
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(135deg, #F1C40F 0%, #D4AF37 25%, #FFF8DC 50%, #D4AF37 75%, #B8960C 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(212,175,55,0.5)',
            letterSpacing: '0.05em',
          }}
          animate={animated ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          Cent
        </motion.div>

        {/* Underline */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1 rounded-full"
          style={{
            width: '60%',
            background: 'linear-gradient(90deg, transparent, #D4AF37, #F1C40F, #D4AF37, transparent)',
          }}
          animate={animated ? {
            scaleX: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Subtitle */}
      {size === 'large' && (
        <motion.p
          className="absolute -bottom-8 text-sm tracking-[0.3em] uppercase"
          style={{
            background: 'linear-gradient(90deg, #D4AF37, #F1C40F)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Premium Music
        </motion.p>
      )}
    </div>
  );
}
