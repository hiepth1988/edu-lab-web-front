<script setup lang="ts">
const { t } = useI18n()
const { data: postsData } = await usePostsList()
const { data: researchData } = await useResearchList()

const activeTab = ref<'posts' | 'research'>('posts')

usePageSeo({ title: () => t('seo.insightsTitle'), description: () => t('seo.insightsDescription') })
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
      <PostCard v-for="post in postsData?.data ?? []" :key="post.id" :post="post" />

      <p v-if="!postsData?.data?.length" class="font-body-md text-on-surface-variant col-span-full">
        {{ t('insights.empty') }}
      </p>
    </div>

    <div v-else class="mt-xl grid grid-cols-1 sm:grid-cols-2 gap-md">
      <PostCard v-for="post in researchData?.data ?? []" :key="post.id" :post="{ ...post, type: 'research' }" />

      <p v-if="!researchData?.data?.length" class="font-body-md text-on-surface-variant col-span-full">
        {{ t('insights.empty') }}
      </p>
    </div>
  </div>
</template>
