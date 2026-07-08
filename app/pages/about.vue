<script setup lang="ts">
const { data } = await usePageContent('about')

useSeoMeta({
  title: () => data.value?.translation.meta_title ?? data.value?.translation.title,
  description: () => data.value?.translation.meta_description ?? undefined,
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-semibold text-slate-900">{{ data?.translation.title }}</h1>
    <p class="mt-4 text-lg text-slate-600">{{ data?.translation.excerpt }}</p>
    <p class="mt-6 text-slate-700 leading-relaxed">{{ data?.translation.content }}</p>
  </div>
</template>
