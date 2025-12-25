import { COOKIE_KEYS } from '#shared/consts/storageConsts';
import { TokensSchema } from '#shared/types/auth.types';
import type { H3Event } from 'h3';
import { errorsTypes } from '#shared/types/errors.type';

export function refreshSession(event: H3Event) {
  const config = useRuntimeConfig(event);
  const refreshToken = getCookie(event, COOKIE_KEYS.refreshToken);

  if (!refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: errorsTypes[401],
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
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: config.clientId,
    }),
  })
    .then(res => TokensSchema.parseAsync(res))
    .then(tokens => {
      setTokens(event, tokens, config.public.env);
      return tokens;
    })
    .catch(e => {
      deleteCookie(event, COOKIE_KEYS.accessToken);
      deleteCookie(event, COOKIE_KEYS.refreshToken);
      errorHandler(e);
    });
};
