<template>
  <div>
    <h1>Index Page</h1>
    <button @click="test">
      Check Auth
    </button>
    <button @click="getMe">
      GetMe
    </button>
    <button @click="logout">
      logout
    </button>
    <RouterLink to="/player">
      to Player
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '#layers/auth/stores/auth';

const authStore = useAuthStore();

function test() {
  console.log('isAuth', authStore.getAuth);
}

function getMe() {
  authStore.checkAuth()
    .then(() => {
      console.log(authStore.getMe);
    });
}

function logout() {
  authStore.logout();
}
</script>
