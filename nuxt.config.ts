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
      // Site-wide crawl switch: open to Google by default. Set env NUXT_PUBLIC_ALLOW_INDEXING=false
      // on non-production environments (e.g. dev server) to send noindex + robots Disallow.
      allowIndexing: process.env.NUXT_PUBLIC_ALLOW_INDEXING !== 'false',
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
      script: [
        // Google tag (gtag.js)
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-9FQCNF6YL5', async: true },
        {
          innerHTML:
            "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-9FQCNF6YL5');",
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
})
