export type PostType = 'post' | 'research'

// Articles live under /insights, research under /research; both share the same fields.
export function postPath(type: PostType | undefined, slug: string) {
  return `${type === 'research' ? '/research' : '/insights'}/${slug}`
}

export interface PostSummary {
  id: number
  type?: PostType
  slug: string
  title: string
  excerpt: string | null
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  canonical_url: string | null
  featured_image: string | null
  published_at: string | null
  category: { slug: string; name: string } | null
  tags: { slug: string; name: string }[]
}

interface PostsResponse {
  data: PostSummary[]
  meta: { current_page: number; last_page: number; per_page: number; total: number }
}

export function usePostsList(params: { category?: string; tag?: string; page?: number } = {}) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<PostsResponse>(
    () => `posts-${locale.value}-${params.category ?? ''}-${params.tag ?? ''}-${params.page ?? 1}`,
    () =>
      request<PostsResponse>('/posts', {
        query: {
          category: params.category,
          tag: params.tag,
          page: params.page,
        },
      }),
    { watch: [locale] },
  )
}

export interface RelatedPost {
  type?: PostType
  slug: string
  title: string
  excerpt: string | null
  featured_image?: string | null
}

export interface PostCta {
  text: string | null
  label: string | null
  url: string | null
}

export interface PostDetail extends PostSummary {
  content: string | null
  related_posts: RelatedPost[]
  cta?: PostCta | null
  alternate_slugs?: Record<string, string>
}

export function usePostDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: PostDetail }>(
    `post-${slug}-${locale.value}`,
    () => request(`/posts/${slug}`),
    { watch: [locale] },
  )
}
