<script setup lang="ts">
interface FeatureGroup {
  icon?: string
  title: string
  items: string[]
}
interface Fact {
  icon?: string
  label: string
  value: string
}
interface StarterExtra {
  eyebrow?: string
  price_prefix?: string
  price?: string
  price_unit?: string
  price_note?: string
  hint?: string
  secondary_cta_label?: string
  secondary_cta_url?: string
  groups?: FeatureGroup[]
  facts?: Fact[]
}

const props = defineProps<{
  section: {
    heading: string | null
    body: string | null
    cta_label: string | null
    cta_url: string | null
    extra: Record<string, unknown> | null
  }
}>()

const extra = computed(() => (props.section.extra ?? {}) as StarterExtra)
</script>

<template>
  <section class="py-xl px-margin-mobile sm:px-margin-desktop max-w-max-width mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-xl items-start">
      <div class="lg:sticky lg:top-28 space-y-md">
        <span
          v-if="extra.eyebrow"
          class="inline-block py-1 px-4 rounded-full border border-secondary/20 text-secondary bg-secondary/5 font-label-md"
        >
          {{ extra.eyebrow }}
        </span>
        <h2 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ section.heading }}</h2>
        <p class="font-body-lg text-on-surface-variant">{{ section.body }}</p>
        <div v-if="extra.price" class="bg-primary text-white rounded-xl p-md space-y-xs">
          <span class="font-label-md text-on-primary-container uppercase tracking-widest">{{ extra.price_prefix }}</span>
          <p class="flex items-baseline gap-xs flex-wrap">
            <span class="font-display-lg text-headline-lg-mobile sm:text-headline-lg text-secondary-fixed">{{ extra.price }}</span>
            <span class="font-label-md text-on-primary-container">{{ extra.price_unit }}</span>
          </p>
          <p v-if="extra.price_note" class="text-sm text-on-primary-container">{{ extra.price_note }}</p>
        </div>
        <p v-if="extra.hint" class="font-body-md text-on-surface-variant">{{ extra.hint }}</p>
        <div class="flex flex-wrap items-center gap-md">
          <NuxtLinkLocale
            v-if="section.cta_url"
            :to="section.cta_url"
            class="inline-block bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all"
          >
            {{ section.cta_label }}
          </NuxtLinkLocale>
          <NuxtLinkLocale
            v-if="extra.secondary_cta_url"
            :to="extra.secondary_cta_url"
            class="text-secondary font-label-md flex items-center gap-xs hover:underline"
          >
            {{ extra.secondary_cta_label }} <span class="material-symbols-outlined">arrow_forward</span>
          </NuxtLinkLocale>
        </div>
      </div>
      <div class="lg:col-span-2 space-y-md">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div v-for="group in extra.groups ?? []" :key="group.title" class="bg-white premium-border rounded-xl p-md space-y-sm">
            <div class="flex items-center gap-sm">
              <span v-if="group.icon" class="material-symbols-outlined text-secondary text-3xl">{{ group.icon }}</span>
              <h3 class="font-headline-sm text-primary">{{ group.title }}</h3>
            </div>
            <ul class="space-y-xs">
              <li v-for="item in group.items" :key="item" class="flex items-start gap-xs font-body-md text-on-surface-variant">
                <span class="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">check_circle</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="extra.facts?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-md">
          <div v-for="fact in extra.facts" :key="fact.label" class="bg-surface-container-low rounded-xl p-md flex items-start gap-sm">
            <span v-if="fact.icon" class="material-symbols-outlined text-secondary">{{ fact.icon }}</span>
            <div>
              <p class="font-label-md text-outline uppercase tracking-wider text-xs">{{ fact.label }}</p>
              <p class="font-body-md text-primary font-medium">{{ fact.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
