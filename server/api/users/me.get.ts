import { meSchema } from '#shared/types/users.types';
import { createSpotifyApi } from '#server/utils/createSpotifyApi';
import { errorHandler } from '#shared/utils/errorHandler';

export default defineEventHandler(event => {
  const api = createSpotifyApi(event);

  return api('/me')
    .then(res => meSchema.parseAsync(res))
    .then(me => me)
    .catch(errorHandler);
});
