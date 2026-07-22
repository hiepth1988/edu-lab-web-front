<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await useSolutionDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Solution not found' })
}

useSeoMeta({
  title: () => data.value?.data.title,
  description: () => data.value?.data.subheading ?? undefined,
})
</script>

<template>
  <div v-if="data">
    <section class="bg-surface-container-low">
      <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
        <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.solutions') }}</span>
        <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
        <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.subheading }}</p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl space-y-xl">
      <div v-if="data.data.problem">
        <h2 class="font-headline-sm text-headline-sm text-primary">{{ t('detail.problem') }}</h2>
        <p class="mt-sm font-body-md text-on-surface-variant">{{ data.data.problem }}</p>
      </div>

      <div v-if="data.data.solution_overview">
        <h2 class="font-headline-sm text-headline-sm text-primary">{{ t('detail.solutionOverview') }}</h2>
        <p class="mt-sm font-body-md text-on-surface-variant">{{ data.data.solution_overview }}</p>
      </div>

      <div v-if="data.data.features.length">
        <h2 class="font-headline-sm text-headline-sm text-primary mb-md">{{ t('detail.coreFeatures') }}</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <li
            v-for="(feature, i) in data.data.features"
            :key="i"
            class="bg-white rounded-xl premium-border p-md"
          >
            <p class="font-headline-sm text-sm text-primary">{{ feature.title }}</p>
            <p v-if="feature.description" class="mt-1 font-body-md text-sm text-on-surface-variant">
              {{ feature.description }}
            </p>
          </li>
        </ul>
      </div>

      <div v-if="data.data.faqs.length">
        <h2 class="font-headline-sm text-headline-sm text-primary mb-md">{{ t('detail.faq') }}</h2>
        <div class="space-y-md">
          <div v-for="(faq, i) in data.data.faqs" :key="i" class="border-b border-outline-variant/30 pb-md">
            <p class="font-headline-sm text-sm text-primary">{{ faq.question }}</p>
            <p class="mt-1 font-body-md text-sm text-on-surface-variant">{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <NuxtLinkLocale
        to="/contact"
        class="inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all"
      >
        {{ t('cta.bookConsultation') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
