<script setup lang="ts">
const { data } = await usePageContent('terms')

useSeoMeta({
  title: () => data.value?.translation.meta_title ?? data.value?.translation.title,
  description: () => data.value?.translation.meta_description ?? undefined,
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <h1 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data?.translation.title }}</h1>
    <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data?.translation.excerpt }}</p>
    <p class="mt-lg whitespace-pre-line font-body-md text-on-surface leading-relaxed">{{ data?.translation.content }}</p>
  </div>
</template>
