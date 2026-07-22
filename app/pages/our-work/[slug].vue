<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await useProjectDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: () => data.value?.data.title,
  description: () => data.value?.data.excerpt ?? undefined,
})

const sections = computed(() => {
  if (!data.value) return []
  const d = data.value.data
  return [
    { key: 'problem', heading: t('detail.problem'), content: d.problem, images: d.section_images.problem },
    { key: 'solution', heading: t('detail.solution'), content: d.solution_text, images: d.section_images.solution },
    { key: 'result', heading: t('detail.result'), content: d.result, images: d.section_images.result },
  ].filter((s) => s.content)
})
</script>

<template>
  <div v-if="data">
    <img
      v-if="data.data.featured_image"
      :src="data.data.featured_image"
      :alt="data.data.title"
      class="h-64 sm:h-96 w-full object-cover"
    />

    <div class="max-w-4xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
      <div>
        <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.ourWork') }}</span>
        <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
        <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.excerpt }}</p>
      </div>

      <div v-if="data.data.metrics.length" class="mt-xl grid grid-cols-3 gap-md">
        <div
          v-for="(metric, i) in data.data.metrics"
          :key="i"
          class="bg-white rounded-xl premium-border p-md text-center"
        >
          <p class="font-headline-lg text-headline-sm text-primary">{{ metric.value }}</p>
          <p class="mt-1 text-xs text-on-surface-variant">{{ metric.label }}</p>
        </div>
      </div>

      <div class="mt-xl space-y-md">
        <section
          v-for="(section, i) in sections"
          :key="section.key"
          class="bg-white rounded-xl premium-border p-md sm:p-lg"
        >
          <div class="flex items-center gap-3">
            <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-white text-sm font-semibold">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <h2 class="font-headline-sm text-headline-sm text-primary">{{ section.heading }}</h2>
          </div>
          <div class="mt-md prose max-w-none text-on-surface" v-html="section.content" />
          <ProjectGallery :images="section.images" />
        </section>
      </div>

      <NuxtLinkLocale
        to="/contact"
        class="mt-xl inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all"
      >
        {{ t('cta.bookConsultation') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
