<script setup lang="ts">
const { t } = useI18n()
const { data: postsData } = await usePostsList()
const { data: researchData } = await useResearchList()

const activeTab = ref<'posts' | 'research'>('posts')

useSeoMeta({ title: t('nav.insights') })
</script>

<template>
  <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop py-xl">
    <div class="max-w-2xl">
      <span class="font-label-md text-label-md text-secondary uppercase tracking-wider">{{ t('nav.insights') }}</span>
      <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ t('nav.insights') }}</h1>
    </div>

    <div class="mt-lg flex gap-sm border-b border-outline-variant/30">
      <button
        type="button"
        class="px-md py-sm text-sm font-medium border-b-2 -mb-px transition-colors"
        :class="activeTab === 'posts' ? 'border-secondary text-secondary' : 'border-transparent text-on-surface-variant hover:text-secondary'"
        @click="activeTab = 'posts'"
      >
        {{ t('insights.tabPosts') }}
      </button>
      <button
        type="button"
        class="px-md py-sm text-sm font-medium border-b-2 -mb-px transition-colors"
        :class="activeTab === 'research' ? 'border-secondary text-secondary' : 'border-transparent text-on-surface-variant hover:text-secondary'"
        @click="activeTab = 'research'"
      >
        {{ t('insights.tabResearch') }}
      </button>
    </div>

    <div v-if="activeTab === 'posts'" class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="post in postsData?.data ?? []"
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

      <p v-if="!postsData?.data?.length" class="font-body-md text-on-surface-variant col-span-full">
        {{ t('insights.empty') }}
      </p>
    </div>

    <div v-else class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <NuxtLinkLocale
        v-for="post in researchData?.data ?? []"
        :key="post.id"
        :to="`/research/${post.slug}`"
        class="group block bg-white rounded-xl premium-border p-md hover-lift"
      >
        <p v-if="post.topic" class="text-xs font-bold uppercase tracking-widest text-secondary">
          {{ post.topic.name }}
        </p>
        <h2 class="mt-2 font-headline-sm text-primary group-hover:text-secondary transition-colors">{{ post.title }}</h2>
        <p class="mt-xs font-body-md text-on-surface-variant">{{ post.excerpt }}</p>
      </NuxtLinkLocale>

      <p v-if="!researchData?.data?.length" class="font-body-md text-on-surface-variant col-span-full">
        {{ t('insights.empty') }}
      </p>
    </div>
  </div>
</template>
