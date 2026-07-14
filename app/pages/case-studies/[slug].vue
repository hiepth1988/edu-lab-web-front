<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await useCaseStudyDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found' })
}

useSeoMeta({
  title: () => data.value?.data.title,
  description: () => data.value?.data.excerpt ?? undefined,
})
</script>

<template>
  <div v-if="data" class="max-w-3xl mx-auto px-6 py-16 space-y-10">
    <div>
      <h1 class="text-3xl font-semibold text-slate-900">{{ data.data.title }}</h1>
      <p class="mt-4 text-lg text-slate-600">{{ data.data.excerpt }}</p>
    </div>

    <div v-if="data.data.metrics.length" class="grid grid-cols-3 gap-4">
      <div
        v-for="(metric, i) in data.data.metrics"
        :key="i"
        class="rounded-xl border border-slate-200 p-5 text-center"
      >
        <p class="text-2xl font-semibold text-slate-900">{{ metric.value }}</p>
        <p class="mt-1 text-xs text-slate-500">{{ metric.label }}</p>
      </div>
    </div>

    <div v-if="data.data.problem">
      <h2 class="text-xl font-semibold text-slate-900">{{ t('detail.problem') }}</h2>
      <p class="mt-2 text-slate-700 whitespace-pre-line">{{ data.data.problem }}</p>
    </div>

    <div v-if="data.data.solution_text">
      <h2 class="text-xl font-semibold text-slate-900">{{ t('detail.solution') }}</h2>
      <p class="mt-2 text-slate-700 whitespace-pre-line">{{ data.data.solution_text }}</p>
    </div>

    <div v-if="data.data.result">
      <h2 class="text-xl font-semibold text-slate-900">{{ t('detail.result') }}</h2>
      <p class="mt-2 text-slate-700 whitespace-pre-line">{{ data.data.result }}</p>
    </div>

    <NuxtLinkLocale
      to="/contact"
      class="inline-block rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800"
    >
      {{ t('cta.bookConsultation') }}
    </NuxtLinkLocale>
  </div>
</template>
