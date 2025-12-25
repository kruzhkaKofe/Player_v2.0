import { meSchema } from '#shared/types/users.types';
import { createSpotifyApi } from '#server/utils/createSpotifyApi';
import { errorHandler } from '#server/utils/errorHandler';

export default defineEventHandler(event => {
  const api = createSpotifyApi(event);

  return api('/me')
    .then(res => {
      return meSchema.parseAsync(res);
    })
    .then(me => {
      return me;
    })
    .catch(errorHandler);
});
