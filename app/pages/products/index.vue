<script setup lang="ts">
const { t } = useI18n()
const { data } = await useProductsList()

useSeoMeta({ title: t('nav.products') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.products') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.products') }}</h1>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="product in data?.data ?? []"
        :key="product.id"
        :to="`/products/${product.slug}`"
        class="group block bg-white rounded-xl premium-border p-md hover-lift"
      >
        <div class="flex items-center justify-between gap-sm">
          <h2 class="font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ product.name }}</h2>
          <span
            v-if="product.stage"
            class="shrink-0 text-xs rounded-full border border-outline-variant/50 text-on-surface-variant px-2 py-0.5"
          >
            {{ product.stage }}
          </span>
        </div>
        <p class="mt-xs font-body-md text-on-surface-variant">{{ product.role_summary }}</p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
