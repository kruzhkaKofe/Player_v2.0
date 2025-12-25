import { useAuthStore } from '#stores/auth/auth';

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  useAsyncData('check-auth', () => authStore.checkAuth());
});
