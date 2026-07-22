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
  <article v-if="data" class="max-w-2xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <p v-if="data.data.topic" class="text-xs font-bold uppercase tracking-widest text-secondary">
      {{ data.data.topic.name }}
    </p>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
    <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.excerpt }}</p>

    <div class="mt-lg whitespace-pre-line font-body-md text-on-surface leading-relaxed">
      {{ data.data.content }}
    </div>
  </article>
</template>
