export const playMusic = (title: string, artist: string, url: string) => {
  const audio = new Audio(url);
  audio.play();
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title, artist, album: 'Cent',
      artwork: [{ src: 'https://placehold.co/512x512/000000/FFD700?text=C' }]
    });
  }
};
