export interface PostSummary {
  id: number
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
  slug: string
  title: string
  excerpt: string | null
}

export function usePostDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: PostSummary & { content: string | null; related_posts: RelatedPost[] } }>(
    `post-${slug}-${locale.value}`,
    () => request(`/posts/${slug}`),
    { watch: [locale] },
  )
}
