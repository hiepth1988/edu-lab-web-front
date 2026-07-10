<script setup lang="ts">
import { useLocaleHead } from '#i18n'

const i18nHead = useLocaleHead()
const { public: publicConfig } = useRuntimeConfig()

useHead(() => ({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs?.lang,
  },
  link: [...(i18nHead.value.link || [])],
  meta: [
    ...(i18nHead.value.meta || []),
    ...(!publicConfig.allowIndexing ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
  ],
}))
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
