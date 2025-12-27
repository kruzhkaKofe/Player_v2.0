import { useAuthStore } from '#layers/auth/stores/auth';
import { errorHandler } from '#shared/utils/errorHandler';

export const usePlayerStore = defineStore('player', () => {
  const { getAccessToken } = useAuthStore();

  const player = ref<Spotify.Player | null>(null);
  const deviceId = ref<string | null>(null);
  const isPaused = ref(true);
  const currentTrack = ref<Spotify.Track | null>(null);
  const isActive = ref(false);

  function initializePlayer() {
    if (!window.Spotify) return;

    return getAccessToken()
      .then(token => {
        player.value = new window.Spotify.Player({
          name: 'Nuxt Player',
          getOAuthToken: cb => cb(token),
          volume: 0.5,
        });

        player.value.addListener('ready', ({ device_id }: Spotify.WebPlaybackInstance) => {
          console.log('Ready with Device ID', device_id);
          deviceId.value = device_id;
        });

        player.value.addListener('not_ready', ({ device_id }: Spotify.WebPlaybackInstance) => {
          console.log('Device ID has gone offline', device_id);
          deviceId.value = null;
        });

        player.value.addListener('player_state_changed', (state: Spotify.PlaybackState | null) => {
          if (!state) return;
          currentTrack.value = state.track_window.current_track;
          isPaused.value = state.paused;
          isActive.value = true;
        });

        player.value.addListener('authentication_error', ({ message }: Spotify.Error) => {
          console.error('Auth Error:', message);
        });

        player.value.connect();
      })
      .catch(errorHandler);
  }

  function togglePlay() {
    player.value?.togglePlay();
  }

  function nextTrack() {
    player.value?.nextTrack();
  }

  function prevTrack() {
    player.value?.previousTrack();
  }

  return {
    player,
    deviceId,
    isPaused,
    currentTrack,
    initializePlayer,
    togglePlay,
    nextTrack,
    prevTrack,
  };
});
