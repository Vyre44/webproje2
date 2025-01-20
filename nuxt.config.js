export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  imports: {
    dirs: ['stores']
  },

  build: {
    transpile: ['pinia']
  },

  components: true,

  typescript: {
    strict: true
  },

  compatibilityDate: '2025-01-19'
})