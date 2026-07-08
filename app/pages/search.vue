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
  'case-study': '/case-studies',
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
  <div class="max-w-2xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-semibold text-slate-900">{{ t('search.title') }}</h1>

    <form class="mt-6 flex gap-2" @submit.prevent="runSearch">
      <input
        v-model="q"
        type="text"
        :placeholder="t('search.placeholder')"
        class="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm"
      />
      <button type="submit" class="rounded-lg bg-slate-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-slate-800">
        {{ t('search.submit') }}
      </button>
    </form>

    <div v-if="loading" class="mt-8 text-slate-400">{{ t('search.loading') }}</div>

    <div v-else class="mt-8 space-y-4">
      <NuxtLinkLocale
        v-for="(result, i) in results"
        :key="i"
        :to="`${typeToPath[result.type]}/${result.slug}`"
        class="block rounded-xl border border-slate-200 p-5 hover:border-slate-900 transition-colors"
      >
        <p class="text-xs uppercase tracking-wide text-slate-500">{{ t(`search.types.${result.type}`) }}</p>
        <h2 class="mt-1 font-semibold text-slate-900">{{ result.title }}</h2>
        <p class="mt-1 text-sm text-slate-600">{{ result.excerpt }}</p>
      </NuxtLinkLocale>

      <p v-if="!loading && q && !results.length" class="text-slate-400">{{ t('search.empty') }}</p>
    </div>
  </div>
</template>
