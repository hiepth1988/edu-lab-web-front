export interface ProductSummary {
  id: number
  slug: string
  name: string
  role_summary: string | null
  stage: string | null
}

export interface ProductDetail extends ProductSummary {
  description: string | null
  features: { title: string; description: string | null }[]
  meta_title: string | null
  meta_description: string | null
  og_image: string | null
  canonical_url: string | null
}

export function useProductsList() {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: ProductSummary[] }>(
    () => `products-${locale.value}`,
    () => request('/products'),
    { watch: [locale] },
  )
}

export function useProductDetail(slug: string) {
  const { locale } = useI18n()
  const { request } = useApi()

  return useAsyncData<{ data: ProductDetail }>(
    `product-${slug}-${locale.value}`,
    () => request(`/products/${slug}`),
    { watch: [locale] },
  )
}
