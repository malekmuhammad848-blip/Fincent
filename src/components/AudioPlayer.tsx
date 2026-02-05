import { useEffect, useRef, useCallback } from 'react';
import { usePlayerStore } from '../store/playerStore';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    setIsPlaying,
    volume,
    isMuted,
    setProgress,
    setDuration,
    playNext,
  } = usePlayerStore();

  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initPlayer = useCallback(() => {
    if (!currentTrack || !containerRef.current) return;

    // Destroy existing player
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch (e) {
        console.log('Player cleanup');
      }
    }

    // Create new player
    playerRef.current = new window.YT.Player(containerRef.current, {
      height: '0',
      width: '0',
      videoId: currentTrack.videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onReady: (event: any) => {
          event.target.setVolume(isMuted ? 0 : volume);
          if (isPlaying) {
            event.target.playVideo();
          }
          
          // Get duration
          const dur = event.target.getDuration();
          if (dur) setDuration(dur);
        },
        onStateChange: (event: any) => {
          const state = event.data;
          
          if (state === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
            
            // Update progress
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
              if (playerRef.current?.getCurrentTime) {
                const time = playerRef.current.getCurrentTime();
                setProgress(time);
              }
            }, 500);
            
            // Update Media Session
            if ('mediaSession' in navigator && currentTrack) {
              navigator.mediaSession.metadata = new MediaMetadata({
                title: currentTrack.title,
                artist: currentTrack.artist,
                artwork: [
                  { src: currentTrack.thumbnail, sizes: '512x512', type: 'image/jpeg' }
                ]
              });
            }
          } else if (state === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
          } else if (state === window.YT.PlayerState.ENDED) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            playNext();
          }
        },
        onError: (event: any) => {
          console.error('YouTube Player Error:', event.data);
          playNext();
        },
      },
    });
  }, [currentTrack, isPlaying, isMuted, volume, setIsPlaying, setProgress, setDuration, playNext]);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        if (currentTrack) initPlayer();
      };
    }
  }, []);

  // Handle track changes
  useEffect(() => {
    if (window.YT?.Player && currentTrack) {
      initPlayer();
    }
  }, [currentTrack?.videoId, initPlayer]);

  // Handle play/pause
  useEffect(() => {
    if (!playerRef.current?.playVideo) return;
    
    try {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch (e) {
      console.log('Play/pause error');
    }
  }, [isPlaying]);

  // Handle volume
  useEffect(() => {
    if (!playerRef.current?.setVolume) return;
    
    try {
      playerRef.current.setVolume(isMuted ? 0 : volume);
    } catch (e) {
      console.log('Volume error');
    }
  }, [volume, isMuted]);

  // Media Session controls
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler('pause', () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler('previoustrack', () => usePlayerStore.getState().playPrevious());
      navigator.mediaSession.setActionHandler('nexttrack', () => playNext());
    }
  }, [playNext, setIsPlaying]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (playerRef.current?.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.log('Cleanup error');
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      id="youtube-player"
      className="fixed -bottom-full -left-full w-0 h-0 opacity-0 pointer-events-none"
    />
  );
}
