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

const colorCircleClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  secondary: 'bg-secondary-container text-secondary',
  gold: 'bg-gold/15 text-gold',
}

function colorCircleClass(color: string | null) {
  return colorCircleClasses[color ?? 'primary'] ?? colorCircleClasses.primary
}

const resultCardClasses: Record<string, string> = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-white',
  gold: 'bg-white premium-border text-primary',
}

function resultCardClass(color: string | null) {
  return resultCardClasses[color ?? 'primary'] ?? resultCardClasses.primary
}

const activeGalleryFilter = ref<string | null>(null)

const filteredGalleryImages = computed(() => {
  const images = data.value?.data.gallery_images ?? []
  if (!activeGalleryFilter.value) return images
  return images.filter((img) => img.category_key === activeGalleryFilter.value)
})
</script>

<template>
  <div v-if="data">
    <!-- Hero -->
    <section class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop pt-xl pb-xl">
      <div class="grid lg:grid-cols-2 gap-xl items-center">
        <div class="space-y-sm">
          <span v-if="data.data.hero_eyebrow" class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ data.data.hero_eyebrow }}</span>
          <h1 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-xl">{{ data.data.excerpt }}</p>

          <div v-if="data.data.hero_badges.length" class="flex flex-wrap gap-xs pt-base">
            <span
              v-for="(badge, i) in data.data.hero_badges"
              :key="i"
              class="inline-flex items-center gap-1.5 bg-surface-container px-sm py-1.5 rounded-full text-primary font-label-md text-xs"
            >
              <span v-if="badge.icon" class="material-symbols-outlined text-[16px]">{{ badge.icon }}</span>
              {{ badge.label }}
            </span>
          </div>

          <a
            v-if="data.data.hero_cta_label && data.data.hero_cta_url"
            :href="data.data.hero_cta_url"
            class="inline-block bg-secondary text-white px-lg py-sm rounded-xl font-label-md hover:opacity-90 transition-all mt-md"
          >
            {{ data.data.hero_cta_label }}
          </a>

          <div v-if="data.data.hero_stats.length" class="grid grid-cols-2 sm:grid-cols-4 gap-md pt-lg border-t border-outline-variant/30 mt-md">
            <div v-for="(stat, i) in data.data.hero_stats" :key="i">
              <div class="font-headline-sm text-headline-sm text-primary">{{ stat.value }}</div>
              <div class="text-xs text-on-surface-variant">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <div v-if="data.data.featured_image" class="rounded-2xl overflow-hidden premium-border">
          <img :src="data.data.featured_image" :alt="data.data.title" class="w-full aspect-[4/3] object-cover" />
        </div>
      </div>
    </section>

    <!-- Project Snapshot -->
    <section v-if="data.data.snapshot_items.length" class="bg-surface-container-low py-lg">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-md">
        <div v-for="(item, i) in data.data.snapshot_items" :key="i" class="bg-white p-md rounded-xl premium-border space-y-xs">
          <span v-if="item.icon" class="material-symbols-outlined text-secondary">{{ item.icon }}</span>
          <div class="text-xs text-on-surface-variant uppercase tracking-tighter">{{ item.label }}</div>
          <div class="font-label-md text-sm font-bold text-primary">{{ item.value }}</div>
        </div>
      </div>
    </section>

    <!-- Project Scale -->
    <section v-if="data.data.scale_stats.length" class="py-xl max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
      <div v-if="data.data.scale_heading || data.data.scale_description" class="text-center mb-xl max-w-2xl mx-auto">
        <h2 v-if="data.data.scale_heading" class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xs">{{ data.data.scale_heading }}</h2>
        <p v-if="data.data.scale_description" class="font-body-lg text-on-surface-variant">{{ data.data.scale_description }}</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-md">
        <div v-for="(stat, i) in data.data.scale_stats" :key="i" class="p-md rounded-2xl premium-border bg-white hover-lift">
          <div class="font-display-lg text-headline-lg text-primary leading-none mb-xs">{{ stat.value }}</div>
          <div class="font-label-md text-sm text-on-surface-variant">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- The Challenge -->
    <section v-if="data.data.challenges.length" class="py-xl bg-surface-container">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
        <div v-if="data.data.challenges_heading || data.data.challenges_description" class="mb-lg max-w-2xl">
          <h2 v-if="data.data.challenges_heading" class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xs">{{ data.data.challenges_heading }}</h2>
          <p v-if="data.data.challenges_description" class="font-body-md text-on-surface-variant">{{ data.data.challenges_description }}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          <div
            v-for="(challenge, i) in data.data.challenges"
            :key="i"
            class="bg-white p-lg rounded-2xl hover-lift space-y-sm"
            :class="challenge.wide ? 'lg:col-span-2' : ''"
          >
            <div class="w-12 h-12 rounded-full flex items-center justify-center" :class="colorCircleClass(challenge.color)">
              <span v-if="challenge.icon" class="material-symbols-outlined">{{ challenge.icon }}</span>
            </div>
            <h3 class="font-headline-sm text-primary">{{ challenge.title }}</h3>
            <p class="font-body-md text-sm text-on-surface-variant">{{ challenge.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Feature Map -->
    <section v-if="data.data.feature_groups.length" class="py-xl max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
      <h2 v-if="data.data.feature_map_heading" class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xl text-center">{{ data.data.feature_map_heading }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-sm">
        <div v-for="(group, i) in data.data.feature_groups" :key="i" class="p-md rounded-2xl bg-white premium-border hover:border-secondary transition-colors">
          <h4 class="font-label-md text-sm font-bold text-secondary mb-sm">{{ group.title }}</h4>
          <ul class="space-y-xs text-xs text-on-surface-variant">
            <li v-for="(feature, fi) in group.features" :key="fi" class="flex items-center gap-xs">
              <span class="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
              {{ feature }}
            </li>
          </ul>
          <div v-if="group.badge_label" class="mt-md pt-sm border-t border-outline-variant text-[10px] font-bold text-outline">{{ group.badge_label }}</div>
        </div>
      </div>
    </section>

    <!-- Product Journey -->
    <section v-if="data.data.journey_steps.length" class="py-xl overflow-x-auto">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop min-w-[900px]">
        <h2 v-if="data.data.journey_heading" class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-xl text-center">{{ data.data.journey_heading }}</h2>
        <div class="flex justify-between gap-sm">
          <div v-for="(step, i) in data.data.journey_steps" :key="i" class="flex-1 flex flex-col items-center text-center gap-xs">
            <div class="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">{{ i + 1 }}</div>
            <div class="font-label-md text-sm font-bold text-primary">{{ step.title }}</div>
            <div class="text-[11px] text-on-surface-variant max-w-[130px]">{{ step.description }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Solution Modules -->
    <section v-if="data.data.solution_modules.length" class="py-xl space-y-xl max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
      <div v-for="(module, i) in data.data.solution_modules" :key="i" class="flex flex-col lg:flex-row gap-xl items-center">
        <div v-if="i % 2 === 1" class="w-full lg:w-1/2">
          <img v-if="module.image" :src="module.image" :alt="module.title ?? ''" class="w-full rounded-2xl premium-border object-cover" />
        </div>

        <div class="w-full lg:w-1/2 space-y-sm">
          <h3 class="font-headline-md text-headline-md text-primary">{{ module.title }}</h3>
          <p class="font-body-md text-on-surface-variant">{{ module.description }}</p>
          <ul v-if="module.features.length" class="space-y-xs pt-base">
            <li v-for="(feature, fi) in module.features" :key="fi" class="flex items-center gap-sm font-body-md text-sm">
              <span class="material-symbols-outlined text-secondary">check_circle</span>
              {{ feature }}
            </li>
          </ul>
          <details v-if="module.technical_note" class="group premium-border rounded-xl p-md bg-surface-container-low">
            <summary class="list-none flex justify-between items-center cursor-pointer font-label-md text-sm font-bold text-primary">
              <span>{{ t('project.technicalNotes') }}</span>
              <span class="material-symbols-outlined group-open:rotate-180 transition-transform">expand_more</span>
            </summary>
            <div class="pt-sm text-xs text-on-surface-variant">{{ module.technical_note }}</div>
          </details>
        </div>

        <div v-if="i % 2 === 0" class="w-full lg:w-1/2">
          <img v-if="module.image" :src="module.image" :alt="module.title ?? ''" class="w-full rounded-2xl premium-border object-cover" />
        </div>
      </div>
    </section>

    <!-- Product Gallery -->
    <section v-if="data.data.gallery_images.length" class="py-xl bg-surface-container-highest">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
        <div class="text-center mb-lg">
          <h2 v-if="data.data.gallery_heading" class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-sm">{{ data.data.gallery_heading }}</h2>
          <div v-if="data.data.gallery_categories.length" class="flex flex-wrap justify-center gap-sm mt-sm">
            <button
              type="button"
              class="px-md py-xs rounded-full text-xs font-bold transition-colors"
              :class="activeGalleryFilter === null ? 'bg-secondary text-white' : 'bg-white text-on-surface-variant premium-border'"
              @click="activeGalleryFilter = null"
            >
              {{ t('project.galleryAll') }}
            </button>
            <button
              v-for="(cat, i) in data.data.gallery_categories"
              :key="i"
              type="button"
              class="px-md py-xs rounded-full text-xs font-bold transition-colors"
              :class="activeGalleryFilter === cat.key ? 'bg-secondary text-white' : 'bg-white text-on-surface-variant premium-border'"
              @click="activeGalleryFilter = cat.key"
            >
              {{ cat.label }}
            </button>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
          <img
            v-for="(image, i) in filteredGalleryImages"
            :key="i"
            :src="image.image_url"
            alt=""
            class="rounded-xl premium-border w-full aspect-video object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Technical Architecture -->
    <section v-if="data.data.architecture_layers.length" class="py-xl max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
      <h2 v-if="data.data.architecture_heading" class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-lg text-center">{{ data.data.architecture_heading }}</h2>
      <div class="bg-white p-lg rounded-[32px] premium-border overflow-x-auto">
        <div class="flex flex-col md:flex-row items-center justify-between min-w-[800px] gap-sm">
          <template v-for="(layer, i) in data.data.architecture_layers" :key="i">
            <div class="flex flex-col items-center gap-xs p-md premium-border rounded-xl w-40 bg-surface-container-low">
              <span v-if="layer.icon" class="material-symbols-outlined text-secondary">{{ layer.icon }}</span>
              <div class="font-label-md text-sm font-bold text-primary">{{ layer.title }}</div>
              <div class="text-[10px] text-on-surface-variant">{{ layer.subtitle }}</div>
            </div>
            <span v-if="i < data.data.architecture_layers.length - 1" class="material-symbols-outlined text-outline">arrow_forward</span>
          </template>
        </div>
      </div>
    </section>

    <!-- Technology Stack -->
    <section v-if="data.data.tech_stack_groups.length" class="py-xl bg-surface-container-low">
      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-xl">
        <div v-for="(group, i) in data.data.tech_stack_groups" :key="i" class="space-y-sm">
          <h4 class="font-label-md text-sm font-bold text-secondary border-b border-secondary/20 pb-xs">{{ group.title }}</h4>
          <div class="flex flex-wrap gap-xs">
            <span v-for="(item, ii) in group.items" :key="ii" class="bg-white px-sm py-1.5 rounded-lg premium-border text-xs font-medium">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Results & Impact -->
    <section v-if="data.data.results.length" class="py-xl max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
      <h2 v-if="data.data.results_heading" class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-lg text-center">{{ data.data.results_heading }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div v-for="(result, i) in data.data.results" :key="i" class="p-lg rounded-2xl flex flex-col justify-between h-48" :class="resultCardClass(result.color)">
          <span v-if="result.icon" class="material-symbols-outlined text-[40px]">{{ result.icon }}</span>
          <div>
            <div class="font-display-lg text-headline-lg leading-none">{{ result.value }}</div>
            <div class="font-label-md text-sm opacity-80">{{ result.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lessons Learned -->
    <section v-if="data.data.lessons_quote" class="py-xl max-w-4xl mx-auto px-margin-mobile">
      <div class="bg-surface-container-high p-xl rounded-[40px] text-center relative overflow-hidden">
        <span class="material-symbols-outlined text-secondary text-[48px] mb-md">format_quote</span>
        <blockquote class="font-headline-md text-headline-md italic text-primary mb-lg">"{{ data.data.lessons_quote }}"</blockquote>
        <cite v-if="data.data.lessons_citation" class="font-label-md text-sm font-bold text-secondary not-italic">{{ data.data.lessons_citation }}</cite>
      </div>
    </section>

    <!-- Related Projects -->
    <section v-if="data.data.related_projects.length" class="py-xl max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop">
      <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary mb-lg">{{ t('project.relatedProjects') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-md">
        <NuxtLinkLocale
          v-for="(related, i) in data.data.related_projects"
          :key="i"
          :to="`/our-work/${related.slug}`"
          class="block bg-white rounded-2xl overflow-hidden hover-lift premium-border group"
        >
          <div class="h-48 overflow-hidden bg-surface-container-low">
            <img
              v-if="related.featured_image"
              :src="related.featured_image"
              :alt="related.title ?? ''"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-md space-y-xs">
            <div v-if="related.category" class="text-secondary font-bold text-xs uppercase tracking-widest">{{ related.category.name }}</div>
            <h4 class="font-label-md text-sm font-bold text-primary">{{ related.title }}</h4>
          </div>
        </NuxtLinkLocale>
      </div>
    </section>

    <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop pb-xl">
      <NuxtLinkLocale
        to="/contact"
        class="inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all"
      >
        {{ t('cta.bookConsultation') }}
      </NuxtLinkLocale>
    </div>
  </div>
</template>
