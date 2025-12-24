import { COOKIE_KEYS } from '#shared/storageConsts';
import { TokensSchema } from '#shared/types/auth.types';

export default defineEventHandler(event => {
  const config = useRuntimeConfig(event);

  const query = getQuery(event);

  const code = query.code && typeof query.code === 'string'
    ? query.code
    : null;

  const codeVerifier = getCookie(event, COOKIE_KEYS.codeVerifier);

  if (!code || !codeVerifier) {
    throw createError({
      statusCode: 400,
      message: 'Unsuccess autorization attemp',
    });
  }

  const url = config.public.spotifyAccountsUrl + '/api/token';

  return $fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      code_verifier: codeVerifier,
      client_id: config.clientId,
      redirect_uri: config.public.redirectUrl,
    }),
  })
    .then(res => TokensSchema.parseAsync(res))
    .then(tokens => {
      setTokens(event, tokens, config.public.env);
      deleteCookie(event, COOKIE_KEYS.codeVerifier);
      return sendRedirect(event, '/');
    })
    .catch(e => {
      console.error('OAuth error:', e);
      return sendRedirect(event, '/login?error=token_exchange_failed');
    });
});
