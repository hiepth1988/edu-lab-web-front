interface PageTranslation {
  title: string
  excerpt: string | null
  content: string | null
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
}

interface PageSection {
  section_key: string
  sort_order: number
  translation: {
    heading: string | null
    subheading: string | null
    body: string | null
    cta_label: string | null
    cta_url: string | null
    extra: Record<string, unknown> | null
  } | null
}

interface PageResponse {
  key: string
  translation: PageTranslation
  sections: PageSection[]
}

export function usePageContent(key: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<PageResponse>(
    `page-${key}-${locale.value}`,
    () => request<PageResponse>(key === 'home' ? '/home' : `/pages/${key}`),
    { watch: [locale] },
  )
}
