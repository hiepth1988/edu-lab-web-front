<script setup lang="ts">
const { t } = useI18n()
const { data } = await useProjectsList()

useSeoMeta({ title: t('nav.ourWork') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.ourWork') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.ourWork') }}</h1>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="item in data?.data ?? []"
        :key="item.id"
        :to="`/our-work/${item.slug}`"
        class="group block bg-white rounded-xl premium-border overflow-hidden hover-lift"
      >
        <img
          v-if="item.featured_image"
          :src="item.featured_image"
          :alt="item.title"
          class="h-44 w-full object-cover"
        />
        <div class="p-md">
          <h2 class="font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ item.title }}</h2>
          <p class="mt-xs font-body-md text-on-surface-variant">{{ item.excerpt }}</p>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
