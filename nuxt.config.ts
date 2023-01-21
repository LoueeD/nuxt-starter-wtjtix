// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  buildModules: ['@nuxtjs/pwa'],
  pwa: {
    manifest: {
      name: 'Demo App',
      lang: 'gb',
      useWebmanifestExtension: false,
      theme_color: '#F6E8E3',
    },
  },
});
