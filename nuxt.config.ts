// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/tailwindcss'],

  // @nuxtjs/tailwindcss's default cssPath resolution predates Nuxt 4's app/ srcDir
  // convention, so it must be pointed at the real file explicitly.
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  devServer: {
    port: 3000,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      // Site-wide crawl switch: keep false until there's enough content to open to Google.
      // Flip to "true" (env NUXT_PUBLIC_ALLOW_INDEXING=true) when ready to go live on search.
      allowIndexing: process.env.NUXT_PUBLIC_ALLOW_INDEXING === 'true',
    },
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    locales: [
      { code: 'vi', language: 'vi-VN', name: 'Tiếng Việt', file: 'vi.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    langDir: 'locales',
    defaultLocale: 'vi',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
  },

  app: {
    head: {
      titleTemplate: '%s — XO Edu Lab',
    },
  },
})
