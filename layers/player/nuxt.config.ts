export default defineNuxtConfig({
  extends: ['../auth'],
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
