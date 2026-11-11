<script setup lang="ts">
const route = useRoute()
const { data, error } = await usePostDetail(route.params.slug as string)

throwIfMissing(data, error, 'Post not found')
</script>

<template>
  <PostArticle v-if="data" :post="data.data" />
</template>
