// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/icon', '@nuxtjs/tailwindcss', '@nuxthq/studio'],
  content: {
    preview: {
      dev: true
    }
  },
  studio: {
    enabled: true
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})
