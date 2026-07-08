<script setup lang="ts">
const { data } = await usePageContent('contact')

useSeoMeta({
  title: () => data.value?.translation.meta_title ?? data.value?.translation.title,
  description: () => data.value?.translation.meta_description ?? undefined,
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-semibold text-slate-900">{{ data?.translation.title }}</h1>
    <p class="mt-4 text-slate-600">{{ data?.translation.content }}</p>

    <div class="mt-10">
      <ContactForm />
    </div>
  </div>
</template>
