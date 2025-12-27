import { usePlayerStore } from '#layers/player/stores/player';

export default defineNuxtPlugin(() => {
  useHead({
    script: [
      {
        src: 'https://sdk.scdn.co/spotify-player.js',
        async: true,
        tagPosition: 'bodyClose',
      },
    ],
  });

  // if (import.meta.client) {
  window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('✅ Spotify SDK ready to init');
    const playerStore = usePlayerStore();
    playerStore.initializePlayer();
  };
  // }
});

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void
    Spotify: typeof Spotify
  }
}
