<script setup lang="ts">
const route = useRoute()
const { data, error } = await useResearchDetail(route.params.slug as string)

throwIfMissing(data, error, 'Research post not found')
</script>

<template>
  <PostArticle v-if="data" :post="data.data" />
</template>
