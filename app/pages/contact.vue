<script setup lang="ts">
const { data } = await usePageContent('contact')

useSeoMeta({
  title: () => data.value?.translation.meta_title ?? data.value?.translation.title,
  description: () => data.value?.translation.meta_description ?? undefined,
})
</script>

<template>
  <div class="max-w-2xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ $t('nav.contact') }}</span>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data?.translation.title }}</h1>
    <p class="mt-md font-body-md text-on-surface-variant">{{ data?.translation.content }}</p>

    <div class="mt-xl">
      <ContactForm />
    </div>
  </div>
</template>
