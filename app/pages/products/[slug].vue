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
  <div v-if="data">
    <section class="bg-surface-container-low">
      <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
        <span
          v-if="data.data.stage"
          class="inline-block text-xs rounded-full border border-outline-variant/50 text-on-surface-variant px-2 py-0.5"
        >
          {{ data.data.stage }}
        </span>
        <h1 class="mt-sm font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.name }}</h1>
        <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.role_summary }}</p>
        <p v-if="data.data.description" class="mt-sm font-body-md text-on-surface-variant">{{ data.data.description }}</p>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl space-y-xl">
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

      <NuxtLinkLocale
        to="/contact"
        class="inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all"
      >
        {{ t('cta.bookConsultation') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
