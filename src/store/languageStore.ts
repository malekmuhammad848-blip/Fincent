import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '../types';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.search': 'Search',
    'nav.library': 'Library',
    'nav.settings': 'Settings',
    
    // Home
    'home.greeting.morning': 'Good Morning',
    'home.greeting.afternoon': 'Good Afternoon',
    'home.greeting.evening': 'Good Evening',
    'home.trending': 'Trending Now',
    'home.newReleases': 'New Releases',
    'home.recentlyPlayed': 'Recently Played',
    'home.recommendations': 'Made For You',
    'home.featured': 'Featured',
    'home.topCharts': 'Top Charts',
    'home.genres': 'Browse by Genre',
    
    // Search
    'search.title': 'Search',
    'search.placeholder': 'What do you want to listen to?',
    'search.voice': 'Voice Search',
    'search.listening': 'Listening...',
    'search.analyzing': 'Analyzing...',
    'search.noResults': 'No results found',
    'search.recent': 'Recent Searches',
    'search.trending': 'Trending Searches',
    
    // Library
    'library.title': 'Your Library',
    'library.favorites': 'Liked Songs',
    'library.playlists': 'Playlists',
    'library.recent': 'Recently Played',
    'library.downloads': 'Downloads',
    'library.empty': 'Your library is empty',
    
    // Player
    'player.queue': 'Queue',
    'player.lyrics': 'Lyrics',
    'player.related': 'Related Tracks',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.audio': 'Audio Quality',
    'settings.notifications': 'Notifications',
    'settings.about': 'About',
    'settings.privacy': 'Privacy Policy',
    'settings.terms': 'Terms of Service',
    'settings.version': 'Version',
    'settings.developer': 'Developed by',
    
    // Common
    'common.play': 'Play',
    'common.pause': 'Pause',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.shuffle': 'Shuffle',
    'common.repeat': 'Repeat',
    'common.like': 'Like',
    'common.share': 'Share',
    'common.download': 'Download',
    'common.addToPlaylist': 'Add to Playlist',
    'common.viewAll': 'View All',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.search': 'البحث',
    'nav.library': 'مكتبتي',
    'nav.settings': 'الإعدادات',
    
    // Home
    'home.greeting.morning': 'صباح الخير',
    'home.greeting.afternoon': 'مساء الخير',
    'home.greeting.evening': 'مساء الخير',
    'home.trending': 'الأكثر رواجاً',
    'home.newReleases': 'إصدارات جديدة',
    'home.recentlyPlayed': 'استمعت مؤخراً',
    'home.recommendations': 'مقترحة لك',
    'home.featured': 'مميز',
    'home.topCharts': 'الأكثر استماعاً',
    'home.genres': 'تصفح حسب النوع',
    
    // Search
    'search.title': 'البحث',
    'search.placeholder': 'ماذا تريد أن تسمع؟',
    'search.voice': 'البحث الصوتي',
    'search.listening': 'جاري الاستماع...',
    'search.analyzing': 'جاري التحليل...',
    'search.noResults': 'لا توجد نتائج',
    'search.recent': 'عمليات البحث الأخيرة',
    'search.trending': 'الأكثر بحثاً',
    
    // Library
    'library.title': 'مكتبتك',
    'library.favorites': 'الأغاني المفضلة',
    'library.playlists': 'قوائم التشغيل',
    'library.recent': 'استمعت مؤخراً',
    'library.downloads': 'التنزيلات',
    'library.empty': 'مكتبتك فارغة',
    
    // Player
    'player.queue': 'قائمة الانتظار',
    'player.lyrics': 'كلمات الأغنية',
    'player.related': 'أغاني مشابهة',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.theme': 'المظهر',
    'settings.audio': 'جودة الصوت',
    'settings.notifications': 'الإشعارات',
    'settings.about': 'حول التطبيق',
    'settings.privacy': 'سياسة الخصوصية',
    'settings.terms': 'شروط الخدمة',
    'settings.version': 'الإصدار',
    'settings.developer': 'تم التطوير بواسطة',
    
    // Common
    'common.play': 'تشغيل',
    'common.pause': 'إيقاف',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.shuffle': 'عشوائي',
    'common.repeat': 'تكرار',
    'common.like': 'إعجاب',
    'common.share': 'مشاركة',
    'common.download': 'تنزيل',
    'common.addToPlaylist': 'إضافة لقائمة',
    'common.viewAll': 'عرض الكل',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.delete': 'حذف',
  }
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'en',
      
      setLanguage: (lang) => {
        set({ language: lang });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      },
      
      t: (key) => {
        const { language } = get();
        return translations[language][key] || key;
      },
    }),
    {
      name: 'cent-language-storage',
    }
  )
);
