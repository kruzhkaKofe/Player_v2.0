import { COOKIE_KEYS } from '#shared/storageConsts';
import type { Tokens } from '#shared/types/auth.types';
import type { H3Event } from 'h3';

const config = useRuntimeConfig();

const generalCookieParams = {
  httpOnly: true,
  secure: config.public.env === 'production',
};

export function setTokens(event: H3Event, tokens: Tokens) {
  const { access_token, refresh_token, expires_in } = tokens;

  setCookie(event, COOKIE_KEYS.accessToken, access_token, {
    ...generalCookieParams,
    maxAge: expires_in, // 1 hour
  });

  if (refresh_token) {
    setCookie(event, COOKIE_KEYS.refreshToken, refresh_token, {
      ...generalCookieParams,
      maxAge: expires_in * 24 * 30, // 30 days
    });
  }
}
