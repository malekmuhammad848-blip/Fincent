import { motion } from 'framer-motion';
import { Home, Search, Library, Settings } from 'lucide-react';
import { useTranslation } from '../store/settingsStore';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', icon: Home, label: t('home') },
    { id: 'search', icon: Search, label: t('search') },
    { id: 'library', icon: Library, label: t('library') },
    { id: 'settings', icon: Settings, label: t('settings') },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-t border-gold-500/20" />
      
      <div className="relative flex items-center justify-around py-2 px-4 safe-area-bottom">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center py-2 px-4 min-w-[64px]"
              whileTap={{ scale: 0.9 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Icon container */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className={`relative p-2 rounded-xl ${
                  isActive ? 'bg-gold-500/10' : ''
                }`}
              >
                <Icon
                  size={24}
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-gold-400' : 'text-gray-500'
                  }`}
                />
                
                {/* Glow effect */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gold-400/20 rounded-xl blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}
              </motion.div>
              
              {/* Label */}
              <motion.span
                animate={{
                  opacity: isActive ? 1 : 0.5,
                  y: isActive ? 0 : 2,
                }}
                className={`text-xs mt-1 font-medium ${
                  isActive ? 'text-gold-400' : 'text-gray-500'
                }`}
              >
                {tab.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
