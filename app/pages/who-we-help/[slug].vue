<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await useAudienceDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Audience not found' })
}

useSeoMeta({
  title: () => data.value?.data.title,
  description: () => data.value?.data.subheading ?? undefined,
})
</script>

<template>
  <div v-if="data">
    <section class="bg-surface-container-low">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        <div>
          <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.whoWeHelp') }}</span>
          <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">
            {{ data.data.title }}
          </h1>
          <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.subheading }}</p>
        </div>
        <div
          class="h-64 rounded-xl bg-cover bg-center bg-gradient-to-br from-secondary/20 via-surface-container-high to-primary/10 flex items-center justify-center"
          :style="data.data.hero_image ? { backgroundImage: `url(${data.data.hero_image})` } : undefined"
        >
          <span v-if="!data.data.hero_image" class="material-symbols-outlined text-6xl text-secondary">groups</span>
        </div>
      </div>
    </section>

    <section v-if="data.data.pain_points" class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
      <h2 class="font-headline-sm text-headline-sm text-primary">{{ t('detail.problem') }}</h2>
      <p class="mt-sm font-body-lg text-body-lg text-on-surface-variant max-w-3xl">{{ data.data.pain_points }}</p>
    </section>

    <section v-if="data.data.how_we_help" class="bg-primary text-white">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
        <h2 class="font-headline-sm text-headline-sm">{{ t('detail.solution') }}</h2>
        <p class="mt-sm font-body-lg text-body-lg text-on-primary-container max-w-3xl">{{ data.data.how_we_help }}</p>
      </div>
    </section>

    <section v-if="data.data.solutions.length" class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
      <h2 class="font-headline-sm text-headline-sm text-primary mb-md">{{ t('cta.viewAll') }} — {{ t('nav.solutions') }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-md">
        <NuxtLinkLocale
          v-for="solution in data.data.solutions"
          :key="solution.slug"
          :to="`/solutions/${solution.slug}`"
          class="group block bg-white rounded-xl premium-border p-md hover-lift"
        >
          <h3 class="font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ solution.title }}</h3>
          <p class="mt-xs font-body-md text-body-md text-on-surface-variant">{{ solution.subheading }}</p>
        </NuxtLinkLocale>
      </div>
    </section>

    <section class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop pb-xl">
      <NuxtLinkLocale
        to="/contact"
        class="inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all"
      >
        {{ t('cta.buildWithXo') }}
      </NuxtLinkLocale>
    </section>
  </div>
</template>
