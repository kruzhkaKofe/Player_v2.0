import { COOKIE_KEYS } from '#shared/storageConsts';
import { TokensSchema } from '#shared/types/auth.types';

export default defineEventHandler(event => {
  const config = useRuntimeConfig(event);

  const refreshToken = getCookie(event, COOKIE_KEYS.refreshToken);

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      message: 'No refresh token',
    });
  }
  const url = config.public.spotifyAccountsUrl + '/api/token';

  return $fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: name,
      refresh_token: refreshToken,
      client_id: config.clientId,
    }),
  })
    .then(res => TokensSchema.parseAsync(res))
    .then(tokens => setTokens(event, tokens, config.public.env))
    .catch(() => {
      deleteCookie(event, COOKIE_KEYS.accessToken);
      deleteCookie(event, COOKIE_KEYS.refreshToken);

      throw createError({
        statusCode: 401,
        message: 'Session expired',
      });
    });
});
