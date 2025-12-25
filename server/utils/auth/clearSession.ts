import { COOKIE_KEYS } from '#shared/consts/storageConsts';
import type { H3Event } from 'h3';

export function clearSession(event: H3Event) {
  deleteCookie(event, COOKIE_KEYS.accessToken);
  deleteCookie(event, COOKIE_KEYS.refreshToken);
  return Promise.resolve({ success: true });
};
