<script setup lang="ts">
const route = useRoute()
const { data, error } = await useResearchDetail(route.params.slug as string)

throwIfMissing(data, error, 'Research post not found')

usePageSeo({
  title: () => data.value?.data.meta_title || data.value?.data.title,
  description: () => data.value?.data.meta_description || data.value?.data.excerpt || undefined,
  image: () => data.value?.data.og_image || undefined,
  type: 'article',
})

useLocalizedSlugs(() => data.value?.data.alternate_slugs)

useHead({
  link: () =>
    data.value?.data.canonical_url
      ? [{ rel: 'canonical', href: data.value.data.canonical_url }]
      : [],
})
</script>

<template>
  <article v-if="data" class="max-w-[832px] mx-auto px-margin-mobile sm:px-8 py-xl">
    <p v-if="data.data.topic" class="text-xs font-bold uppercase tracking-widest text-secondary">
      {{ data.data.topic.name }}
    </p>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
    <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.excerpt }}</p>

    <ContentLightbox>
      <div class="mt-lg post-content text-on-surface" v-html="data.data.content" />
    </ContentLightbox>
  </article>
</template>
