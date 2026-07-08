export interface SearchResult {
  type: 'post' | 'research' | 'case-study'
  slug: string
  title: string
  excerpt: string | null
}

export function useSearch() {
  const { request } = useApi()

  async function search(q: string): Promise<SearchResult[]> {
    if (!q.trim()) return []
    const { data } = await request<{ data: SearchResult[] }>('/search', { query: { q } })
    return data
  }

  return { search }
}
