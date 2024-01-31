import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cloud.voiture',
  appName: 'Voiture',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
