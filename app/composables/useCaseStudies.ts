export interface CaseStudySummary {
  id: number
  slug: string
  title: string
  excerpt: string | null
  featured_image: string | null
}

export interface CaseStudyDetail extends CaseStudySummary {
  problem: string | null
  solution_text: string | null
  result: string | null
  metrics: { value: string; label: string | null }[]
}

export function useCaseStudiesList() {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: CaseStudySummary[] }>(
    () => `case-studies-${locale.value}`,
    () => request('/case-studies'),
    { watch: [locale] },
  )
}

export function useCaseStudyDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: CaseStudyDetail }>(
    `case-study-${slug}-${locale.value}`,
    () => request(`/case-studies/${slug}`),
    { watch: [locale] },
  )
}
