<script setup lang="ts">
const { data } = await usePageContent('about')

useSeoMeta({
  title: () => data.value?.translation.meta_title ?? data.value?.translation.title,
  description: () => data.value?.translation.meta_description ?? undefined,
})
</script>

<template>
  <div>
    <section class="bg-surface-container-low">
      <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
        <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">Space to Become</span>
        <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data?.translation.title }}</h1>
        <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data?.translation.excerpt }}</p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
      <p class="whitespace-pre-line font-body-md text-on-surface leading-relaxed">{{ data?.translation.content }}</p>
    </div>
  </div>
</template>
