import { COOKIE_KEYS } from '#shared/consts/storageConsts';

export default defineEventHandler(event => {
  deleteCookie(event, COOKIE_KEYS.accessToken);
  deleteCookie(event, COOKIE_KEYS.refreshToken);
});
