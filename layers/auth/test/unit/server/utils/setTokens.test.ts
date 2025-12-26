import { describe, test, expect, vi, beforeEach } from 'vitest';
import { setTokens } from '#layers/auth/server/utils/setTokens';
import { COOKIE_KEYS } from '#shared/consts/storageConsts';
import { setCookie, type H3Event } from 'h3';

vi.mock('h3', () => ({
  setCookie: vi.fn(),
}));

describe('setTokens', () => {
  const mockEvent = {} as H3Event;

  const mockTokens = {
    access_token: 'acc-123',
    refresh_token: 'ref-456',
    expires_in: 3600,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('устанавливает secure: true, если env="production"', () => {
    setTokens(mockEvent, mockTokens, 'production');

    expect(setCookie).toHaveBeenCalledWith(
      mockEvent,
      COOKIE_KEYS.accessToken,
      mockTokens.access_token,
      expect.objectContaining({
        secure: true,
        httpOnly: true,
      }),
    );
  });

  test('устанавливает secure: false, если env="development"', () => {
    setTokens(mockEvent, mockTokens, 'development');

    expect(setCookie).toHaveBeenCalledWith(
      expect.anything(),
      expect.anything(),
      expect.anything(),
      expect.objectContaining({
        secure: false,
      }),
    );
  });

  test('устанавливает access_token и refresh_token', () => {
    setTokens(mockEvent, mockTokens, 'production');

    expect(setCookie).toHaveBeenCalledWith(
      mockEvent,
      COOKIE_KEYS.accessToken,
      'acc-123',
      expect.objectContaining({ maxAge: 3600 }),
    );

    expect(setCookie).toHaveBeenCalledWith(
      mockEvent,
      COOKIE_KEYS.refreshToken,
      'ref-456',
      expect.objectContaining({ maxAge: 3600 * 24 * 30 }),
    );
  });

  test('НЕ устанавливает refresh_token, если он отсутствует', () => {
    const tokensNoRefresh = {
      access_token: 'acc-123',
      expires_in: 3600,
    };

    setTokens(mockEvent, tokensNoRefresh, 'production');

    expect(setCookie).toHaveBeenCalledTimes(1);
    expect(setCookie).toHaveBeenCalledWith(
      expect.anything(),
      COOKIE_KEYS.accessToken,
      expect.anything(),
      expect.anything(),
    );

    expect(setCookie).not.toHaveBeenCalledWith(
      expect.anything(),
      COOKIE_KEYS.refreshToken,
      expect.anything(),
      expect.anything(),
    );
  });
});
