import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '../store/languageStore';
import { Language } from '../types';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  trailing?: React.ReactNode;
}

const SettingItem = ({ icon, title, subtitle, onClick, trailing }: SettingItemProps) => (
  <motion.div
    className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer"
    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', x: 5 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-amber-400">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-white font-medium">{title}</h3>
      {subtitle && <p className="text-white/50 text-sm">{subtitle}</p>}
    </div>
    {trailing || (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M9 6L15 12L9 18" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </motion.div>
);

const ToggleSwitch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
  <motion.div
    className={`w-12 h-7 rounded-full p-1 cursor-pointer ${isOn ? 'bg-amber-500' : 'bg-white/20'}`}
    onClick={onToggle}
  >
    <motion.div
      className="w-5 h-5 rounded-full bg-white shadow"
      animate={{ x: isOn ? 20 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
  </motion.div>
);

const LanguageModal = ({ isOpen, onClose, currentLanguage, onSelect }: { 
  isOpen: boolean; 
  onClose: () => void; 
  currentLanguage: Language;
  onSelect: (lang: Language) => void;
}) => {
  if (!isOpen) return null;

  const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md bg-zinc-900 rounded-t-3xl p-6"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: "spring", damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6" />
        
        <h2 className="text-xl font-bold text-white mb-6">Select Language</h2>
        
        <div className="space-y-2">
          {languages.map((lang) => (
            <motion.div
              key={lang.code}
              className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer ${
                currentLanguage === lang.code ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-white/5'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { onSelect(lang.code); onClose(); }}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex-1">
                <p className="text-white font-medium">{lang.name}</p>
                <p className="text-white/50 text-sm">{lang.nativeName}</p>
              </div>
              {currentLanguage === lang.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#D4AF37"/>
                    <path d="M8 12L11 15L16 9" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.button
          className="w-full mt-6 py-4 rounded-xl bg-white/10 text-white font-medium"
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const AboutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-sm bg-zinc-900 rounded-3xl p-8 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Logo */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
            boxShadow: '0 10px 40px rgba(212, 175, 55, 0.4)',
          }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V5l12-2v13" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" fill="#000"/>
            <circle cx="18" cy="16" r="3" fill="#000"/>
          </svg>
        </motion.div>
        
        {/* App Name */}
        <motion.h1
          className="text-3xl font-black mb-2"
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          CENT
        </motion.h1>
        
        <p className="text-white/50 text-sm mb-6">Premium Music Experience</p>
        
        {/* Version */}
        <div className="bg-white/5 rounded-xl p-4 mb-6">
          <p className="text-white/50 text-sm">Version</p>
          <p className="text-white font-medium">1.0.0</p>
        </div>
        
        {/* Developer */}
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-xl p-4 border border-amber-500/20">
          <p className="text-white/50 text-sm mb-1">Developed by</p>
          <motion.p 
            className="text-xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Malek
          </motion.p>
        </div>
        
        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          {['github', 'twitter', 'linkedin'].map((social) => (
            <motion.div
              key={social}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-white/50 text-sm capitalize">{social[0].toUpperCase()}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Close Button */}
        <motion.button
          className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default function SettingsScreen() {
  const { t, language, setLanguage } = useLanguageStore();
  const [notifications, setNotifications] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [audioQuality, setAudioQuality] = useState<'low' | 'medium' | 'high'>('high');

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotifications(true);
        new Notification('Cent Music', {
          body: 'Notifications enabled successfully!',
          icon: '/icon-192.png',
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="px-4 pt-6">
        {/* Header */}
        <motion.h1 
          className="text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('settings.title')}
        </motion.h1>

        {/* Profile Card */}
        <motion.div
          className="relative rounded-3xl overflow-hidden mb-8 p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(241, 196, 15, 0.1) 100%)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
              }}
              whileHover={{ rotate: [0, -10, 10, 0] }}
            >
              👤
            </motion.div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">Premium User</h2>
              <p className="text-amber-400 text-sm">Unlimited streaming</p>
            </div>
            <motion.div
              className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/50"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-amber-400 text-xs font-semibold">PRO</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <motion.div
          className="space-y-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-white/50 text-sm font-medium px-4 mb-2">PREFERENCES</h2>
          
          <SettingItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12H22M12 2C14.5 4.5 16 8 16 12C16 16 14.5 19.5 12 22C9.5 19.5 8 16 8 12C8 8 9.5 4.5 12 2Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title={t('settings.language')}
            subtitle={language === 'en' ? 'English' : 'العربية'}
            onClick={() => setShowLanguageModal(true)}
          />
          
          <SettingItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.54 8.46C16.48 9.4 17 10.68 17 12C17 13.32 16.48 14.6 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18.07 5.93C19.94 7.8 21 10.35 21 13C21 15.65 19.94 18.2 18.07 20.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            title={t('settings.audio')}
            subtitle={audioQuality.charAt(0).toUpperCase() + audioQuality.slice(1)}
            onClick={() => {
              const qualities: ('low' | 'medium' | 'high')[] = ['low', 'medium', 'high'];
              const currentIndex = qualities.indexOf(audioQuality);
              setAudioQuality(qualities[(currentIndex + 1) % 3]);
            }}
          />
          
          <SettingItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 8C18 6.4 16.6 5 15 5C14.4 5 13.8 5.2 13.3 5.5L6 10V14L13.3 18.5C13.8 18.8 14.4 19 15 19C16.6 19 18 17.6 18 16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 10V14C6 15.1 5.1 16 4 16H3V8H4C5.1 8 6 8.9 6 10Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            }
            title={t('settings.notifications')}
            subtitle={notifications ? 'Enabled' : 'Disabled'}
            trailing={
              <ToggleSwitch 
                isOn={notifications} 
                onToggle={() => {
                  if (!notifications) {
                    requestNotificationPermission();
                  } else {
                    setNotifications(false);
                  }
                }} 
              />
            }
          />
        </motion.div>

        {/* About Section */}
        <motion.div
          className="space-y-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-white/50 text-sm font-medium px-4 mb-2">ABOUT</h2>
          
          <SettingItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            }
            title={t('settings.about')}
            subtitle="Cent Music v1.0.0"
            onClick={() => setShowAboutModal(true)}
          />
          
          <SettingItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title={t('settings.privacy')}
          />
          
          <SettingItem
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title={t('settings.terms')}
          />
        </motion.div>

        {/* Developer Credit */}
        <motion.div
          className="text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-white/30 text-sm">Made with ❤️ by</p>
          <motion.p 
            className="text-lg font-bold mt-1"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Malek
          </motion.p>
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showLanguageModal && (
          <LanguageModal
            isOpen={showLanguageModal}
            onClose={() => setShowLanguageModal(false)}
            currentLanguage={language}
            onSelect={setLanguage}
          />
        )}
        {showAboutModal && (
          <AboutModal
            isOpen={showAboutModal}
            onClose={() => setShowAboutModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
