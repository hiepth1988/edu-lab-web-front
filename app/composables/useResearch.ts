export interface ResearchSummary {
  id: number
  slug: string
  title: string
  excerpt: string | null
  topic: { slug: string; name: string } | null
}

export interface ResearchDetail extends ResearchSummary {
  content: string | null
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  canonical_url: string | null
}

export function useResearchList() {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: ResearchSummary[] }>(
    () => `research-${locale.value}`,
    () => request('/research'),
    { watch: [locale] },
  )
}

export function useResearchDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: ResearchDetail }>(
    `research-detail-${slug}-${locale.value}`,
    () => request(`/research/${slug}`),
    { watch: [locale] },
  )
}
