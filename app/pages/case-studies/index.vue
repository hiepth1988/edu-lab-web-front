<script setup lang="ts">
const { t } = useI18n()
const { data } = await useCaseStudiesList()

useSeoMeta({ title: t('nav.caseStudies') })
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-semibold text-slate-900">{{ t('nav.caseStudies') }}</h1>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <NuxtLinkLocale
        v-for="item in data?.data ?? []"
        :key="item.id"
        :to="`/case-studies/${item.slug}`"
        class="block rounded-xl border border-slate-200 p-6 hover:border-slate-900 transition-colors"
      >
        <h2 class="text-lg font-semibold text-slate-900">{{ item.title }}</h2>
        <p class="mt-2 text-sm text-slate-600">{{ item.excerpt }}</p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
