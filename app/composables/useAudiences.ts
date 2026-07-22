export interface AudienceSummary {
  id: number
  slug: string
  title: string
  subheading: string | null
  hero_image: string | null
}

export interface AudienceDetail extends AudienceSummary {
  pain_points: string | null
  how_we_help: string | null
  solutions: { slug: string; title: string; subheading: string | null }[]
}

export function useAudiencesList() {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: AudienceSummary[] }>(
    () => `audiences-${locale.value}`,
    () => request('/audiences'),
    { watch: [locale] },
  )
}

export function useAudienceDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: AudienceDetail }>(
    `audience-${slug}-${locale.value}`,
    () => request(`/audiences/${slug}`),
    { watch: [locale] },
  )
}
