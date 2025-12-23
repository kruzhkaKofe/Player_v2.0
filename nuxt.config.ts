// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/test-utils', '@nuxt/eslint'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Nuxt Player',
    },
  },
  runtimeConfig: {
    clientId: '',

    public: {
      env: '',
      redirectUrl: '',
      spotifyAccountsUrl: '',
      spotifyBaseUrl: '',
    },
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
});
