export interface ProjectSummary {
  id: number
  slug: string
  title: string
  excerpt: string | null
  featured_image: string | null
  is_featured: boolean
  category: { slug: string; name: string } | null
  metrics: { value: string; label: string | null }[]
}

export interface ProjectDetail extends Omit<ProjectSummary, 'metrics'> {
  problem: string | null
  solution_text: string | null
  result: string | null
  metrics: { value: string; label: string | null }[]
  section_images: { problem: string[]; solution: string[]; result: string[] }
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  canonical_url: string | null
}

export function useProjectsList() {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: ProjectSummary[] }>(
    () => `projects-${locale.value}`,
    () => request('/projects'),
    { watch: [locale] },
  )
}

export function useProjectDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: ProjectDetail }>(
    `project-${slug}-${locale.value}`,
    () => request(`/projects/${slug}`),
    { watch: [locale] },
  )
}
