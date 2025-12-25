import { z } from 'zod';

export const errorsTypes = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
} as const;

export const StatusCodeSchema = z.custom<keyof typeof errorsTypes>(val => {
  return typeof val === 'number' && val in errorsTypes;
});

export const SpotifyRegularErrorSchema = z.object({
  message: z.string(),
  status: StatusCodeSchema,
});

export const SpotifyAuthenticationErrorSchema = z.object({
  error: z.string(),
  error_description: z.string(),
});

export type SpotifyRegularError = z.infer<typeof SpotifyRegularErrorSchema>;
export type SpotifyAuthenticationError = z.infer<typeof SpotifyAuthenticationErrorSchema>;
