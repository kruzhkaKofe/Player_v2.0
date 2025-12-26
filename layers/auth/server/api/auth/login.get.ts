import { COOKIE_KEYS } from '#shared/consts/storageConsts';
import { MINUTE } from '#shared/consts/timeConsts';
import { generatePKCECodes } from '#layers/auth/server/utils/generatePKCECodes';

export default defineEventHandler(event => {
  const config = useRuntimeConfig(event);

  const scope = [
    'user-read-private',
    'user-read-email',
    'user-modify-playback-state',
    'user-read-playback-state',
    'streaming',
  ].join(' ');

  return generatePKCECodes()
    .then(codes => {
      const { codeVerifier, codeChallenge } = codes;

      setCookie(event, COOKIE_KEYS.codeVerifier, codeVerifier, {
        httpOnly: true,
        secure: config.public.env === 'production',
        maxAge: (10 * MINUTE) / 1_000, // in seconds
      });

      const params = new URLSearchParams({
        response_type: 'code',
        client_id: config.clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: config.public.redirectUrl,
      });

      const url = config.public.spotifyAccountsUrl + '/authorize' + `?${params.toString()}`;

      return sendRedirect(event, url);
    });
});
