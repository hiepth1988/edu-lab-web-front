<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await useProjectDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

useSeoMeta({
  title: () => data.value?.data.meta_title || data.value?.data.title,
  description: () => data.value?.data.meta_description || data.value?.data.excerpt || undefined,
  ogImage: () => data.value?.data.og_image || data.value?.data.featured_image || undefined,
})

useHead({
  link: () =>
    data.value?.data.canonical_url
      ? [{ rel: 'canonical', href: data.value.data.canonical_url }]
      : [],
})

const toneClasses: Record<string, { badge: string; border: string; icon: string }> = {
  problem: { badge: 'bg-amber-600', border: 'border-t-amber-600/30', icon: 'report_problem' },
  solution: { badge: 'bg-secondary', border: 'border-t-secondary/30', icon: 'lightbulb' },
  result: { badge: 'bg-gold', border: 'border-t-gold/30', icon: 'trending_up' },
}

const sections = computed(() => {
  if (!data.value) return []
  const d = data.value.data
  return [
    { key: 'problem', heading: t('detail.problem'), content: d.problem, images: d.section_images.problem },
    { key: 'solution', heading: t('detail.solution'), content: d.solution_text, images: d.section_images.solution },
    { key: 'result', heading: t('detail.result'), content: d.result, images: d.section_images.result },
  ].filter((s) => s.content)
})

const glanceMetrics = computed(() => data.value?.data.metrics.slice(0, 2) ?? [])
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

        <div v-if="data.data.category || glanceMetrics.length" class="mt-md flex flex-wrap items-center gap-3">
          <span
            v-if="data.data.category"
            class="inline-flex items-center gap-1.5 py-1 px-4 rounded-full border border-secondary/20 text-secondary bg-secondary/5 font-label-md"
          >
            <span class="material-symbols-outlined text-base leading-none">category</span>
            {{ data.data.category.name }}
          </span>
          <span v-if="glanceMetrics.length" class="font-body-md text-on-surface-variant">
            <template v-for="(metric, i) in glanceMetrics" :key="i">
              <span v-if="i > 0"> · </span>
              <strong class="text-primary">{{ metric.value }}</strong> {{ metric.label }}
            </template>
          </span>
        </div>
      </div>

      <div class="mt-xl space-y-md">
        <section
          v-for="(section, i) in sections"
          :key="section.key"
          class="bg-white rounded-xl premium-border border-t-4 p-md sm:p-lg"
          :class="toneClasses[section.key].border"
        >
          <div class="flex items-center gap-3">
            <span
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-sm font-semibold"
              :class="toneClasses[section.key].badge"
            >
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <span class="material-symbols-outlined text-on-surface-variant">{{ toneClasses[section.key].icon }}</span>
            <h2 class="font-headline-sm text-headline-sm text-primary">{{ section.heading }}</h2>
          </div>
          <div class="mt-md prose max-w-none text-on-surface" v-html="section.content" />

          <div v-if="section.key === 'result' && data.data.metrics.length" class="mt-md grid grid-cols-3 gap-md">
            <div
              v-for="(metric, mi) in data.data.metrics"
              :key="mi"
              class="bg-surface-container-low rounded-xl p-md text-center"
            >
              <p class="font-headline-lg text-headline-sm text-primary">{{ metric.value }}</p>
              <p class="mt-1 text-xs text-on-surface-variant">{{ metric.label }}</p>
            </div>
          </div>

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
