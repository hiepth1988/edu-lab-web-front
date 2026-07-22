<script setup lang="ts">
const { t } = useI18n()
const { data } = await useResearchList()

useSeoMeta({ title: t('nav.research') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.research') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.research') }}</h1>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="post in data?.data ?? []"
        :key="post.id"
        :to="`/research/${post.slug}`"
        class="group block bg-white rounded-xl premium-border p-md hover-lift"
      >
        <p v-if="post.topic" class="text-xs font-bold uppercase tracking-widest text-secondary">
          {{ post.topic.name }}
        </p>
        <h2 class="mt-2 font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ post.title }}</h2>
        <p class="mt-xs font-body-md text-on-surface-variant">{{ post.excerpt }}</p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
