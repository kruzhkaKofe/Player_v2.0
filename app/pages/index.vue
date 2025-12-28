<template>
  <div>
    <h1>Index Page</h1>
    <SButton
      variant="outline"
      @click="test"
    >
      Check Auth
    </SButton>
    <SButton
      variant="outline"
      @click="getMe"
    >
      GetMe
    </SButton>
    <SButton
      variant="destructive"
      @click="logout"
    >
      logout
    </SButton>
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
