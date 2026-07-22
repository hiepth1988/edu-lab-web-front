<script setup lang="ts">
const { t } = useI18n()
const { data } = await useAudiencesList()

useSeoMeta({ title: t('nav.whoWeHelp') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.whoWeHelp') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
        {{ t('nav.whoWeHelp') }}
      </h1>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
      <NuxtLinkLocale
        v-for="item in data?.data ?? []"
        :key="item.id"
        :to="`/who-we-help/${item.slug}`"
        class="group block bg-white rounded-xl premium-border overflow-hidden hover-lift"
      >
        <div
          class="h-40 w-full bg-cover bg-center bg-gradient-to-br from-secondary/20 via-surface-container-high to-primary/10 flex items-center justify-center"
          :style="item.hero_image ? { backgroundImage: `url(${item.hero_image})` } : undefined"
        >
          <span v-if="!item.hero_image" class="material-symbols-outlined text-4xl text-secondary">groups</span>
        </div>
        <div class="p-md">
          <h2 class="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
            {{ item.title }}
          </h2>
          <p class="mt-xs font-body-md text-body-md text-on-surface-variant">{{ item.subheading }}</p>
        </div>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
