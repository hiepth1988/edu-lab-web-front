<script setup lang="ts">
import { postPath, type PostSummary } from '~/composables/usePosts'

// Card for an article or research item in a listing.
const props = defineProps<{ post: PostSummary }>()
</script>

<template>
  <NuxtLinkLocale
    :to="postPath(props.post.type, props.post.slug)"
    class="group block bg-white rounded-xl premium-border overflow-hidden hover-lift"
  >
    <div v-if="post.featured_image" class="aspect-[1200/630] overflow-hidden">
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
</template>
