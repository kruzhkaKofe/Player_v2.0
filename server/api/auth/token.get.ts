import { COOKIE_KEYS } from '#shared/consts/storageConsts';
import { errorHandler } from '#shared/utils/errorHandler';

export default defineEventHandler(event => {
  const accessToken = getCookie(event, COOKIE_KEYS.accessToken);

  if (accessToken) return Promise.resolve(accessToken);

  return refreshSession(event)
    .then(tokens => tokens.access_token)
    .catch(errorHandler);
});
