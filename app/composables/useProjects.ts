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

export interface IconLabel {
  icon: string | null
  label: string | null
}

export interface ValueLabel {
  value: string | null
  label: string | null
}

export interface SnapshotItem {
  icon: string | null
  label: string | null
  value: string | null
}

export interface Challenge {
  icon: string | null
  color: 'primary' | 'secondary' | 'gold' | null
  title: string | null
  description: string | null
  wide: boolean
}

export interface FeatureGroup {
  title: string | null
  badge_label: string | null
  features: string[]
}

export interface JourneyStep {
  title: string | null
  description: string | null
}

export interface GalleryCategory {
  key: string | null
  label: string | null
}

export interface GalleryImage {
  category_key: string | null
  image_url: string
}

export interface ArchitectureLayer {
  icon: string | null
  title: string | null
  subtitle: string | null
}

export interface TechStackGroup {
  title: string | null
  items: string[]
}

export interface ResultItem {
  icon: string | null
  color: 'primary' | 'secondary' | 'gold' | null
  value: string | null
  label: string | null
}

export interface SolutionModule {
  image: string | null
  title: string | null
  description: string | null
  technical_note: string | null
  features: string[]
}

export interface RelatedProject {
  slug: string | null
  title: string | null
  featured_image: string | null
  category: { slug: string; name: string } | null
}

export interface ProjectDetail extends Omit<ProjectSummary, 'metrics'> {
  hero_eyebrow: string | null
  hero_cta_label: string | null
  hero_cta_url: string | null
  hero_badges: IconLabel[]
  hero_stats: ValueLabel[]

  snapshot_items: SnapshotItem[]

  scale_heading: string | null
  scale_description: string | null
  scale_stats: ValueLabel[]

  challenges_heading: string | null
  challenges_description: string | null
  challenges: Challenge[]

  feature_map_heading: string | null
  feature_groups: FeatureGroup[]

  journey_heading: string | null
  journey_steps: JourneyStep[]

  solution_modules: SolutionModule[]

  gallery_heading: string | null
  gallery_categories: GalleryCategory[]
  gallery_images: GalleryImage[]

  architecture_heading: string | null
  architecture_layers: ArchitectureLayer[]

  tech_stack_groups: TechStackGroup[]

  results_heading: string | null
  results: ResultItem[]

  lessons_quote: string | null
  lessons_citation: string | null

  related_projects: RelatedProject[]

  metrics: { value: string; label: string | null }[]
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
