import { defineConfig } from 'vitest/config';
import { defineVitestProject } from '@nuxt/test-utils/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: [
            'test/{e2e,unit}/**/*.{test,spec}.ts',
            'layers/**/test/{e2e,unit}/**/*.{test,spec}.ts',
          ],
          environment: 'node',
          alias: {
            '#content': fileURLToPath(new URL('./content', import.meta.url)),
            '#modules': fileURLToPath(new URL('./modules', import.meta.url)),
            '#public': fileURLToPath(new URL('./public', import.meta.url)),
            '#server': fileURLToPath(new URL('./server', import.meta.url)),
            '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
            '#test': fileURLToPath(new URL('./test', import.meta.url)),
            '#layers': fileURLToPath(new URL('./layers', import.meta.url)),
            '#assets': fileURLToPath(new URL('./app/assets', import.meta.url)),
            '#components': fileURLToPath(new URL('./app/components', import.meta.url)),
            '#composables': fileURLToPath(new URL('./app/composables', import.meta.url)),
            '#layouts': fileURLToPath(new URL('./app/layouts', import.meta.url)),
            '#middleware': fileURLToPath(new URL('./app/middleware', import.meta.url)),
            '#pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
            '#plugins': fileURLToPath(new URL('./app/plugins', import.meta.url)),
            '#utils': fileURLToPath(new URL('./app/utils', import.meta.url)),
            '#stores': fileURLToPath(new URL('./app/stores', import.meta.url)),
          },
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: [
            'test/nuxt/**/*.{test,spec}.ts',
            'layers/**/test/nuxt/**/*.{test,spec}.ts',
          ],
          environment: 'nuxt',
          alias: {
            '#content': fileURLToPath(new URL('./content', import.meta.url)),
            '#modules': fileURLToPath(new URL('./modules', import.meta.url)),
            '#public': fileURLToPath(new URL('./public', import.meta.url)),
            '#server': fileURLToPath(new URL('./server', import.meta.url)),
            '#shared': fileURLToPath(new URL('./shared', import.meta.url)),
            '#test': fileURLToPath(new URL('./test', import.meta.url)),
            '#layers': fileURLToPath(new URL('./layers', import.meta.url)),
            '#assets': fileURLToPath(new URL('./app/assets', import.meta.url)),
            '#components': fileURLToPath(new URL('./app/components', import.meta.url)),
            '#composables': fileURLToPath(new URL('./app/composables', import.meta.url)),
            '#layouts': fileURLToPath(new URL('./app/layouts', import.meta.url)),
            '#middleware': fileURLToPath(new URL('./app/middleware', import.meta.url)),
            '#pages': fileURLToPath(new URL('./app/pages', import.meta.url)),
            '#plugins': fileURLToPath(new URL('./app/plugins', import.meta.url)),
            '#utils': fileURLToPath(new URL('./app/utils', import.meta.url)),
            '#stores': fileURLToPath(new URL('./app/stores', import.meta.url)),
          },
        },
      }),
    ],
  },
});
