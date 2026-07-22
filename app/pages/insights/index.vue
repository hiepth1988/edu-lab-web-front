<script setup lang="ts">
const { t } = useI18n()
const { data } = await usePostsList()

useSeoMeta({ title: t('nav.insights') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.insights') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.insights') }}</h1>
    </div>

    <div class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="post in data?.data ?? []"
        :key="post.id"
        :to="`/insights/${post.slug}`"
        class="group block bg-white rounded-xl premium-border overflow-hidden hover-lift"
      >
        <div v-if="post.featured_image" class="h-40 overflow-hidden">
          <img :src="post.featured_image" :alt="post.title" class="h-full w-full object-cover" />
        </div>
        <div class="p-md">
          <p v-if="post.category" class="text-xs font-bold uppercase tracking-widest text-secondary">
            {{ post.category.name }}
          </p>
          <h2 class="mt-2 font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ post.title }}</h2>
          <p class="mt-xs font-body-md text-on-surface-variant">{{ post.excerpt }}</p>
        </div>
      </NuxtLinkLocale>
    </div>

    <p v-if="!data?.data?.length" class="mt-xl font-body-md text-on-surface-variant">
      {{ t('insights.empty') }}
    </p>
  </div>
</template>
