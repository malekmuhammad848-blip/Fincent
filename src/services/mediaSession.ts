import { MediaSession } from '@capacitor-community/media-session';

export const updateMediaControls = async (title: string, artist: string, artwork: string) => {
  try {
    await MediaSession.setMetadata({
      title: title,
      artist: artist,
      album: 'Cent Music',
      artwork: [{ src: artwork }]
    });

    MediaSession.setActionHandler({ action: 'play' }, () => {
      // هنا تضع كود التشغيل الموجود في الـ Store الخاص بك
      console.log('Play from notification');
    });

    MediaSession.setActionHandler({ action: 'pause' }, () => {
      // هنا تضع كود الإيقاف
      console.log('Pause from notification');
    });
  } catch (e) {
    console.error('Media Session Error', e);
  }
};
