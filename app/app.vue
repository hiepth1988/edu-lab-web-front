<script setup lang="ts">
import { useLocaleHead } from '#i18n'

const i18nHead = useLocaleHead()
const { public: publicConfig } = useRuntimeConfig()
const { t } = useI18n()
const absoluteUrl = useAbsoluteUrl()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [
    ...(i18nHead.value.meta || []),
    ...(!publicConfig.allowIndexing ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${absoluteUrl('/')}#organization`,
            name: 'XO Edu Lab',
            url: absoluteUrl('/'),
            logo: absoluteUrl('/images/home/logo.jpg'),
            description: t('seo.siteDescription'),
          },
          {
            '@type': 'WebSite',
            '@id': `${absoluteUrl('/')}#website`,
            name: 'XO Edu Lab',
            url: absoluteUrl('/'),
            inLanguage: i18nHead.value.htmlAttrs?.lang,
            publisher: { '@id': `${absoluteUrl('/')}#organization` },
          },
        ],
      }),
    },
  ],
}))

useSeoMeta({
  ogSiteName: 'XO Edu Lab',
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
