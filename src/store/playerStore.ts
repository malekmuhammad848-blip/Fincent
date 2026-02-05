import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Track } from '../types';

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  progress: number;
  duration: number;
  isShuffled: boolean;
  repeatMode: 'none' | 'one' | 'all';
  favorites: Track[];
  recentlyPlayed: Track[];
  recommendations: Track[];
  
  setCurrentTrack: (track: Track) => void;
  setQueue: (tracks: Track[]) => void;
  addToQueue: (track: Track) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addToFavorites: (track: Track) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToRecentlyPlayed: (track: Track) => void;
  setRecommendations: (tracks: Track[]) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: null,
      queue: [],
      isPlaying: false,
      volume: 80,
      isMuted: false,
      progress: 0,
      duration: 0,
      isShuffled: false,
      repeatMode: 'none',
      favorites: [],
      recentlyPlayed: [],
      recommendations: [],

      setCurrentTrack: (track) => {
        set({ currentTrack: track, isPlaying: true, progress: 0 });
        get().addToRecentlyPlayed(track);
      },

      setQueue: (tracks) => set({ queue: tracks }),
      
      addToQueue: (track) => set((state) => ({ 
        queue: [...state.queue, track] 
      })),

      setIsPlaying: (playing) => set({ isPlaying: playing }),
      
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),

      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),
      
      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      setProgress: (progress) => set({ progress }),
      
      setDuration: (duration) => set({ duration }),

      toggleShuffle: () => set((state) => ({ isShuffled: !state.isShuffled })),
      
      cycleRepeatMode: () => set((state) => ({
        repeatMode: state.repeatMode === 'none' ? 'all' : 
                    state.repeatMode === 'all' ? 'one' : 'none'
      })),

      playNext: () => {
        const { queue, currentTrack, isShuffled, repeatMode } = get();
        if (!currentTrack || queue.length === 0) return;
        
        const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
        let nextIndex: number;
        
        if (repeatMode === 'one') {
          set({ progress: 0 });
          return;
        }
        
        if (isShuffled) {
          nextIndex = Math.floor(Math.random() * queue.length);
        } else {
          nextIndex = currentIndex + 1;
          if (nextIndex >= queue.length) {
            nextIndex = repeatMode === 'all' ? 0 : currentIndex;
          }
        }
        
        if (queue[nextIndex]) {
          get().setCurrentTrack(queue[nextIndex]);
        }
      },

      playPrevious: () => {
        const { queue, currentTrack, progress } = get();
        if (!currentTrack || queue.length === 0) return;
        
        if (progress > 3) {
          set({ progress: 0 });
          return;
        }
        
        const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : queue.length - 1;
        
        if (queue[prevIndex]) {
          get().setCurrentTrack(queue[prevIndex]);
        }
      },

      addToFavorites: (track) => set((state) => {
        if (state.favorites.some(t => t.id === track.id)) return state;
        return { favorites: [track, ...state.favorites] };
      }),

      removeFromFavorites: (id) => set((state) => ({
        favorites: state.favorites.filter(t => t.id !== id)
      })),

      isFavorite: (id) => get().favorites.some(t => t.id === id),

      addToRecentlyPlayed: (track) => set((state) => {
        const filtered = state.recentlyPlayed.filter(t => t.id !== track.id);
        return { recentlyPlayed: [track, ...filtered].slice(0, 50) };
      }),

      setRecommendations: (tracks) => set({ recommendations: tracks }),
    }),
    {
      name: 'cent-player-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        recentlyPlayed: state.recentlyPlayed,
        volume: state.volume,
      }),
    }
  )
);
