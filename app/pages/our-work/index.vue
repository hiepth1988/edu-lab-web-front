<script setup lang="ts">
const { t } = useI18n()
const { data } = await useProjectsList()

useSeoMeta({ title: t('nav.ourWork') })

const featured = computed(() => (data.value?.data ?? []).filter((p) => p.is_featured))
const rest = computed(() => (data.value?.data ?? []).filter((p) => !p.is_featured))
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.ourWork') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.ourWork') }}</h1>
    </div>

    <div v-if="featured.length" class="mt-xl space-y-md">
      <NuxtLinkLocale
        v-for="item in featured"
        :key="item.id"
        :to="`/our-work/${item.slug}`"
        class="group block bg-white rounded-xl premium-border overflow-hidden hover-lift sm:grid sm:grid-cols-2"
      >
        <div class="h-64 sm:h-full w-full bg-surface-container-high overflow-hidden">
          <img
            v-if="item.featured_image"
            :src="item.featured_image"
            :alt="item.title"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="p-lg flex flex-col justify-center">
          <span v-if="item.category" class="font-label-md text-secondary text-xs font-bold uppercase tracking-widest">{{ item.category.name }}</span>
          <h2 class="mt-2 font-headline-lg text-headline-sm sm:text-headline-lg text-primary group-hover:text-secondary transition-colors">{{ item.title }}</h2>
          <p class="mt-sm font-body-md text-on-surface-variant">{{ item.excerpt }}</p>
          <div v-if="item.metrics.length" class="mt-md flex items-baseline gap-1.5">
            <span class="font-headline-sm text-headline-sm text-primary">{{ item.metrics[0].value }}</span>
            <span class="text-sm text-on-surface-variant">{{ item.metrics[0].label }}</span>
          </div>
        </div>
      </NuxtLinkLocale>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="item in rest"
        :key="item.id"
        :to="`/our-work/${item.slug}`"
        class="group block bg-white rounded-xl premium-border overflow-hidden hover-lift"
      >
        <div class="h-44 w-full bg-surface-container-high overflow-hidden">
          <img
            v-if="item.featured_image"
            :src="item.featured_image"
            :alt="item.title"
            class="h-full w-full object-cover"
          />
        </div>
        <div class="p-md">
          <span v-if="item.category" class="font-label-md text-secondary text-xs font-bold uppercase tracking-widest">{{ item.category.name }}</span>
          <h2 class="mt-2 font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ item.title }}</h2>
          <p class="mt-xs font-body-md text-on-surface-variant">{{ item.excerpt }}</p>
          <div v-if="item.metrics.length" class="mt-sm flex items-baseline gap-1.5">
            <span class="font-headline-sm text-primary">{{ item.metrics[0].value }}</span>
            <span class="text-xs text-on-surface-variant">{{ item.metrics[0].label }}</span>
          </div>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
