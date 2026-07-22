<script setup lang="ts">
const { t } = useI18n()
const { data } = await useSolutionsList()

useSeoMeta({ title: t('nav.solutions') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.solutions') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.solutions') }}</h1>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="solution in data?.data ?? []"
        :key="solution.id"
        :to="`/solutions/${solution.slug}`"
        class="group block bg-white rounded-xl premium-border p-md hover-lift"
      >
        <h2 class="font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ solution.title }}</h2>
        <p class="mt-xs font-body-md text-on-surface-variant">{{ solution.subheading }}</p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
