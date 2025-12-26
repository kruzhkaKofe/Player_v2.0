import { defaultMe } from '#shared/types/users.types';
import { errorHandler } from '#shared/utils/errorHandler';

const useAuthPrivateStore = defineStore('authPrivate', () => {
  const isAuth = ref(false);
  const me = ref(defaultMe);

  function setAuth(value: boolean) {
    isAuth.value = value;
  }

  function setMe(data = defaultMe) {
    me.value = data;
  }

  return {
    isAuth,
    me,
    setAuth,
    setMe,
  };
});

export const useAuthStore = defineStore('auth', () => {
  const privateState = useAuthPrivateStore();
  const $api = useRequestFetch();

  const isLoading = ref(false);

  const getAuth = computed(() => privateState.isAuth);
  const getMe = computed(() => privateState.me);

  function login() {
    window.location.href = '/api/auth/login';
  }

  function logout() {
    return $api('/api/auth/logout')
      .catch(e => {
        errorHandler(e);
      })
      .finally(() => {
        privateState.setAuth(false);
        privateState.setMe();
        navigateTo('/login');
      });
  }

  function checkAuth() {
    if (getAuth.value) return Promise.resolve(getMe.value);

    isLoading.value = true;

    return $api('/api/users/me')
      .then(me => {
        privateState.setMe(me);
        privateState.setAuth(true);
        return getMe.value;
      })
      .catch(e => {
        privateState.setMe();
        privateState.setAuth(false);
        errorHandler(e);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  function getAccessToken() {
    return $api('/api/auth/token');
  }

  return {
    getAuth,
    getMe,
    login,
    logout,
    checkAuth,
    getAccessToken,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
