<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await usePostDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: () => data.value?.data.title,
  description: () => data.value?.data.excerpt ?? undefined,
})
</script>

<template>
  <article v-if="data" class="max-w-2xl mx-auto px-6 py-16">
    <p v-if="data.data.category" class="text-xs font-medium uppercase tracking-wide text-slate-500">
      {{ data.data.category.name }}
    </p>
    <h1 class="mt-2 text-3xl font-semibold text-slate-900">{{ data.data.title }}</h1>
    <p class="mt-4 text-lg text-slate-600">{{ data.data.excerpt }}</p>

    <div class="mt-8 prose prose-slate max-w-none whitespace-pre-line text-slate-700">
      {{ data.data.content }}
    </div>

    <div v-if="data.data.tags.length" class="mt-8 flex flex-wrap gap-2">
      <span
        v-for="tag in data.data.tags"
        :key="tag.slug"
        class="text-xs rounded-full border border-slate-300 px-3 py-1 text-slate-600"
      >
        {{ tag.name }}
      </span>
    </div>

    <div v-if="data.data.related_posts?.length" class="mt-12 border-t border-slate-100 pt-8">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500">{{ t('detail.relatedInsights') }}</h2>
      <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NuxtLinkLocale
          v-for="related in data.data.related_posts"
          :key="related.slug"
          :to="`/insights/${related.slug}`"
          class="block rounded-lg border border-slate-200 p-4 hover:border-slate-900 transition-colors"
        >
          <p class="font-medium text-slate-900 text-sm">{{ related.title }}</p>
          <p class="mt-1 text-xs text-slate-500">{{ related.excerpt }}</p>
        </NuxtLinkLocale>
      </div>
    </div>
  </article>
</template>
