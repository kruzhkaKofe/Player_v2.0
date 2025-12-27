<template>
  <div>
    <h1>Login page</h1>
    <button @click="login">
      Login
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '#layers/auth/stores/auth';

const authStore = useAuthStore();

function login() {
  authStore.login();
}
</script>
