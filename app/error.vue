<script setup lang="ts">
import type { NuxtError } from '#app'
import viMessages from '~~/i18n/locales/vi.json'
import enMessages from '~~/i18n/locales/en.json'

const props = defineProps<{ error: NuxtError }>()

const route = useRoute()

const detectedLocale = computed(() => (route.path.startsWith('/en') ? 'en' : 'vi'))
const messages = computed(() => (detectedLocale.value === 'en' ? enMessages : viMessages))

const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => (is404.value ? messages.value.errorPage.title404 : messages.value.errorPage.titleGeneric),
})

function handleBackHome() {
  clearError({ redirect: detectedLocale.value === 'en' ? '/en' : '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-margin-mobile text-center bg-canvas">
    <p class="font-label-md text-sm font-medium text-secondary">{{ error.statusCode }}</p>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile text-primary">
      {{ is404 ? messages.errorPage.title404 : messages.errorPage.titleGeneric }}
    </h1>
    <p class="mt-sm font-body-md text-on-surface-variant">
      {{ is404 ? messages.errorPage.body404 : messages.errorPage.bodyGeneric }}
    </p>
    <button
      class="mt-xl bg-secondary text-white px-xl py-md rounded-xl font-label-md hover:opacity-90 transition-all"
      @click="handleBackHome"
    >
      {{ messages.errorPage.backHome }}
    </button>
  </div>
</template>
