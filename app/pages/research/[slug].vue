<script setup lang="ts">
const route = useRoute()
const { data } = await useResearchDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Research post not found' })
}

useSeoMeta({
  title: () => data.value?.data.title,
  description: () => data.value?.data.excerpt ?? undefined,
})
</script>

<template>
  <article v-if="data" class="max-w-2xl mx-auto px-6 py-16">
    <p v-if="data.data.topic" class="text-xs font-medium uppercase tracking-wide text-slate-500">
      {{ data.data.topic.name }}
    </p>
    <h1 class="mt-2 text-3xl font-semibold text-slate-900">{{ data.data.title }}</h1>
    <p class="mt-4 text-lg text-slate-600">{{ data.data.excerpt }}</p>

    <div class="mt-8 whitespace-pre-line text-slate-700">
      {{ data.data.content }}
    </div>
  </article>
</template>
