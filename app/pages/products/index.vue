<script setup lang="ts">
const { t } = useI18n()
const { data } = await useProductsList()

useSeoMeta({ title: t('nav.products') })
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-semibold text-slate-900">{{ t('nav.products') }}</h1>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <NuxtLinkLocale
        v-for="product in data?.data ?? []"
        :key="product.id"
        :to="`/products/${product.slug}`"
        class="block rounded-xl border border-slate-200 p-6 hover:border-slate-900 transition-colors"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-900">{{ product.name }}</h2>
          <span
            v-if="product.stage"
            class="text-xs rounded-full bg-slate-100 text-slate-600 px-2 py-0.5"
          >
            {{ product.stage }}
          </span>
        </div>
        <p class="mt-2 text-sm text-slate-600">{{ product.role_summary }}</p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
