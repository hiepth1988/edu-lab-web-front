<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { data } = await usePostDetail(route.params.slug as string)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

usePageSeo({
  title: () => data.value?.data.meta_title || data.value?.data.title,
  description: () => data.value?.data.meta_description || data.value?.data.excerpt || undefined,
  image: () => data.value?.data.og_image || data.value?.data.featured_image || undefined,
  type: 'article',
})

useLocalizedSlugs(() => data.value?.data.alternate_slugs)

const absoluteUrl = useAbsoluteUrl()

const config = useRuntimeConfig()
// Posts without a custom CTA get the site-wide default; `cta: null` means the post turned it off.
const cta = computed(() => {
  const c = data.value?.data.cta
  if (!c) return null
  return {
    text: c.text || t('detail.postCtaText'),
    label: c.label || t('detail.postCtaLabel'),
    url: c.url || (config.public.postCtaUrl as string),
  }
})
const ctaIsExternal = computed(() => !!cta.value && /^https?:\/\//.test(cta.value.url))

useHead({
  link: () =>
    data.value?.data.canonical_url
      ? [{ rel: 'canonical', href: data.value.data.canonical_url }]
      : [],
  script: () => {
    const post = data.value?.data
    if (!post) return []
    return [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.meta_description || post.excerpt || undefined,
          image: absoluteUrl(post.og_image || post.featured_image),
          datePublished: post.published_at || undefined,
          mainEntityOfPage: absoluteUrl(route.path),
          author: { '@type': 'Organization', name: 'XO Edu Lab' },
          publisher: { '@type': 'Organization', name: 'XO Edu Lab', logo: { '@type': 'ImageObject', url: absoluteUrl('/images/brand/xo-logo-social-512.png') } },
        }),
      },
    ]
  },
})
</script>

<template>
  <article v-if="data" class="max-w-[832px] mx-auto px-margin-mobile sm:px-8 py-xl">
    <p v-if="data.data.category" class="text-xs font-bold uppercase tracking-widest text-secondary">
      {{ data.data.category.name }}
    </p>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ data.data.title }}</h1>
    <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ data.data.excerpt }}</p>

    <img
      v-if="data.data.featured_image"
      :src="data.data.featured_image"
      :alt="data.data.title"
      class="mt-lg aspect-[1200/630] w-full rounded-xl object-cover"
    />

    <ContentLightbox>
      <div class="mt-lg post-content text-on-surface" v-html="data.data.content" />
    </ContentLightbox>

    <aside v-if="cta" class="mt-lg rounded-xl bg-surface-container-high p-md sm:p-lg">
      <p class="font-body-lg text-on-surface">
        {{ cta.text }}
        <a v-if="ctaIsExternal" :href="cta.url" target="_blank" rel="noopener" class="font-bold text-secondary underline underline-offset-4 hover:text-primary">{{ cta.label }}</a>
        <NuxtLinkLocale v-else :to="cta.url" class="font-bold text-secondary underline underline-offset-4 hover:text-primary">{{ cta.label }}</NuxtLinkLocale>
      </p>
    </aside>

    <div v-if="data.data.tags.length" class="mt-lg flex flex-wrap gap-2">
      <span
        v-for="tag in data.data.tags"
        :key="tag.slug"
        class="text-xs rounded-full border border-outline-variant/50 px-3 py-1 text-on-surface-variant"
      >
        {{ tag.name }}
      </span>
    </div>

    <div v-if="data.data.related_posts?.length" class="mt-xl border-t border-outline-variant/30 pt-lg">
      <h2 class="text-xs font-bold uppercase tracking-widest text-secondary">{{ t('detail.relatedInsights') }}</h2>
      <div class="mt-md grid grid-cols-1 sm:grid-cols-3 gap-md">
        <NuxtLinkLocale
          v-for="related in data.data.related_posts"
          :key="related.slug"
          :to="`/insights/${related.slug}`"
          class="group block bg-white rounded-xl premium-border p-md hover-lift"
        >
          <p class="font-headline-sm text-sm text-primary group-hover:text-secondary transition-colors">{{ related.title }}</p>
          <p class="mt-1 text-xs text-on-surface-variant">{{ related.excerpt }}</p>
        </NuxtLinkLocale>
      </div>
    </div>
  </article>
</template>
