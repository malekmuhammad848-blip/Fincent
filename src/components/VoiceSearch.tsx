import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, X, Search, Music, Loader2, Wand2, AudioWaveform } from 'lucide-react';
import { searchYouTube } from '../services/youtubeApi';
import { Track } from '../types';

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onResults: (tracks: Track[]) => void;
}

export default function VoiceSearch({ isOpen, onClose, onResults }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'analyzing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [audioLevel, setAudioLevel] = useState<number[]>(new Array(32).fill(0.1));
  
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';
        recognitionRef.current.maxAlternatives = 5;
        
        recognitionRef.current.onresult = (event: any) => {
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
        };
        
        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error !== 'no-speech') {
            setErrorMessage(`Recognition error: ${event.error}`);
            setStatus('error');
          }
        };
        
        recognitionRef.current.onend = () => {
          if (isListening) {
            // Auto-restart if still supposed to be listening
            try {
              recognitionRef.current?.start();
            } catch (e) {
              console.log('Recognition ended');
            }
          }
        };
      }
    }
    
    return () => {
      stopListening();
    };
  }, []);

  // Audio Visualizer
  const startAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateVisualization = () => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray);
          
          const levels = Array.from(dataArray).map(value => value / 255);
          setAudioLevel(levels);
          
          animationFrameRef.current = requestAnimationFrame(updateVisualization);
        }
      };
      
      updateVisualization();
    } catch (error) {
      console.error('Audio visualization error:', error);
    }
  };

  const stopAudioVisualization = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setAudioLevel(new Array(32).fill(0.1));
  };

  const startListening = useCallback(async () => {
    setIsListening(true);
    setStatus('listening');
    setTranscript('');
    setErrorMessage('');
    
    await startAudioVisualization();
    
    try {
      recognitionRef.current?.start();
    } catch (error) {
      console.error('Failed to start recognition:', error);
    }
  }, []);

  const stopListening = useCallback(() => {
    setIsListening(false);
    recognitionRef.current?.stop();
    stopAudioVisualization();
    
    if (transcript) {
      performSearch(transcript);
    } else {
      setStatus('idle');
    }
  }, [transcript]);

  const performSearch = async (query: string) => {
    setStatus('analyzing');
    
    // Add music-related keywords for better results
    const searchQueries = [
      query,
      `${query} song`,
      `${query} music`,
      `${query} official audio`,
    ];
    
    try {
      // Try multiple search strategies
      let allResults: Track[] = [];
      
      for (const q of searchQueries.slice(0, 2)) {
        const results = await searchYouTube(q, 10);
        allResults = [...allResults, ...results];
        if (results.length > 0) break;
      }
      
      // Remove duplicates
      const uniqueResults = allResults.filter((track, index, self) =>
        index === self.findIndex(t => t.id === track.id)
      ).slice(0, 15);
      
      if (uniqueResults.length > 0) {
        setStatus('success');
        onResults(uniqueResults);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setStatus('error');
        setErrorMessage('No results found. Try again!');
      }
    } catch (error) {
      console.error('Search error:', error);
      setStatus('error');
      setErrorMessage('Search failed. Please try again.');
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 w-full max-w-lg px-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Close Button */}
          <motion.button
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <X size={20} />
          </motion.button>

          {/* Title */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Wand2 className="text-[#D4AF37]" size={24} />
              <h2 className="text-2xl font-bold text-gold-gradient">Voice Search</h2>
            </div>
            <p className="text-gray-400">
              {status === 'idle' && "Tap the microphone and say a song name or lyrics"}
              {status === 'listening' && "Listening... Speak now!"}
              {status === 'processing' && "Processing your voice..."}
              {status === 'analyzing' && "Searching for your song..."}
              {status === 'success' && "Found it! Opening results..."}
              {status === 'error' && errorMessage}
            </p>
          </motion.div>

          {/* Audio Visualizer */}
          <div className="flex items-end justify-center gap-1 h-32 mb-8">
            {audioLevel.map((level, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-full"
                style={{
                  background: `linear-gradient(to top, #D4AF37, #F1C40F)`,
                }}
                animate={{
                  height: isListening ? Math.max(8, level * 120) : 8,
                  opacity: isListening ? 0.5 + level * 0.5 : 0.3,
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Microphone Button */}
          <div className="flex justify-center mb-8">
            <motion.button
              className="relative"
              onClick={handleMicClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulse Rings */}
              {isListening && (
                <>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-full border-2 border-[#D4AF37]"
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </>
              )}
              
              {/* Main Button */}
              <motion.div
                className="relative w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                  background: isListening 
                    ? 'linear-gradient(135deg, #D4AF37, #F1C40F)' 
                    : 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(241,196,15,0.2))',
                  boxShadow: isListening 
                    ? '0 0 40px rgba(212,175,55,0.5), 0 0 80px rgba(212,175,55,0.3)' 
                    : '0 0 20px rgba(212,175,55,0.2)',
                }}
                animate={{
                  scale: isListening ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isListening ? Infinity : 0,
                }}
              >
                {status === 'analyzing' || status === 'processing' ? (
                  <Loader2 size={36} className="animate-spin text-black" />
                ) : status === 'success' ? (
                  <Search size={36} className="text-black" />
                ) : isListening ? (
                  <MicOff size={36} className="text-black" />
                ) : (
                  <Mic size={36} className={isListening ? 'text-black' : 'text-[#D4AF37]'} />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Transcript Display */}
          {transcript && (
            <motion.div
              className="glass rounded-2xl p-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <AudioWaveform size={16} className="text-[#D4AF37]" />
                <span className="text-sm text-gray-400">Detected:</span>
              </div>
              <p className="text-lg font-medium">{transcript}</p>
            </motion.div>
          )}

          {/* Tips */}
          <motion.div
            className="text-center space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <Music size={14} />
              Try saying the song name, artist, or even lyrics
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
