import { COOKIE_KEYS } from '#shared/consts/storageConsts';
import type { H3Event } from 'h3';

export function createSpotifyApi(event: H3Event) {
  const config = useRuntimeConfig(event);

  const client = $fetch.create({
    baseURL: config.public.spotifyBaseUrl,

    onRequest({ options }) {
      options.headers = new Headers(options.headers);
      const accessToken = getCookie(event, COOKIE_KEYS.accessToken);

      if (accessToken) {
        options.headers.set('Authorization', `Bearer ${accessToken}`);
      }
    },

    async onResponseError({ response, options, request }) {
      if (response.status !== 401) {
        return Promise.reject(response);
      }

      try {
        const newTokens = await refreshSession(event);

        options.headers = new Headers(options.headers);
        options.headers.set('Authorization', `Bearer ${newTokens.access_token}`);

        return client(request, options);
      }
      catch (e) {
        clearSession(event);
        errorHandler(e);
      }
    },
  }) as typeof $fetch;

  return client;
};
