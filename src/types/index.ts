export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  views?: string;
  videoId: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
  thumbnail: string;
  description?: string;
}

export interface SearchResult {
  tracks: Track[];
  isLoading: boolean;
  error?: string;
}

export type Language = 'en' | 'ar';

export interface UserPreferences {
  language: Language;
  theme: 'dark' | 'light';
  audioQuality: 'low' | 'medium' | 'high';
  notifications: boolean;
}
