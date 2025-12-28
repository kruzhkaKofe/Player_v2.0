<template>
  <div
    class="fixed bottom-0 w-full bg-black text-white p-4"
  >
    <RouterLink to="/">Home Page</RouterLink>
    <div>
      <SButton
        variant="outline"
        @click="playerStore.prevTrack"
      >
        Prev
      </SButton>
      <SButton
        variant="outline"
        @click="toggle"
      >
        {{ isPaused ? 'Play' : 'Pause' }}
      </SButton>
      <SButton
        variant="outline"
        @click="playerStore.nextTrack"
      >
        Next
      </SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '#layers/player/stores/player';

const playerStore = usePlayerStore();
const { isPaused } = storeToRefs(playerStore);

const toggle = () => playerStore.togglePlay();
</script>
