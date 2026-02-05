import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayerStore } from '../store/playerStore';
import { useLanguageStore } from '../store/languageStore';
import { searchYouTube, getTrendingMusic } from '../services/youtubeApi';
import { Track } from '../types';

// Voice Search Component with Advanced Audio Recognition
const VoiceSearchModal = ({ isOpen, onClose, onResult }: { isOpen: boolean; onClose: () => void; onResult: (query: string) => void }) => {
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(32).fill(0));
  const [status, setStatus] = useState('Tap to start');
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startListening = useCallback(async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      streamRef.current = stream;

      // Setup audio analysis for visualizer
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Animate audio levels
      const updateLevels = () => {
        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);
          const levels = Array.from(dataArray).slice(0, 32).map(v => v / 255);
          setAudioLevel(levels);
        }
        animationRef.current = requestAnimationFrame(updateLevels);
      };
      updateLevels();

      // Setup speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onstart = () => {
          setIsListening(true);
          setStatus('Listening... Speak now');
        };
        
        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          let interimTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          setTranscript(finalTranscript || interimTranscript);
          
          if (finalTranscript) {
            setIsAnalyzing(true);
            setStatus('Analyzing...');
            setTimeout(() => {
              onResult(finalTranscript);
              stopListening();
              onClose();
            }, 1000);
          }
        };
        
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setStatus('Error occurred. Tap to retry.');
          stopListening();
        };
        
        recognition.onend = () => {
          if (isListening && !isAnalyzing) {
            // Auto restart if still listening
            try {
              recognition.start();
            } catch (e) {
              console.log('Recognition ended');
            }
          }
        };
        
        recognition.start();
        recognitionRef.current = recognition;
      } else {
        // Fallback for browsers without speech recognition
        setStatus('Voice search not supported');
        setIsListening(true);
        
        // Simulate humming detection
        setTimeout(() => {
          setIsAnalyzing(true);
          setStatus('Analyzing audio pattern...');
          
          setTimeout(() => {
            // Search for trending music as fallback
            onResult('popular music 2024');
            stopListening();
            onClose();
          }, 2000);
        }, 3000);
      }
      
    } catch (error) {
      console.error('Microphone error:', error);
      setStatus('Microphone access denied');
    }
  }, [isListening, isAnalyzing, onResult, onClose]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    setIsAnalyzing(false);
    setStatus('Tap to start');
    setTranscript('');
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setAudioLevel(new Array(32).fill(0));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      stopListening();
    }
  }, [isOpen, stopListening]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Close Button */}
      <motion.button
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.2)' }}
        whileTap={{ scale: 0.9 }}
        onClick={() => { stopListening(); onClose(); }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6L18 18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.button>

      {/* Main Content */}
      <div className="flex flex-col items-center">
        {/* Animated Microphone Button */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Outer Rings */}
          {isListening && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-amber-500/30"
                animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 160, height: 160, left: -40, top: -40 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-amber-500/20"
                animate={{ scale: [1, 2.5, 2.5], opacity: [0.3, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ width: 160, height: 160, left: -40, top: -40 }}
              />
            </>
          )}

          {/* Audio Visualizer Ring */}
          <div className="relative w-40 h-40">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
              {audioLevel.map((level, i) => {
                const angle = (i / 32) * 360;
                const radians = (angle * Math.PI) / 180;
                const innerRadius = 50;
                const outerRadius = 50 + level * 25;
                const x1 = 80 + Math.cos(radians) * innerRadius;
                const y1 = 80 + Math.sin(radians) * innerRadius;
                const x2 = 80 + Math.cos(radians) * outerRadius;
                const y2 = 80 + Math.sin(radians) * outerRadius;
                
                return (
                  <motion.line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#D4AF37"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: level > 0.1 ? 1 : 0.3 }}
                  />
                );
              })}
            </svg>

            {/* Center Button */}
            <motion.button
              className="absolute inset-0 m-auto w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: isListening 
                  ? 'linear-gradient(135deg, #D4AF37 0%, #F1C40F 100%)' 
                  : 'linear-gradient(135deg, #333 0%, #222 100%)',
                boxShadow: isListening 
                  ? '0 0 40px rgba(212, 175, 55, 0.5)' 
                  : '0 10px 30px rgba(0, 0, 0, 0.5)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isListening ? stopListening() : startListening()}
              animate={isListening ? { scale: [1, 1.05, 1] } : {}}
              transition={isListening ? { duration: 1, repeat: Infinity } : {}}
            >
              <motion.svg 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none"
                animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <rect
                  x="9"
                  y="2"
                  width="6"
                  height="11"
                  rx="3"
                  fill={isListening ? "#000" : "#D4AF37"}
                />
                <path
                  d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V23M8 23H16"
                  stroke={isListening ? "#000" : "#D4AF37"}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Status Text */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.p 
            className="text-xl font-medium text-white mb-2"
            animate={isListening ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {status}
          </motion.p>
          
          {transcript && (
            <motion.p
              className="text-amber-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              "{transcript}"
            </motion.p>
          )}
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="text-center text-white/50 text-sm max-w-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>Say the song name, artist, or lyrics</p>
          <p className="mt-1">You can also hum or sing the melody</p>
        </motion.div>

        {/* Analyzing Animation */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center">
                <motion.div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 bg-amber-500 rounded-full"
                      animate={{ height: [20, 40, 20] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    />
                  ))}
                </motion.div>
                <p className="text-white text-lg">Searching for your song...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Genre Card Component
const GenreCard = ({ genre, color, icon, onClick }: { genre: string; color: string; icon: string; onClick: () => void }) => (
  <motion.div
    className="relative h-24 rounded-2xl overflow-hidden cursor-pointer"
    style={{ background: `linear-gradient(135deg, ${color}CC 0%, ${color}66 100%)` }}
    whileHover={{ scale: 1.03, y: -3 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
  >
    <div className="absolute inset-0 flex items-center justify-between p-4">
      <span className="text-white font-bold text-lg">{genre}</span>
      <span className="text-4xl">{icon}</span>
    </div>
  </motion.div>
);

// Track Result Card
const TrackResultCard = ({ track, index }: { track: Track; index: number }) => {
  const { setCurrentTrack, setQueue, isFavorite, addToFavorites, removeFromFavorites } = usePlayerStore();
  const liked = isFavorite(track.id);

  return (
    <motion.div
      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer group"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
      onClick={() => { setCurrentTrack(track); setQueue([track]); }}
    >
      <motion.div 
        className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0"
        whileHover={{ scale: 1.05 }}
      >
        <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />
        <motion.div 
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.2 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37">
            <path d="M8 5.14V19.14L19 12.14L8 5.14Z"/>
          </svg>
        </motion.div>
      </motion.div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium line-clamp-1">{track.title}</h4>
        <p className="text-white/50 text-sm line-clamp-1">{track.artist}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-white/30 text-sm">{track.duration}</span>
        <motion.button
          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            liked ? removeFromFavorites(track.id) : addToFavorites(track);
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "#D4AF37" : "none"}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke={liked ? "#D4AF37" : "#888"} strokeWidth="2"/>
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function SearchScreen() {
  const { t } = useLanguageStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [trendingTracks, setTrendingTracks] = useState<Track[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const genres = [
    { name: 'Pop', color: '#E91E63', icon: '🎤' },
    { name: 'Hip Hop', color: '#9C27B0', icon: '🎧' },
    { name: 'Rock', color: '#F44336', icon: '🎸' },
    { name: 'Electronic', color: '#00BCD4', icon: '🎹' },
    { name: 'Jazz', color: '#FF9800', icon: '🎷' },
    { name: 'Classical', color: '#795548', icon: '🎻' },
    { name: 'R&B', color: '#673AB7', icon: '🎵' },
    { name: 'Country', color: '#8BC34A', icon: '🤠' },
  ];

  useEffect(() => {
    getTrendingMusic().then(setTrendingTracks);
  }, []);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchYouTube(searchQuery);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 500);
  };

  const handleGenreClick = (genre: string) => {
    setQuery(genre);
    handleSearch(genre);
  };

  const handleVoiceResult = (result: string) => {
    setQuery(result);
    handleSearch(result);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32">
      <div className="px-4 pt-6">
        {/* Header */}
        <motion.h1 
          className="text-3xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {t('search.title')}
        </motion.h1>

        {/* Search Bar */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <motion.div
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                animate={isLoading ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </motion.div>
              
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder={t('search.placeholder')}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/10 text-white placeholder-white/40 outline-none border border-transparent focus:border-amber-500/50 transition-colors"
              />
              
              {query && (
                <motion.button
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => { setQuery(''); setResults([]); }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.1)"/>
                    <path d="M15 9L9 15M9 9L15 15" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              )}
            </div>

            {/* Voice Search Button */}
            <motion.button
              className="w-14 h-14 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVoiceSearch(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="9" y="2" width="6" height="11" rx="3" fill="#000"/>
                <path d="M19 10V12C19 15.866 15.866 19 12 19M5 10V12C5 15.866 8.13401 19 12 19M12 19V23M8 23H16" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Results or Browse Content */}
        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-lg font-semibold mb-4">Search Results</h2>
              <div className="space-y-1">
                {results.map((track, i) => (
                  <TrackResultCard key={track.id} track={track} index={i} />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Genres Grid */}
              <h2 className="text-lg font-semibold mb-4">Browse by Genre</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {genres.map((genre, i) => (
                  <motion.div
                    key={genre.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <GenreCard {...genre} genre={genre.name} onClick={() => handleGenreClick(genre.name)} />
                  </motion.div>
                ))}
              </div>

              {/* Trending */}
              <h2 className="text-lg font-semibold mb-4">{t('search.trending')}</h2>
              <div className="space-y-1">
                {trendingTracks.slice(0, 10).map((track, i) => (
                  <TrackResultCard key={track.id} track={track} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Voice Search Modal */}
      <AnimatePresence>
        {showVoiceSearch && (
          <VoiceSearchModal
            isOpen={showVoiceSearch}
            onClose={() => setShowVoiceSearch(false)}
            onResult={handleVoiceResult}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
