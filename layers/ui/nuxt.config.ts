import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],
  components: [
    {
      path: join(currentDir, './app/components/ui'),
      prefix: 'S',
      extensions: ['.vue'],
    },
  ],
  shadcn: {
    prefix: 'S',
    componentDir: join(currentDir, './app/components/ui'),
  },
  tailwindcss: {
    cssPath: join(currentDir, './app/assets/css/tailwind.css'),
  },
});
