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
  use_cases: string | null
  features: { title: string; description: string | null }[]
  faqs: { question: string; answer: string | null }[]
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
