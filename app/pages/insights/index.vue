<script setup lang="ts">
const { t } = useI18n()
const { data } = await usePostsList()

useSeoMeta({ title: t('nav.insights') })
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-16">
    <h1 class="text-3xl font-semibold text-slate-900">{{ t('nav.insights') }}</h1>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <NuxtLinkLocale
        v-for="post in data?.data ?? []"
        :key="post.id"
        :to="`/insights/${post.slug}`"
        class="block rounded-xl border border-slate-200 p-6 hover:border-slate-900 transition-colors"
      >
        <p v-if="post.category" class="text-xs font-medium uppercase tracking-wide text-slate-500">
          {{ post.category.name }}
        </p>
        <h2 class="mt-2 text-lg font-semibold text-slate-900">{{ post.title }}</h2>
        <p class="mt-2 text-sm text-slate-600">{{ post.excerpt }}</p>
      </NuxtLinkLocale>
    </div>

    <p v-if="!data?.data?.length" class="mt-10 text-slate-500">
      Chưa có bài viết nào được xuất bản.
    </p>
  </div>
</template>
