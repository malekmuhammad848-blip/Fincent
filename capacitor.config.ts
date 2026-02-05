import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.malek.fincent',
  appName: 'Cent',
  webDir: 'dist',
  plugins: {
    BackgroundAudio: {
      enable: true
    }
  }
};
export default config;
