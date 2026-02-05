import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface SettingsStore {
  language: Language;
  notifications: boolean;
  backgroundPlayback: boolean;
  audioQuality: 'low' | 'medium' | 'high';
  setLanguage: (lang: Language) => void;
  setNotifications: (enabled: boolean) => void;
  setBackgroundPlayback: (enabled: boolean) => void;
  setAudioQuality: (quality: 'low' | 'medium' | 'high') => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      language: 'en',
      notifications: true,
      backgroundPlayback: true,
      audioQuality: 'high',
      
      setLanguage: (lang) => {
        set({ language: lang });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      },
      
      setNotifications: (enabled) => set({ notifications: enabled }),
      
      setBackgroundPlayback: (enabled) => set({ backgroundPlayback: enabled }),
      
      setAudioQuality: (quality) => set({ audioQuality: quality }),
    }),
    {
      name: 'cent-settings-storage',
    }
  )
);

// Translation helper
const translations: Record<Language, Record<string, string>> = {
  en: {
    appName: 'Cent',
    tagline: 'Premium Music Experience',
    home: 'Home',
    search: 'Search',
    library: 'Library',
    settings: 'Settings',
    trending: 'Trending Now',
    newReleases: 'New Releases',
    recommendations: 'For You',
    recentlyPlayed: 'Recently Played',
    favorites: 'Favorites',
    searchPlaceholder: 'Search for songs, artists...',
    voiceSearch: 'Voice Search',
    humToSearch: 'Hum or sing to find a song',
    listening: 'Listening...',
    processing: 'Processing...',
    noResults: 'No results found',
    nowPlaying: 'Now Playing',
    language: 'Language',
    notifications: 'Notifications',
    backgroundPlayback: 'Background Playback',
    about: 'About',
    developedBy: 'Developed by Malek',
    audioQuality: 'Audio Quality',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    loading: 'Loading...',
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    aiRecommendations: 'AI Recommendations',
    basedOnListening: 'Based on your listening history',
    browseGenres: 'Browse Genres',
    pop: 'Pop',
    rock: 'Rock',
    hiphop: 'Hip Hop',
    electronic: 'Electronic',
    rnb: 'R&B',
    jazz: 'Jazz',
    classical: 'Classical',
    arabic: 'Arabic',
    version: 'Version 1.0.0',
    english: 'English',
    arabicLang: 'العربية',
  },
  ar: {
    appName: 'سنت',
    tagline: 'تجربة موسيقية مميزة',
    home: 'الرئيسية',
    search: 'البحث',
    library: 'المكتبة',
    settings: 'الإعدادات',
    trending: 'الأكثر رواجاً',
    newReleases: 'إصدارات جديدة',
    recommendations: 'مقترحة لك',
    recentlyPlayed: 'سمعتها مؤخراً',
    favorites: 'المفضلة',
    searchPlaceholder: 'ابحث عن أغاني، فنانين...',
    voiceSearch: 'البحث الصوتي',
    humToSearch: 'دندن أو غنِّ للعثور على أغنية',
    listening: 'جاري الاستماع...',
    processing: 'جاري المعالجة...',
    noResults: 'لا توجد نتائج',
    nowPlaying: 'قيد التشغيل',
    language: 'اللغة',
    notifications: 'الإشعارات',
    backgroundPlayback: 'التشغيل في الخلفية',
    about: 'حول التطبيق',
    developedBy: 'تم التطوير بواسطة Malek',
    audioQuality: 'جودة الصوت',
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'عالية',
    loading: 'جاري التحميل...',
    goodMorning: 'صباح الخير',
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    aiRecommendations: 'اقتراحات ذكية',
    basedOnListening: 'بناءً على استماعك',
    browseGenres: 'تصفح الأنواع',
    pop: 'بوب',
    rock: 'روك',
    hiphop: 'هيب هوب',
    electronic: 'إلكترونية',
    rnb: 'آر أند بي',
    jazz: 'جاز',
    classical: 'كلاسيكية',
    arabic: 'عربية',
    version: 'الإصدار 1.0.0',
    english: 'English',
    arabicLang: 'العربية',
  }
};

export const useTranslation = () => {
  const language = useSettingsStore((state) => state.language);
  
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
  return { t, language };
};
