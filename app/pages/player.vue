<template>
  <div
    class="fixed bottom-0 w-full bg-black text-white p-4"
  >
    <RouterLink to="/">Home Page</RouterLink>
    <div>
      <button @click="playerStore.prevTrack">
        Prev
      </button>
      <button @click="toggle">
        {{ isPaused ? 'Play' : 'Pause' }}
      </button>
      <button @click="playerStore.nextTrack">
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '#layers/player/stores/player';

const playerStore = usePlayerStore();
const { isPaused } = storeToRefs(playerStore);

const toggle = () => playerStore.togglePlay();
</script>
