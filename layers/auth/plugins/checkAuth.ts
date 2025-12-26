import { useAuthStore } from '#layers/auth/stores/auth';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  useAsyncData('check-auth', () => authStore.checkAuth());
});
