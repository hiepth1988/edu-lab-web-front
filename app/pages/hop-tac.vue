<script setup lang="ts">
// vi stays at /hop-tac (also the default end-of-post CTA, runtimeConfig.public.postCtaUrl);
// en is served at /en/partnership.
definePageMeta({
  i18n: { paths: { vi: '/hop-tac', en: '/partnership' } },
})

interface Plan {
  icon?: string
  title: string
  body?: string
  fit?: string
}
interface Row {
  label: string
  values: string[]
}
interface Step {
  title: string
  body?: string
}
interface Faq {
  q: string
  a: string
}

const { data } = await usePageContent('partnership')

function section(key: string) {
  return computed(() => data.value?.sections.find((s) => s.section_key === key)?.translation)
}

const starterPackage = section('starter_package')
const models = section('models')
const comparison = section('comparison')
const process = section('process')
const faq = section('faq')
const caseStudy = section('case_study')
const finalCta = section('final_cta')

usePageSeo({
  title: () => data.value?.translation.meta_title || data.value?.translation.title,
  description: () => data.value?.translation.meta_description || data.value?.translation.excerpt,
  image: () => data.value?.translation.og_image,
})
</script>

<template>
  <div>
    <section class="bg-surface-container-low">
      <div class="max-w-3xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl text-center">
        <h1 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data?.translation.title }}</h1>
        <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data?.translation.excerpt }}</p>
      </div>
    </section>

    <StarterPackage v-if="starterPackage" :section="starterPackage" />

    <!-- Collaboration models -->
    <section v-if="models" class="py-xl bg-surface-container-high">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
        <div class="text-center mb-xl">
          <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-md">{{ models.heading }}</h2>
          <p v-if="models.body" class="font-body-lg text-on-surface-variant max-w-2xl mx-auto">{{ models.body }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div
            v-for="plan in ((models.extra as any)?.plans as Plan[] ?? [])"
            :key="plan.title"
            class="bg-white p-lg rounded-xl border border-outline-variant/30 flex flex-col gap-sm"
          >
            <span v-if="plan.icon" class="material-symbols-outlined text-secondary text-4xl">{{ plan.icon }}</span>
            <h3 class="font-headline-sm text-primary">{{ plan.title }}</h3>
            <p class="font-body-md text-on-surface-variant flex-1">{{ plan.body }}</p>
            <p v-if="plan.fit" class="text-sm font-bold text-secondary pt-xs">{{ plan.fit }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <section v-if="comparison" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto">
      <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xl text-center">{{ comparison.heading }}</h2>
      <!-- Desktop: table -->
      <div class="hidden md:block overflow-hidden rounded-xl premium-border bg-white">
        <table class="w-full text-left">
          <thead class="bg-surface-container-low">
            <tr>
              <th class="p-md w-1/5" />
              <th
                v-for="col in ((comparison.extra as any)?.columns as string[] ?? [])"
                :key="col"
                class="p-md font-headline-sm text-primary align-bottom"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in ((comparison.extra as any)?.rows as Row[] ?? [])"
              :key="row.label"
              class="border-t border-outline-variant/30"
            >
              <th class="p-md font-label-md text-primary align-top">{{ row.label }}</th>
              <td v-for="(value, i) in row.values" :key="i" class="p-md font-body-md text-on-surface-variant align-top">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Mobile: one card per model -->
      <div class="md:hidden space-y-md">
        <div
          v-for="(col, i) in ((comparison.extra as any)?.columns as string[] ?? [])"
          :key="col"
          class="bg-white premium-border rounded-xl p-md space-y-sm"
        >
          <h3 class="font-headline-sm text-primary">{{ col }}</h3>
          <dl class="space-y-sm">
            <div v-for="row in ((comparison.extra as any)?.rows as Row[] ?? [])" :key="row.label">
              <dt class="font-label-md text-outline uppercase tracking-wider text-xs">{{ row.label }}</dt>
              <dd class="font-body-md text-on-surface-variant">{{ row.values[i] }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section v-if="process" class="py-xl bg-surface-container-low">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xl text-center">{{ process.heading }}</h2>
        <ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-md">
          <li
            v-for="(step, i) in ((process.extra as any)?.steps as Step[] ?? [])"
            :key="step.title"
            class="bg-white rounded-xl p-md space-y-xs"
          >
            <span class="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold">{{ i + 1 }}</span>
            <h3 class="font-headline-sm text-primary pt-xs">{{ step.title }}</h3>
            <p class="font-body-md text-on-surface-variant">{{ step.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- FAQ -->
    <section v-if="faq" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-3xl mx-auto">
      <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xl text-center">{{ faq.heading }}</h2>
      <div class="space-y-sm">
        <details
          v-for="item in ((faq.extra as any)?.items as Faq[] ?? [])"
          :key="item.q"
          class="group bg-white premium-border rounded-xl p-md"
        >
          <summary class="flex items-center justify-between gap-md cursor-pointer list-none font-headline-sm text-primary">
            {{ item.q }}
            <span class="material-symbols-outlined transition-transform group-open:rotate-180 shrink-0">expand_more</span>
          </summary>
          <p class="mt-sm font-body-md text-on-surface-variant">{{ item.a }}</p>
        </details>
      </div>
    </section>

    <!-- Case study -->
    <section v-if="caseStudy" class="border-t border-outline-variant/20 py-xl">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop text-center">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ caseStudy.heading }}</h2>
        <p class="mt-sm font-body-lg text-on-surface-variant max-w-2xl mx-auto">{{ caseStudy.body }}</p>
        <NuxtLinkLocale
          v-if="caseStudy.cta_url"
          :to="caseStudy.cta_url"
          class="inline-block mt-md text-secondary font-label-md hover:underline"
        >
          {{ caseStudy.cta_label }} →
        </NuxtLinkLocale>
      </div>
    </section>

    <!-- Final CTA -->
    <section v-if="finalCta" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto mb-xl">
      <div class="bg-primary text-white rounded-[48px] p-lg sm:p-xl text-center">
        <div class="max-w-2xl mx-auto space-y-md">
          <h2 class="font-display-lg text-headline-lg-mobile sm:text-headline-lg">{{ finalCta.heading }}</h2>
          <p v-if="finalCta.body" class="font-body-lg text-on-primary-container">{{ finalCta.body }}</p>
          <div class="pt-md">
            <NuxtLinkLocale
              v-if="finalCta.cta_url"
              :to="finalCta.cta_url"
              class="inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all text-lg"
            >
              {{ finalCta.cta_label }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
