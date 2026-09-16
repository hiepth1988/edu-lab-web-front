export interface SolutionSummary {
  id: number
  slug: string
  title: string
  subheading: string | null
}

export interface SolutionDetail extends SolutionSummary {
  problem: string | null
  solution_overview: string | null
  architecture_note: string | null
  architecture_approach: { title: string; description: string | null }[]
  use_cases: { audience: string; description: string | null }[]
  trust_safety: { question: string; answer: string | null }[]
  features: { title: string; description: string | null; highlights: string[] }[]
  faqs: { question: string; answer: string | null }[]
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  canonical_url: string | null
}

export function useSolutionsList() {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: SolutionSummary[] }>(
    () => `solutions-${locale.value}`,
    () => request('/solutions'),
    { watch: [locale] },
  )
}

export function useSolutionDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: SolutionDetail }>(
    `solution-${slug}-${locale.value}`,
    () => request(`/solutions/${slug}`),
    { watch: [locale] },
  )
}
