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
  <div class="min-h-screen flex flex-col items-center justify-center px-6 text-center">
    <p class="text-sm font-medium text-slate-400">{{ error.statusCode }}</p>
    <h1 class="mt-2 text-2xl font-semibold text-slate-900">
      {{ is404 ? messages.errorPage.title404 : messages.errorPage.titleGeneric }}
    </h1>
    <p class="mt-3 text-slate-600">
      {{ is404 ? messages.errorPage.body404 : messages.errorPage.bodyGeneric }}
    </p>
    <button
      class="mt-8 rounded-full bg-slate-900 text-white px-6 py-3 text-sm font-medium hover:bg-slate-800"
      @click="handleBackHome"
    >
      {{ messages.errorPage.backHome }}
    </button>
  </div>
</template>
