import type { CapacitorConfig } from '@capacitor/cli';

const isDev = process.env.NODE_ENV === 'development';
const backendUrl = isDev ? 'http://192.168.0.152:3001' : 'http://localhost:3001';

const config: CapacitorConfig = {
  appId: 'com.controlremedios.app',
  appName: 'fron-remedios',
  webDir: 'build',
  server: {
    url: isDev ? backendUrl : undefined,
    allowNavigation: [ "192.168.0.152" ],
    cleartext: true,
  }
};

export default config;
