<script setup lang="ts">
const { t } = useI18n()
const { data } = await useResearchList()

useSeoMeta({ title: t('nav.research') })
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-semibold text-slate-900">{{ t('nav.research') }}</h1>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <NuxtLinkLocale
        v-for="post in data?.data ?? []"
        :key="post.id"
        :to="`/research/${post.slug}`"
        class="block rounded-xl border border-slate-200 p-6 hover:border-slate-900 transition-colors"
      >
        <p v-if="post.topic" class="text-xs font-medium uppercase tracking-wide text-slate-500">
          {{ post.topic.name }}
        </p>
        <h2 class="mt-2 text-lg font-semibold text-slate-900">{{ post.title }}</h2>
        <p class="mt-2 text-sm text-slate-600">{{ post.excerpt }}</p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
