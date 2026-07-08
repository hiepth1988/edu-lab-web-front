<script setup lang="ts">
const { data } = await usePageContent('home')

function section(key: string) {
  return computed(() => data.value?.sections.find((s) => s.section_key === key)?.translation)
}

const hero = section('hero')
const whoWeHelp = section('who_we_help')
const solutions = section('solutions')
const techCapability = section('tech_capability')
const researchLab = section('research_lab')
const caseStudies = section('case_studies')
const latestInsights = section('latest_insights')
const finalCta = section('final_cta')

const { data: postsData } = await usePostsList({ page: 1 })
const latestPosts = computed(() => postsData.value?.data.slice(0, 3) ?? [])

useSeoMeta({
  title: () => data.value?.translation.meta_title ?? data.value?.translation.title,
  description: () => data.value?.translation.meta_description ?? undefined,
})
</script>

<template>
  <div>
    <section class="max-w-6xl mx-auto px-6 py-20 text-center">
      <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
        {{ hero?.heading }}
      </h1>
      <p class="mt-5 text-lg text-slate-600 max-w-2xl mx-auto">
        {{ hero?.subheading }}
      </p>
      <NuxtLinkLocale
        v-if="hero?.cta_url"
        :to="hero.cta_url"
        class="inline-block mt-8 rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800"
      >
        {{ hero?.cta_label }}
      </NuxtLinkLocale>
    </section>

    <section class="border-t border-slate-100 py-14">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-sm font-semibold uppercase tracking-wide text-slate-500">
          {{ whoWeHelp?.heading }}
        </h2>
        <p class="mt-3 text-xl text-slate-800">{{ whoWeHelp?.body }}</p>
      </div>
    </section>

    <section class="border-t border-slate-100 py-14 bg-slate-50">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-semibold text-slate-900">{{ solutions?.heading }}</h2>
        <p class="mt-3 text-slate-600">{{ solutions?.body }}</p>
        <NuxtLinkLocale
          v-if="solutions?.cta_url"
          :to="solutions.cta_url"
          class="inline-block mt-6 text-sm font-medium text-slate-900 underline"
        >
          {{ solutions?.cta_label }}
        </NuxtLinkLocale>
      </div>
    </section>

    <section class="border-t border-slate-100 py-14">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-semibold text-slate-900">{{ techCapability?.heading }}</h2>
        <p class="mt-3 text-slate-600">{{ techCapability?.body }}</p>
      </div>
    </section>

    <section class="border-t border-slate-100 py-14 bg-slate-50">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-semibold text-slate-900">{{ researchLab?.heading }}</h2>
        <p class="mt-3 text-slate-600">{{ researchLab?.body }}</p>
        <NuxtLinkLocale
          v-if="researchLab?.cta_url"
          :to="researchLab.cta_url"
          class="inline-block mt-6 text-sm font-medium text-slate-900 underline"
        >
          {{ researchLab?.cta_label }}
        </NuxtLinkLocale>
      </div>
    </section>

    <section class="border-t border-slate-100 py-14">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-2xl font-semibold text-slate-900">{{ caseStudies?.heading }}</h2>
        <p class="mt-3 text-slate-600">{{ caseStudies?.body }}</p>
        <NuxtLinkLocale
          v-if="caseStudies?.cta_url"
          :to="caseStudies.cta_url"
          class="inline-block mt-6 text-sm font-medium text-slate-900 underline"
        >
          {{ caseStudies?.cta_label }}
        </NuxtLinkLocale>
      </div>
    </section>

    <section v-if="latestPosts.length" class="border-t border-slate-100 py-14 bg-slate-50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-2xl font-semibold text-slate-900 text-center">
          {{ latestInsights?.heading }}
        </h2>
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <NuxtLinkLocale
            v-for="post in latestPosts"
            :key="post.id"
            :to="`/insights/${post.slug}`"
            class="block rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-900 transition-colors"
          >
            <h3 class="font-semibold text-slate-900">{{ post.title }}</h3>
            <p class="mt-2 text-sm text-slate-600">{{ post.excerpt }}</p>
          </NuxtLinkLocale>
        </div>
        <div class="mt-8 text-center">
          <NuxtLinkLocale
            v-if="latestInsights?.cta_url"
            :to="latestInsights.cta_url"
            class="text-sm font-medium text-slate-900 underline"
          >
            {{ latestInsights?.cta_label }}
          </NuxtLinkLocale>
        </div>
      </div>
    </section>

    <section class="border-t border-slate-100 py-20 bg-slate-900">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-2xl sm:text-3xl font-semibold text-white">{{ finalCta?.heading }}</h2>
        <NuxtLinkLocale
          v-if="finalCta?.cta_url"
          :to="finalCta.cta_url"
          class="inline-block mt-6 rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-medium hover:bg-slate-100"
        >
          {{ finalCta?.cta_label }}
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>
