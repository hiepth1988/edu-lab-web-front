<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await useProductDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found' })
}

useSeoMeta({
  title: () => data.value?.data.name,
  description: () => data.value?.data.role_summary ?? undefined,
})
</script>

<template>
  <div v-if="data" class="max-w-3xl mx-auto px-6 py-16 space-y-10">
    <div>
      <span
        v-if="data.data.stage"
        class="text-xs rounded-full bg-slate-100 text-slate-600 px-2 py-0.5"
      >
        {{ data.data.stage }}
      </span>
      <h1 class="mt-3 text-3xl font-semibold text-slate-900">{{ data.data.name }}</h1>
      <p class="mt-4 text-lg text-slate-600">{{ data.data.role_summary }}</p>
      <p v-if="data.data.description" class="mt-4 text-slate-700">{{ data.data.description }}</p>
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

    <NuxtLinkLocale
      to="/contact"
      class="inline-block rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800"
    >
      {{ t('cta.bookConsultation') }}
    </NuxtLinkLocale>
  </div>
</template>
