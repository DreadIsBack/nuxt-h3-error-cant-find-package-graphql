import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: false,

  vite: {
    // This is a workaround for immidiate page reloading.
    // https://github.com/nuxt/framework/issues/1796
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
      },
    },
  },

  typescript: {
    strict: true,
  },
});
