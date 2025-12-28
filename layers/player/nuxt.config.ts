export default defineNuxtConfig({
  extends: ['#layers/auth'],
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: [
          '@types/spotify-web-playback-sdk',
        ],
      },
    },
  },
});
