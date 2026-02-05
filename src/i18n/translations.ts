export const translations = {
  en: {
    // App
    appName: 'Cent',
    tagline: 'Premium Music Experience',
    
    // Navigation
    home: 'Home',
    search: 'Search',
    library: 'Library',
    settings: 'Settings',
    
    // Home
    trending: 'Trending Now',
    newReleases: 'New Releases',
    recommendations: 'For You',
    recentlyPlayed: 'Recently Played',
    basedOnHistory: 'Based on your listening',
    goodMorning: 'Good Morning',
    goodAfternoon: 'Good Afternoon',
    goodEvening: 'Good Evening',
    
    // Search
    searchPlaceholder: 'Search for songs, artists...',
    voiceSearch: 'Voice Search',
    humToSearch: 'Hum or sing to find a song',
    listening: 'Listening...',
    processing: 'Processing...',
    tryAgain: 'Try Again',
    startHumming: 'Start humming or singing...',
    noResults: 'No results found',
    searchHistory: 'Search History',
    trendingSearches: 'Trending Searches',
    
    // Library
    favorites: 'Favorites',
    playlists: 'Playlists',
    downloads: 'Downloads',
    noFavorites: 'No favorites yet',
    addFavorites: 'Add songs to your favorites',
    
    // Player
    nowPlaying: 'Now Playing',
    upNext: 'Up Next',
    lyrics: 'Lyrics',
    related: 'Related',
    
    // Settings
    language: 'Language',
    theme: 'Theme',
    audioQuality: 'Audio Quality',
    notifications: 'Notifications',
    backgroundPlayback: 'Background Playback',
    about: 'About',
    version: 'Version',
    developer: 'Developer',
    developedBy: 'Developed by Malek',
    
    // Quality Options
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    
    // Actions
    play: 'Play',
    pause: 'Pause',
    next: 'Next',
    previous: 'Previous',
    shuffle: 'Shuffle',
    repeat: 'Repeat',
    addToFavorites: 'Add to Favorites',
    removeFromFavorites: 'Remove from Favorites',
    share: 'Share',
    
    // Loading
    loading: 'Loading...',
    loadingMusic: 'Loading music...',
    
    // Errors
    error: 'Error',
    tryAgainLater: 'Please try again later',
    
    // Voice Recognition
    voiceRecognition: 'Voice Recognition',
    tapToSpeak: 'Tap to speak',
    couldNotRecognize: 'Could not recognize the song',
    matchFound: 'Match found!',
    confidence: 'Confidence',
  },
  ar: {
    // App
    appName: 'سنت',
    tagline: 'تجربة موسيقية مميزة',
    
    // Navigation
    home: 'الرئيسية',
    search: 'البحث',
    library: 'المكتبة',
    settings: 'الإعدادات',
    
    // Home
    trending: 'الأكثر رواجاً',
    newReleases: 'إصدارات جديدة',
    recommendations: 'مقترحة لك',
    recentlyPlayed: 'سمعتها مؤخراً',
    basedOnHistory: 'بناءً على استماعك',
    goodMorning: 'صباح الخير',
    goodAfternoon: 'مساء الخير',
    goodEvening: 'مساء الخير',
    
    // Search
    searchPlaceholder: 'ابحث عن أغاني، فنانين...',
    voiceSearch: 'البحث الصوتي',
    humToSearch: 'دندن أو غنِّ للعثور على أغنية',
    listening: 'جاري الاستماع...',
    processing: 'جاري المعالجة...',
    tryAgain: 'حاول مرة أخرى',
    startHumming: 'ابدأ بالدندنة أو الغناء...',
    noResults: 'لا توجد نتائج',
    searchHistory: 'سجل البحث',
    trendingSearches: 'عمليات البحث الرائجة',
    
    // Library
    favorites: 'المفضلة',
    playlists: 'قوائم التشغيل',
    downloads: 'التحميلات',
    noFavorites: 'لا توجد مفضلات',
    addFavorites: 'أضف أغاني إلى المفضلة',
    
    // Player
    nowPlaying: 'قيد التشغيل',
    upNext: 'التالي',
    lyrics: 'الكلمات',
    related: 'ذات صلة',
    
    // Settings
    language: 'اللغة',
    theme: 'المظهر',
    audioQuality: 'جودة الصوت',
    notifications: 'الإشعارات',
    backgroundPlayback: 'التشغيل في الخلفية',
    about: 'حول التطبيق',
    version: 'الإصدار',
    developer: 'المطور',
    developedBy: 'تم التطوير بواسطة Malek',
    
    // Quality Options
    low: 'منخفضة',
    medium: 'متوسطة',
    high: 'عالية',
    
    // Actions
    play: 'تشغيل',
    pause: 'إيقاف',
    next: 'التالي',
    previous: 'السابق',
    shuffle: 'خلط',
    repeat: 'تكرار',
    addToFavorites: 'إضافة للمفضلة',
    removeFromFavorites: 'إزالة من المفضلة',
    share: 'مشاركة',
    
    // Loading
    loading: 'جاري التحميل...',
    loadingMusic: 'جاري تحميل الموسيقى...',
    
    // Errors
    error: 'خطأ',
    tryAgainLater: 'يرجى المحاولة لاحقاً',
    
    // Voice Recognition
    voiceRecognition: 'التعرف الصوتي',
    tapToSpeak: 'انقر للتحدث',
    couldNotRecognize: 'لم نتمكن من التعرف على الأغنية',
    matchFound: 'تم العثور على تطابق!',
    confidence: 'نسبة التطابق',
  }
};

export type TranslationKey = keyof typeof translations.en;
