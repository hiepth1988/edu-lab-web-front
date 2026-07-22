<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const available = computed(() =>
  (locales.value as Array<{ code: string; name?: string }>).filter(
    (l) => l.code !== locale.value,
  ),
)
</script>

<template>
  <div class="flex items-center gap-2 text-sm">
    <button
      v-for="l in available"
      :key="l.code"
      class="rounded-full border border-outline-variant/50 px-3 py-1 text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors"
      @click="setLocale(l.code as 'vi' | 'en')"
    >
      {{ l.code.toUpperCase() }}
    </button>
  </div>
</template>
