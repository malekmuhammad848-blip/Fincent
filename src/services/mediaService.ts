import { MediaSession } from '@capacitor-community/media-session';
export const setupMedia = async (title: string, artist: string) => {
  try {
    await MediaSession.setMetadata({
      title, 
      artist, 
      album: 'Cent App',
      artwork: [{ src: 'https://placehold.co/512x512/000000/FFD700?text=C' }]
    });
  } catch (e) {
    console.error("Media Session not supported");
  }
};
