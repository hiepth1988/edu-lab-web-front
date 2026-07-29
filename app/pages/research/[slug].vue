<script setup lang="ts">
const route = useRoute()
const { data } = await useResearchDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Research post not found' })
}

useSeoMeta({
  title: () => data.value?.data.meta_title || data.value?.data.title,
  description: () => data.value?.data.meta_description || data.value?.data.excerpt || undefined,
  ogImage: () => data.value?.data.og_image || undefined,
})

useHead({
  link: () =>
    data.value?.data.canonical_url
      ? [{ rel: 'canonical', href: data.value.data.canonical_url }]
      : [],
})
</script>

<template>
  <article v-if="data" class="max-w-2xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <p v-if="data.data.topic" class="text-xs font-bold uppercase tracking-widest text-secondary">
      {{ data.data.topic.name }}
    </p>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
    <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.excerpt }}</p>

    <div class="mt-lg prose max-w-none text-on-surface" v-html="data.data.content" />
  </article>
</template>
