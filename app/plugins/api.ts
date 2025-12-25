export default defineNuxtPlugin(() => {
  const api = useRequestFetch();

  return {
    provide: {
      api,
    },
  };
});
