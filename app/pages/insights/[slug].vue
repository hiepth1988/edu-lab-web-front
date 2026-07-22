<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await usePostDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: () => data.value?.data.meta_title || data.value?.data.title,
  description: () => data.value?.data.meta_description || data.value?.data.excerpt || undefined,
  ogImage: () => data.value?.data.og_image || data.value?.data.featured_image || undefined,
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
    <p v-if="data.data.category" class="text-xs font-bold uppercase tracking-widest text-secondary">
      {{ data.data.category.name }}
    </p>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
    <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.excerpt }}</p>

    <img
      v-if="data.data.featured_image"
      :src="data.data.featured_image"
      :alt="data.data.title"
      class="mt-lg h-64 sm:h-80 w-full rounded-xl object-cover"
    />

    <div class="mt-lg prose max-w-none text-on-surface" v-html="data.data.content" />

    <div v-if="data.data.tags.length" class="mt-lg flex flex-wrap gap-2">
      <span
        v-for="tag in data.data.tags"
        :key="tag.slug"
        class="text-xs rounded-full border border-outline-variant/50 px-3 py-1 text-on-surface-variant"
      >
        {{ tag.name }}
      </span>
    </div>

    <div v-if="data.data.related_posts?.length" class="mt-xl border-t border-outline-variant/30 pt-lg">
      <h2 class="text-xs font-bold uppercase tracking-widest text-secondary">{{ t('detail.relatedInsights') }}</h2>
      <div class="mt-md grid grid-cols-1 sm:grid-cols-3 gap-md">
        <NuxtLinkLocale
          v-for="related in data.data.related_posts"
          :key="related.slug"
          :to="`/insights/${related.slug}`"
          class="group block bg-white rounded-xl premium-border p-md hover-lift"
        >
          <p class="font-headline-sm text-sm text-primary group-hover:text-secondary transition-colors">{{ related.title }}</p>
          <p class="mt-1 text-xs text-on-surface-variant">{{ related.excerpt }}</p>
        </NuxtLinkLocale>
      </div>
    </div>
  </article>
</template>
