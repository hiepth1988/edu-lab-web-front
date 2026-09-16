<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await useSolutionDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Solution not found' })
}

// Cross-link targets shown under architecture_note, per checklist items #3, #5, #6, #9.
// Each solution slug maps to the related products/solutions it should link to.
const crossLinks: Record<string, { label: string; to: string }[]> = {
  'online-exam-platform': [
    { label: 'Exam Engine', to: '/products/exam-engine' },
    { label: 'Question Bank Engine', to: '/products/question-bank-engine' },
  ],
  'ai-education': [
    { label: 'Adaptive Learning', to: '/solutions/adaptive-learning' },
    { label: 'Learning Analytics', to: '/solutions/learning-analytics' },
  ],
  'adaptive-learning': [
    { label: 'AI Education', to: '/solutions/ai-education' },
  ],
  'learning-analytics': [
    { label: 'AI Education', to: '/solutions/ai-education' },
    { label: 'Adaptive Learning', to: '/solutions/adaptive-learning' },
  ],
}

const activeCrossLinks = computed(() => crossLinks[route.params.slug as string] ?? [])

useSeoMeta({
  title: () => data.value?.data.meta_title || data.value?.data.title,
  description: () => data.value?.data.meta_description || data.value?.data.subheading || undefined,
  ogImage: () => data.value?.data.og_image || undefined,
})

useHead({
  link: () =>
    data.value?.data.canonical_url
      ? [{ rel: 'canonical', href: data.value.data.canonical_url }]
      : [],
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

      <div v-if="data.data.architecture_note" class="bg-surface-container-low rounded-xl p-md space-y-sm">
        <p class="font-body-md text-sm text-on-surface-variant">{{ data.data.architecture_note }}</p>
        <div v-if="activeCrossLinks.length" class="flex flex-wrap gap-sm">
          <NuxtLinkLocale
            v-for="link in activeCrossLinks"
            :key="link.to"
            :to="link.to"
            class="text-secondary text-sm font-medium hover:underline"
          >
            {{ link.label }} →
          </NuxtLinkLocale>
        </div>
      </div>

      <div v-if="data.data.features.length">
        <h2 class="font-headline-sm text-headline-sm text-primary mb-md">{{ t('detail.coreFeatures') }}</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-md">
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

      <div v-if="data.data.architecture_approach.length">
        <h2 class="font-headline-sm text-headline-sm text-primary mb-md">{{ t('detail.architectureApproach') }}</h2>
        <ul class="space-y-md">
          <li
            v-for="(item, i) in data.data.architecture_approach"
            :key="i"
            class="flex gap-sm"
          >
            <span class="flex-none w-7 h-7 rounded-full bg-primary/10 text-primary font-headline-sm text-sm flex items-center justify-center">{{ i + 1 }}</span>
            <div>
              <p class="font-headline-sm text-sm text-primary">{{ item.title }}</p>
              <p v-if="item.description" class="mt-1 font-body-md text-sm text-on-surface-variant">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="data.data.trust_safety.length">
        <h2 class="font-headline-sm text-headline-sm text-primary mb-md">{{ t('detail.trustSafety') }}</h2>
        <div class="space-y-md">
          <div v-for="(item, i) in data.data.trust_safety" :key="i" class="bg-white premium-border border-l-4 border-l-secondary rounded-xl p-md">
            <p class="font-headline-sm text-sm text-primary">{{ item.question }}</p>
            <p v-if="item.answer" class="mt-1 font-body-md text-sm text-on-surface-variant">{{ item.answer }}</p>
          </div>
        </div>
      </div>

      <div v-if="data.data.use_cases.length">
        <h2 class="font-headline-sm text-headline-sm text-primary mb-md">{{ t('detail.useCases') }}</h2>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <li
            v-for="(item, i) in data.data.use_cases"
            :key="i"
            class="bg-white rounded-xl premium-border p-md"
          >
            <p class="font-headline-sm text-sm text-primary">{{ item.audience }}</p>
            <p v-if="item.description" class="mt-1 font-body-md text-sm text-on-surface-variant">{{ item.description }}</p>
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
