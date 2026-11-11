<script setup lang="ts">
import { postPath, type PostDetail } from '~/composables/usePosts'

// Full article layout and SEO, shared by /insights/[slug] and /research/[slug].
const props = defineProps<{ post: PostDetail }>()

const route = useRoute()
const { t } = useI18n()

usePageSeo({
  title: () => props.post.meta_title || props.post.title,
  description: () => props.post.meta_description || props.post.excerpt || undefined,
  image: () => props.post.og_image || props.post.featured_image || undefined,
  type: 'article',
})

useLocalizedSlugs(() => props.post.alternate_slugs)

const absoluteUrl = useAbsoluteUrl()

const config = useRuntimeConfig()
// Posts without a custom CTA get the site-wide default; `cta: null` means the post turned it off.
const cta = computed(() => {
  const c = props.post.cta
  if (!c) return null
  return {
    text: c.text || t('detail.postCtaText'),
    label: c.label || t('detail.postCtaLabel'),
    url: c.url || (config.public.postCtaUrl as string),
  }
})
const ctaIsExternal = computed(() => !!cta.value && /^https?:\/\//.test(cta.value.url))

useHead({
  link: () => (props.post.canonical_url ? [{ rel: 'canonical', href: props.post.canonical_url }] : []),
  script: () => {
    const post = props.post
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
          publisher: { '@type': 'Organization', name: 'XO Edu Lab', logo: { '@type': 'ImageObject', url: absoluteUrl('/images/brand/edulab-logo-social-512.png') } },
        }),
      },
    ]
  },
})
</script>

<template>
  <article class="max-w-[832px] mx-auto px-margin-mobile sm:px-8 py-xl">
    <p v-if="post.category" class="text-xs font-bold uppercase tracking-widest text-secondary">
      {{ post.category.name }}
    </p>
    <h1 class="mt-2 font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-primary">{{ post.title }}</h1>
    <p class="mt-md font-body-lg text-body-lg text-on-surface-variant">{{ post.excerpt }}</p>

    <img
      v-if="post.featured_image"
      :src="post.featured_image"
      :alt="post.title"
      class="mt-lg aspect-[1200/630] w-full rounded-xl object-cover"
    />

    <ContentLightbox>
      <div class="mt-lg post-content text-on-surface" v-html="post.content" />
    </ContentLightbox>

    <aside v-if="cta" class="mt-lg rounded-xl bg-surface-container-high p-md sm:p-lg">
      <p class="font-body-lg text-on-surface">
        {{ cta.text }}
        <a v-if="ctaIsExternal" :href="cta.url" target="_blank" rel="noopener" class="font-bold text-secondary underline underline-offset-4 hover:text-primary">{{ cta.label }}</a>
        <NuxtLinkLocale v-else :to="cta.url" class="font-bold text-secondary underline underline-offset-4 hover:text-primary">{{ cta.label }}</NuxtLinkLocale>
      </p>
    </aside>

    <div v-if="post.tags?.length" class="mt-lg flex flex-wrap gap-2">
      <span
        v-for="tag in post.tags"
        :key="tag.slug"
        class="text-xs rounded-full border border-outline-variant/50 px-3 py-1 text-on-surface-variant"
      >
        {{ tag.name }}
      </span>
    </div>

    <div v-if="post.related_posts?.length" class="mt-xl border-t border-outline-variant/30 pt-lg">
      <h2 class="text-xs font-bold uppercase tracking-widest text-secondary">{{ t('detail.relatedInsights') }}</h2>
      <div class="mt-md grid grid-cols-1 sm:grid-cols-3 gap-md">
        <NuxtLinkLocale
          v-for="related in post.related_posts"
          :key="related.slug"
          :to="postPath(related.type, related.slug)"
          class="group block bg-white rounded-xl premium-border p-md hover-lift"
        >
          <p class="font-headline-sm text-sm text-primary group-hover:text-secondary transition-colors">{{ related.title }}</p>
          <p class="mt-1 text-xs text-on-surface-variant">{{ related.excerpt }}</p>
        </NuxtLinkLocale>
      </div>
    </div>
  </article>
</template>
