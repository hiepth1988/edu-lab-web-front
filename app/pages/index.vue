<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { data } = await usePageContent('home')

function section(key: string) {
  return computed(() => data.value?.sections.find((s) => s.section_key === key)?.translation)
}

interface Card {
  icon?: string
  title: string
  body?: string
  image?: string
  to?: string
}
interface Step {
  n: string
  label: string
}
interface Item {
  title: string
  body?: string
}
interface Phase {
  n: string
  title: string
  body?: string
}
interface Tile {
  type: 'image' | 'icon'
  size: 'lg' | 'sm'
  tone?: string
  icon?: string
  image?: string
  title: string
  body?: string
}
interface Plan {
  title: string
  body?: string
  cta_label?: string
  cta_url?: string
  featured?: boolean
  badge?: string
}

const hero = section('hero')
const problem = section('problem')
const whoWeHelp = section('who_we_help')
const solutions = section('solutions')
const journey = section('journey')
const ecosystem = section('tech_capability')
const process = section('process')
const scale = section('scale')
const partnership = section('partnership')
const philosophy = section('philosophy')
const researchLab = section('research_lab')
const ourWork = section('our_work')
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
    <!-- Hero -->
    <section class="relative pt-xl pb-xl lg:pb-0 lg:min-h-[85vh] flex items-center overflow-hidden">
      <div class="relative z-10 max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        <div class="space-y-md">
          <span
            v-if="(hero?.extra as any)?.eyebrow"
            class="inline-block py-1 px-4 rounded-full border border-secondary/20 text-secondary bg-secondary/5 font-label-md"
          >
            {{ (hero?.extra as any)?.eyebrow }}
          </span>
          <h1 class="font-display-lg text-headline-lg-mobile sm:text-display-lg text-primary leading-tight">
            {{ hero?.heading }}
          </h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            {{ hero?.subheading }}
          </p>
          <div class="flex flex-wrap gap-md pt-sm">
            <NuxtLinkLocale
              v-if="hero?.cta_url"
              :to="hero.cta_url"
              class="bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all text-lg"
            >
              {{ hero?.cta_label }}
            </NuxtLinkLocale>
            <NuxtLinkLocale
              v-if="(hero?.extra as any)?.secondary_cta_url"
              :to="(hero?.extra as any).secondary_cta_url"
              class="bg-white premium-border text-primary px-xl py-md rounded-xl font-label-md hover:bg-surface-container-low transition-all text-lg"
            >
              {{ (hero?.extra as any).secondary_cta_label }}
            </NuxtLinkLocale>
          </div>
          <div v-if="(hero?.extra as any)?.quote" class="pt-lg flex items-start gap-sm">
            <div class="flex -space-x-3 shrink-0 pt-0.5">
              <img src="/images/home/hero-avatar-1.jpg" alt="" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="/images/home/hero-avatar-2.jpg" alt="" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
              <img src="/images/home/hero-avatar-3.jpg" alt="" class="w-10 h-10 rounded-full border-2 border-white object-cover" />
            </div>
            <p class="min-w-0 flex-1 font-label-md text-on-surface-variant italic leading-snug">"{{ (hero?.extra as any).quote }}"</p>
          </div>
        </div>
        <div class="hidden lg:block relative">
          <div class="aspect-square glass-card rounded-full flex items-center justify-center p-md border-2 border-dashed border-secondary/30 relative">
            <div class="w-full h-full rounded-xl bg-cover bg-center overflow-hidden">
              <img src="/images/home/hero-visual.jpg" alt="" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem -->
    <section v-if="problem" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto">
      <div class="text-center mb-xl">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-md">{{ problem.heading }}</h2>
        <p class="font-body-lg text-on-surface-variant max-w-2xl mx-auto">{{ problem.body }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div v-for="card in ((problem.extra as any)?.cards as Card[] ?? [])" :key="card.title" class="glass-card p-md rounded-xl space-y-md border-t-4 border-t-error/30">
          <span class="material-symbols-outlined text-error text-4xl">{{ card.icon }}</span>
          <h3 class="font-headline-sm text-primary">{{ card.title }}</h3>
          <p class="font-body-md text-on-surface-variant">{{ card.body }}</p>
        </div>
      </div>
    </section>

    <!-- Who We Help -->
    <section v-if="whoWeHelp" class="py-xl bg-surface-container-low">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-xl gap-md">
          <div class="max-w-2xl">
            <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ whoWeHelp.heading }}</h2>
          </div>
          <NuxtLinkLocale
            v-if="whoWeHelp.cta_url"
            :to="whoWeHelp.cta_url"
            class="text-secondary font-label-md flex items-center gap-xs hover:underline whitespace-nowrap"
          >
            {{ whoWeHelp.cta_label }} <span class="material-symbols-outlined">arrow_forward</span>
          </NuxtLinkLocale>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
          <NuxtLinkLocale
            v-for="card in ((whoWeHelp.extra as any)?.cards as Card[] ?? [])"
            :key="card.title"
            :to="card.to ?? '/who-we-help'"
            class="block bg-white p-md rounded-xl hover-lift"
          >
            <div class="h-40 bg-slate-100 rounded-lg mb-md overflow-hidden">
              <img v-if="card.image" :src="card.image" :alt="card.title" class="h-full w-full object-cover" />
            </div>
            <h4 class="font-headline-sm text-primary mb-xs">{{ card.title }}</h4>
            <p class="font-body-md text-on-surface-variant">{{ card.body }}</p>
          </NuxtLinkLocale>
        </div>
      </div>
    </section>

    <!-- Journey -->
    <section v-if="journey" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto">
      <div class="text-center mb-xl">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ journey.heading }}</h2>
      </div>
      <div class="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-lg items-start">
        <template v-for="(step, i) in ((journey.extra as any)?.steps as Step[] ?? [])" :key="step.n">
          <div class="flex flex-col items-center gap-xs w-20 sm:w-24 text-center">
            <div
              class="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center font-bold transition-all"
              :class="i === ((journey.extra as any)?.steps.length - 1)
                ? 'bg-secondary text-white ring-4 ring-secondary/20'
                : 'bg-surface-container-high text-primary'"
            >
              {{ step.n }}
            </div>
            <span
              class="font-label-md text-xs sm:text-sm"
              :class="i === ((journey.extra as any)?.steps.length - 1) ? 'text-secondary font-bold' : 'text-on-surface-variant'"
            >
              {{ step.label }}
            </span>
          </div>
          <div v-if="i < ((journey.extra as any)?.steps.length - 1)" class="hidden sm:block w-6 h-px bg-outline-variant mt-6 sm:mt-8" />
        </template>
      </div>
    </section>

    <!-- Ecosystem -->
    <section v-if="ecosystem" class="py-xl bg-primary text-white overflow-hidden relative">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-xl items-center relative z-10">
        <div>
          <h2 class="font-display-lg text-headline-lg-mobile sm:text-display-lg text-white mb-md">{{ ecosystem.heading }}</h2>
          <p class="font-body-lg text-on-primary-container mb-lg">{{ ecosystem.body }}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div v-for="item in ((ecosystem.extra as any)?.items as Item[] ?? [])" :key="item.title" class="space-y-xs">
              <h4 class="font-headline-sm text-secondary-fixed">{{ item.title }}</h4>
              <p class="text-on-primary-container font-body-md">{{ item.body }}</p>
            </div>
          </div>
        </div>
        <div class="relative h-[320px] lg:h-[420px]">
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-56 h-56 border border-secondary-fixed/30 rounded-full" />
            <div class="absolute w-72 h-72 border border-secondary-fixed/20 rounded-full" />
            <img src="/images/home/ecosystem-visual.jpg" alt="" class="relative w-full h-full object-contain rounded-xl mix-blend-luminosity opacity-80" />
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section v-if="process" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto">
      <div class="flex flex-col md:flex-row items-start gap-xl">
        <div class="w-full md:w-1/3">
          <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-sm">{{ process.heading }}</h2>
          <p class="font-body-md text-on-surface-variant">{{ process.body }}</p>
        </div>
        <div class="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-xs">
          <div
            v-for="phase in ((process.extra as any)?.phases as Phase[] ?? [])"
            :key="phase.n"
            class="p-4 hover:bg-surface-container-low rounded-xl transition-colors"
          >
            <span class="text-label-sm uppercase tracking-widest text-outline mb-2 block">{{ phase.n }}</span>
            <h5 class="font-headline-sm text-primary mb-2">{{ phase.title }}</h5>
            <p class="text-xs text-on-surface-variant">{{ phase.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Scale -->
    <section v-if="scale" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto">
      <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xl text-center">{{ scale.heading }}</h2>
      <div class="grid grid-cols-12 gap-md">
        <div
          v-for="tile in ((scale.extra as any)?.tiles as Tile[] ?? [])"
          :key="tile.title"
          class="relative overflow-hidden rounded-xl"
          :class="[
            tile.size === 'lg' ? 'col-span-12 md:col-span-6 h-[320px]' : 'col-span-12 md:col-span-6 h-[280px]',
            tile.type === 'image' ? 'bg-white premium-border' : (tile.tone === 'accent' ? 'bg-secondary-container' : 'bg-surface-container'),
          ]"
        >
          <template v-if="tile.type === 'image'">
            <img :src="tile.image" :alt="tile.title" class="h-full w-full object-cover" />
            <div class="absolute bottom-0 left-0 p-md bg-gradient-to-t from-black/60 to-transparent w-full text-white">
              <h4 class="font-headline-sm">{{ tile.title }}</h4>
              <p v-if="tile.body" class="font-body-md mt-1 text-white/90">{{ tile.body }}</p>
            </div>
          </template>
          <template v-else>
            <div class="h-full p-md flex flex-col justify-between">
              <span class="material-symbols-outlined text-secondary text-4xl">{{ tile.icon }}</span>
              <div>
                <h4 class="font-headline-sm text-primary">{{ tile.title }}</h4>
                <p class="font-body-md text-on-surface-variant mt-2">{{ tile.body }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- Partnership -->
    <section v-if="partnership" class="py-xl bg-surface-container-high">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xl text-center">{{ partnership.heading }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
          <div
            v-for="plan in ((partnership.extra as any)?.plans as Plan[] ?? [])"
            :key="plan.title"
            class="bg-white p-lg rounded-xl flex flex-col items-center text-center space-y-md"
            :class="plan.featured ? 'ring-4 ring-secondary/10 border border-secondary/50' : 'border border-outline-variant/30'"
          >
            <div v-if="plan.badge" class="bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold">{{ plan.badge }}</div>
            <h3 class="font-headline-sm text-primary">{{ plan.title }}</h3>
            <p class="font-body-md text-on-surface-variant">{{ plan.body }}</p>
            <NuxtLinkLocale
              v-if="plan.cta_url"
              :to="plan.cta_url"
              :class="plan.featured
                ? 'bg-secondary text-white px-md py-sm rounded-full w-full'
                : 'text-secondary font-bold underline'"
            >
              {{ plan.cta_label }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section v-if="philosophy" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto text-center">
      <div class="max-w-3xl mx-auto py-lg">
        <span class="text-6xl font-display-lg text-secondary/30">"</span>
        <p class="font-display-lg text-headline-lg-mobile sm:text-headline-lg text-primary -mt-8 mb-4">
          {{ philosophy.body }}
        </p>
        <cite class="font-label-md text-on-surface-variant not-italic uppercase tracking-widest">
          — {{ (philosophy.extra as any)?.cite }}
        </cite>
      </div>
    </section>

    <!-- Research Lab -->
    <section v-if="researchLab" class="border-t border-outline-variant/20 py-xl">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop text-center">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ researchLab.heading }}</h2>
        <p class="mt-sm font-body-lg text-on-surface-variant max-w-2xl mx-auto">{{ researchLab.body }}</p>
        <NuxtLinkLocale
          v-if="researchLab.cta_url"
          :to="researchLab.cta_url"
          class="inline-block mt-md text-secondary font-label-md hover:underline"
        >
          {{ researchLab.cta_label }} →
        </NuxtLinkLocale>
      </div>
    </section>

    <!-- Our Work -->
    <section v-if="ourWork" class="border-t border-outline-variant/20 py-xl bg-surface-container-low">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop text-center">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ ourWork.heading }}</h2>
        <p class="mt-sm font-body-lg text-on-surface-variant max-w-2xl mx-auto">{{ ourWork.body }}</p>
        <NuxtLinkLocale
          v-if="ourWork.cta_url"
          :to="ourWork.cta_url"
          class="inline-block mt-md text-secondary font-label-md hover:underline"
        >
          {{ ourWork.cta_label }} →
        </NuxtLinkLocale>
      </div>
    </section>

    <!-- Insights -->
    <section v-if="latestPosts.length" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto">
      <div class="flex justify-between items-end mb-xl">
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ latestInsights?.heading }}</h2>
        <NuxtLinkLocale v-if="latestInsights?.cta_url" :to="latestInsights.cta_url" class="text-secondary font-label-md whitespace-nowrap">
          {{ latestInsights?.cta_label }}
        </NuxtLinkLocale>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
        <NuxtLinkLocale
          v-for="post in latestPosts"
          :key="post.id"
          :to="`/insights/${post.slug}`"
          class="group block bg-white rounded-xl premium-border overflow-hidden hover-lift"
        >
          <div class="h-40 bg-surface-container-high overflow-hidden">
            <img v-if="post.featured_image" :src="post.featured_image" :alt="post.title" class="h-full w-full object-cover" />
          </div>
          <div class="p-md">
            <span v-if="post.category" class="text-secondary text-xs font-bold uppercase tracking-widest">{{ post.category.name }}</span>
            <h4 class="font-headline-sm text-primary mt-2 group-hover:text-secondary transition-colors">{{ post.title }}</h4>
          </div>
        </NuxtLinkLocale>
      </div>
    </section>

    <!-- Final CTA -->
    <section v-if="finalCta" class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto mb-xl">
      <div class="bg-primary text-white rounded-[48px] p-lg sm:p-xl text-center relative overflow-hidden">
        <div class="relative z-10 max-w-2xl mx-auto space-y-md">
          <h2 class="font-display-lg text-headline-lg-mobile sm:text-headline-lg">{{ finalCta.heading }}</h2>
          <p v-if="finalCta.body" class="font-body-lg text-on-primary-container">{{ finalCta.body }}</p>
          <div class="pt-md">
            <NuxtLinkLocale
              v-if="finalCta.cta_url"
              :to="finalCta.cta_url"
              class="inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all text-lg shadow-xl shadow-secondary/20"
            >
              {{ finalCta.cta_label }}
            </NuxtLinkLocale>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
