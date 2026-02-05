import { Track } from '../types';
import { searchYouTube } from './youtubeApi';

interface ListeningHistory {
  track: Track;
  playCount: number;
  lastPlayed: number;
}

// AI Recommendation Engine
class AIRecommendationEngine {
  private listeningHistory: Map<string, ListeningHistory> = new Map();
  private genreKeywords: Record<string, string[]> = {
    pop: ['pop', 'taylor swift', 'ed sheeran', 'ariana grande', 'dua lipa'],
    rock: ['rock', 'queen', 'ac/dc', 'metallica', 'nirvana'],
    hiphop: ['hip hop', 'rap', 'drake', 'kendrick lamar', 'eminem'],
    electronic: ['edm', 'electronic', 'avicii', 'martin garrix', 'deadmau5'],
    rnb: ['r&b', 'the weeknd', 'bruno mars', 'usher', 'beyonce'],
    jazz: ['jazz', 'miles davis', 'john coltrane', 'smooth jazz'],
    classical: ['classical', 'beethoven', 'mozart', 'piano classical'],
    arabic: ['arabic music', 'fairuz', 'nancy ajram', 'amr diab'],
  };

  // Track when user plays a song
  trackPlay(track: Track): void {
    const existing = this.listeningHistory.get(track.id);
    if (existing) {
      existing.playCount++;
      existing.lastPlayed = Date.now();
    } else {
      this.listeningHistory.set(track.id, {
        track,
        playCount: 1,
        lastPlayed: Date.now(),
      });
    }
    this.saveHistory();
  }

  // Analyze user preferences based on listening history
  private analyzePreferences(): { artists: string[]; genres: string[]; keywords: string[] } {
    const artists: Map<string, number> = new Map();
    const keywords: string[] = [];
    const detectedGenres: Set<string> = new Set();

    this.listeningHistory.forEach((history) => {
      const { track, playCount } = history;
      
      // Count artist plays
      const currentCount = artists.get(track.artist) || 0;
      artists.set(track.artist, currentCount + playCount);
      
      // Extract keywords from title
      const titleWords = track.title.toLowerCase().split(/\s+/);
      keywords.push(...titleWords.filter(w => w.length > 3));
      
      // Detect genres based on keywords
      Object.entries(this.genreKeywords).forEach(([genre, genreWords]) => {
        const titleLower = track.title.toLowerCase();
        const artistLower = track.artist.toLowerCase();
        if (genreWords.some(kw => titleLower.includes(kw) || artistLower.includes(kw))) {
          detectedGenres.add(genre);
        }
      });
    });

    // Sort artists by play count
    const topArtists = Array.from(artists.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([artist]) => artist);

    return {
      artists: topArtists,
      genres: Array.from(detectedGenres),
      keywords: [...new Set(keywords)].slice(0, 10),
    };
  }

  // Generate smart recommendations
  async getRecommendations(): Promise<{ tracks: Track[]; reason: string }[]> {
    const preferences = this.analyzePreferences();
    const recommendations: { tracks: Track[]; reason: string }[] = [];

    // If no history, return trending
    if (this.listeningHistory.size === 0) {
      const trending = await searchYouTube('trending music 2024');
      return [{ tracks: trending.slice(0, 6), reason: 'Trending Now' }];
    }

    // Recommend based on top artists
    if (preferences.artists.length > 0) {
      const topArtist = preferences.artists[0];
      const artistTracks = await searchYouTube(`${topArtist} best songs`);
      if (artistTracks.length > 0) {
        recommendations.push({
          tracks: artistTracks.slice(0, 6),
          reason: `Because you listen to ${topArtist}`,
        });
      }
    }

    // Recommend based on detected genres
    if (preferences.genres.length > 0) {
      const topGenre = preferences.genres[0];
      const genreTracks = await searchYouTube(`best ${topGenre} music 2024`);
      if (genreTracks.length > 0) {
        recommendations.push({
          tracks: genreTracks.slice(0, 6),
          reason: `${topGenre.charAt(0).toUpperCase() + topGenre.slice(1)} picks for you`,
        });
      }
    }

    // Mix recommendation - combine preferences
    if (preferences.artists.length > 1) {
      const mixArtist = preferences.artists[1];
      const mixTracks = await searchYouTube(`${mixArtist} similar artists`);
      if (mixTracks.length > 0) {
        recommendations.push({
          tracks: mixTracks.slice(0, 6),
          reason: `Artists similar to ${mixArtist}`,
        });
      }
    }

    // Discover new music
    const discoverTracks = await searchYouTube('new music releases 2024');
    if (discoverTracks.length > 0) {
      recommendations.push({
        tracks: discoverTracks.slice(0, 6),
        reason: 'Discover something new',
      });
    }

    return recommendations;
  }

  // Get recently played tracks
  getRecentlyPlayed(): Track[] {
    return Array.from(this.listeningHistory.values())
      .sort((a, b) => b.lastPlayed - a.lastPlayed)
      .slice(0, 10)
      .map((h) => h.track);
  }

  // Get most played tracks
  getMostPlayed(): Track[] {
    return Array.from(this.listeningHistory.values())
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, 10)
      .map((h) => h.track);
  }

  // Save history to localStorage
  private saveHistory(): void {
    const data = Array.from(this.listeningHistory.entries());
    localStorage.setItem('cent-listening-history', JSON.stringify(data));
  }

  // Load history from localStorage
  loadHistory(): void {
    const data = localStorage.getItem('cent-listening-history');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.listeningHistory = new Map(parsed);
      } catch (e) {
        console.error('Failed to load listening history:', e);
      }
    }
  }

  // Clear history
  clearHistory(): void {
    this.listeningHistory.clear();
    localStorage.removeItem('cent-listening-history');
  }
}

export const aiEngine = new AIRecommendationEngine();

// Initialize on load
aiEngine.loadHistory();
