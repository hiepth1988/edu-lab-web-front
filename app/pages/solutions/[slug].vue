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
  <div v-if="data" class="max-w-3xl mx-auto px-6 py-16 space-y-12">
    <div>
      <h1 class="text-3xl font-semibold text-slate-900">{{ data.data.title }}</h1>
      <p class="mt-4 text-lg text-slate-600">{{ data.data.subheading }}</p>
    </div>

    <div v-if="data.data.problem">
      <h2 class="text-xl font-semibold text-slate-900">{{ t('detail.problem') }}</h2>
      <p class="mt-2 text-slate-700">{{ data.data.problem }}</p>
    </div>

    <div v-if="data.data.solution_overview">
      <h2 class="text-xl font-semibold text-slate-900">{{ t('detail.solutionOverview') }}</h2>
      <p class="mt-2 text-slate-700">{{ data.data.solution_overview }}</p>
    </div>

    <div v-if="data.data.features.length">
      <h2 class="text-xl font-semibold text-slate-900">{{ t('detail.coreFeatures') }}</h2>
      <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <li
          v-for="(feature, i) in data.data.features"
          :key="i"
          class="rounded-lg border border-slate-200 p-4"
        >
          <p class="font-medium text-slate-900">{{ feature.title }}</p>
          <p v-if="feature.description" class="mt-1 text-sm text-slate-600">
            {{ feature.description }}
          </p>
        </li>
      </ul>
    </div>

    <div v-if="data.data.faqs.length">
      <h2 class="text-xl font-semibold text-slate-900">{{ t('detail.faq') }}</h2>
      <div class="mt-4 space-y-4">
        <div v-for="(faq, i) in data.data.faqs" :key="i">
          <p class="font-medium text-slate-900">{{ faq.question }}</p>
          <p class="mt-1 text-sm text-slate-600">{{ faq.answer }}</p>
        </div>
      </div>
    </div>

    <NuxtLinkLocale
      to="/contact"
      class="inline-block rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800"
    >
      {{ t('cta.bookConsultation') }}
    </NuxtLinkLocale>
  </div>
</template>
