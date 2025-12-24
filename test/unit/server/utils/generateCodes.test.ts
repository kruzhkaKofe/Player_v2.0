import {
  getRandomString,
  generateCodes,
  sha256,
  base64Encode,
} from '#server/utils/generateCodes';
import { describe, test, expect } from 'vitest';

describe('generateCodesModule', () => {
  describe('getRandomString', () => {
    test.each([
      [0],
      [64],
    ])('возвращает строку длинной %i', length => {
      const result = getRandomString(length);
      expect(typeof result).toBe('string');
      expect(result).toHaveLength(length);
    });

    test('возвращает пустую строку, если length <= 0', () => {
      const result = getRandomString(-1);
      expect(typeof result).toBe('string');
      expect(result).toHaveLength(0);
    });
  });

  describe('base64Encode', () => {
    test('кодирует простую строку корректно', () => {
      const input = new TextEncoder().encode('Hello World');
      expect(base64Encode(input.buffer)).toBe('SGVsbG8gV29ybGQ');
    });

    test('заменяет "+" на "-" (URL safe)', () => {
      const input = new Uint8Array([251]);
      expect(base64Encode(input.buffer)).toBe('-w');
    });

    test('заменяет "/" на "_" (URL safe)', () => {
      const input = new Uint8Array([255]);
      expect(base64Encode(input.buffer)).toBe('_w');
    });

    test('удаляет паддинг "=" в конце строки', () => {
      const input = new TextEncoder().encode('a');
      expect(base64Encode(input.buffer)).toBe('YQ');
    });

    test('корректно обрабатывает комбинацию спецсимволов и паддинга', () => {
      const input = new Uint8Array([251, 240, 255]);
      expect(base64Encode(input.buffer)).toBe('-_D_');
    });
  });

  describe('sha256', () => {
    test('должна возвращать корректный SHA-256 хеш для строки', async () => {
      const input = 'hello world';
      const buffer = await sha256(input);

      const hashArray = Array.from(new Uint8Array(buffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const expectedHash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';
      expect(hashHex).toBe(expectedHash);
    });

    test('должна возвращать Promise, который резолвится в ArrayBuffer', async () => {
      const result = sha256('test');
      expect(result).toBeInstanceOf(Promise);

      const buffer = await result;
      expect(buffer).toBeInstanceOf(ArrayBuffer);
      expect(buffer.byteLength).toBe(32);
    });

    test('должна возвращать один и тот же хеш для одной и той же строки', async () => {
      const str = 'consistent-input';
      const hash1 = await sha256(str);
      const hash2 = await sha256(str);

      expect(new Uint8Array(hash1)).toEqual(new Uint8Array(hash2));
    });

    test('должна возвращать разные хеши для разных строк', async () => {
      const hash1 = await sha256('abc');
      const hash2 = await sha256('abd');

      expect(new Uint8Array(hash1)).not.toEqual(new Uint8Array(hash2));
    });
  });

  describe('generateCodes', () => {
    test('должна возвращать объект с реальными строками без моков', async () => {
      const result = await generateCodes();

      expect(result).toHaveProperty('codeVerifier');
      expect(result).toHaveProperty('codeChallenge');

      expect(typeof result.codeVerifier).toBe('string');
      expect(result.codeVerifier).toHaveLength(64);

      expect(typeof result.codeChallenge).toBe('string');
      expect(result.codeChallenge).toHaveLength(43);

      expect(result.codeVerifier).not.toBe(result.codeChallenge);
    });
  });
});
