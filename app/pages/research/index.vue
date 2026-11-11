<script setup lang="ts">
const { t } = useI18n()
const { data } = await useResearchList()

usePageSeo({ title: () => t('seo.researchTitle'), description: () => t('seo.researchDescription') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.research') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.research') }}</h1>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <PostCard v-for="post in data?.data ?? []" :key="post.id" :post="{ ...post, type: 'research' }" />
    </div>
  </div>
</template>
