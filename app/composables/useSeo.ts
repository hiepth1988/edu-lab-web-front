import type { MaybeRefOrGetter } from 'vue'

const DEFAULT_OG_IMAGE = '/images/home/hero-visual.jpg'

type MaybeText = MaybeRefOrGetter<string | null | undefined>

interface PageSeoInput {
  title: MaybeText
  description?: MaybeText
  image?: MaybeText
  type?: 'website' | 'article'
  noindex?: boolean
}

export function useAbsoluteUrl() {
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')

  return (url: string | null | undefined) => {
    if (!url) return undefined
    if (/^https?:\/\//.test(url)) return url
    return `${siteUrl}${url.startsWith('/') ? '' : '/'}${url}`
  }
}

// Title, description, Open Graph and Twitter card in one place, so every page
// gets complete social/search metadata with sane fallbacks.
export function usePageSeo(input: PageSeoInput) {
  const { t } = useI18n()
  const absoluteUrl = useAbsoluteUrl()

  const title = () => toValue(input.title) || undefined
  const description = () => toValue(input.description) || t('seo.siteDescription')
  const image = () => absoluteUrl(toValue(input.image) || DEFAULT_OG_IMAGE)

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: input.type ?? 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    ...(input.noindex ? { robots: 'noindex, follow' } : {}),
  })
}

// Detail slugs differ per locale (e.g. a post's vi and en slugs), so hreflang
// alternates and the locale switcher need the real slug of each translation.
export function useLocalizedSlugs(slugs: MaybeRefOrGetter<Record<string, string> | undefined>) {
  const setI18nParams = useSetI18nParams()

  function apply() {
    const value = toValue(slugs)
    if (!value) return
    setI18nParams(Object.fromEntries(Object.entries(value).map(([locale, slug]) => [locale, { slug }])))
  }

  apply()
  watch(() => toValue(slugs), apply)
}
