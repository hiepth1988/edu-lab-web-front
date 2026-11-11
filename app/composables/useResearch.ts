// Research items are posts with type = "research": same fields and response as articles.
export type ResearchSummary = PostSummary & { topic: { slug: string; name: string } | null }

export type ResearchDetail = PostDetail & { topic: { slug: string; name: string } | null }

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
