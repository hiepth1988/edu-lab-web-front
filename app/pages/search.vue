<script setup lang="ts">
import type { SearchResult } from '~/composables/useSearch'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { search } = useSearch()

const q = ref((route.query.q as string) ?? '')
const results = ref<SearchResult[]>([])
const loading = ref(false)

const typeToPath: Record<SearchResult['type'], string> = {
  post: '/insights',
  research: '/research',
  project: '/our-work',
}

async function runSearch() {
  if (!q.value.trim()) {
    results.value = []
    return
  }
  loading.value = true
  router.replace({ query: { q: q.value } })
  results.value = await search(q.value)
  loading.value = false
}

onMounted(() => {
  if (q.value) runSearch()
})

useSeoMeta({ title: () => t('search.title') })
</script>

<template>
  <div class="max-w-2xl mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <h1 class="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('search.title') }}</h1>

    <form class="mt-md flex gap-2" @submit.prevent="runSearch">
      <input
        v-model="q"
        type="text"
        :placeholder="t('search.placeholder')"
        class="flex-1 rounded-lg border border-outline-variant/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary"
      />
      <button type="submit" class="rounded-lg bg-secondary text-white text-sm font-medium px-5 py-2.5 hover:opacity-90">
        {{ t('search.submit') }}
      </button>
    </form>

    <div v-if="loading" class="mt-lg font-body-md text-on-surface-variant">{{ t('search.loading') }}</div>

    <div v-else class="mt-lg space-y-md">
      <NuxtLinkLocale
        v-for="(result, i) in results"
        :key="i"
        :to="`${typeToPath[result.type]}/${result.slug}`"
        class="group block bg-white rounded-xl premium-border p-md hover-lift"
      >
        <p class="text-xs font-bold uppercase tracking-widest text-secondary">{{ t(`search.types.${result.type}`) }}</p>
        <h2 class="mt-1 font-headline-sm text-sm text-primary group-hover:text-secondary transition-colors">{{ result.title }}</h2>
        <p class="mt-1 font-body-md text-sm text-on-surface-variant">{{ result.excerpt }}</p>
      </NuxtLinkLocale>

      <p v-if="!loading && q && !results.length" class="font-body-md text-on-surface-variant">{{ t('search.empty') }}</p>
    </div>
  </div>
</template>
