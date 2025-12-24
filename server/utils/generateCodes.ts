export function getRandomString(length: number): string {
  if (length <= 0) return '';

  const possible
    = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce(
    (acc, x) => acc + possible[x % possible.length],
    '',
  );
}

export function base64Encode(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return globalThis.crypto?.subtle.digest('SHA-256', data);
}

export function generateCodes() {
  const codeVerifier = getRandomString(64);

  return sha256(codeVerifier)
    .then(hashed => base64Encode(hashed))
    .then(codeChallenge => {
      return {
        codeVerifier,
        codeChallenge,
      };
    });
}
