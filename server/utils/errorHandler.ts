import { z } from 'zod';

import {
  errorsTypes,
  SpotifyRegularErrorSchema,
  SpotifyAuthenticationErrorSchema,
} from '#shared/types/errors.type';

export function errorHandler(e: unknown): never {
  if (e instanceof z.ZodError) {
    throw createError({
      statusCode: 502,
      statusMessage: errorsTypes[502],
      message: 'Zod Validation Failed on Response',
      data: {
        issues: e.issues,
      },
    });
  }

  const spotifyAuthenticationError = SpotifyAuthenticationErrorSchema.safeParse(e);

  if (spotifyAuthenticationError.success) {
    throw createError({
      statusCode: 401,
      statusMessage: spotifyAuthenticationError.data.error,
      message: spotifyAuthenticationError.data.error_description,
    });
  }

  const spotifyRegularError = SpotifyRegularErrorSchema.safeParse(e);

  if (spotifyRegularError.success) {
    throw createError({
      statusCode: spotifyRegularError.data.status,
      statusMessage: errorsTypes[spotifyRegularError.data.status],
      message: spotifyRegularError.data.message,
    });
  }

  throw e;
};
