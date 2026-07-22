interface SlugItem {
  slug: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'
  const apiBase = config.public.apiBaseUrl

  const staticPaths = ['', '/about', '/contact', '/privacy', '/terms', '/solutions', '/products', '/our-work', '/who-we-help', '/insights', '/research']

  const urls: string[] = []

  for (const path of staticPaths) {
    const viUrl = `${siteUrl}${path}`
    const enUrl = `${siteUrl}/en${path}`
    urls.push(entry(viUrl, viUrl, enUrl))
    urls.push(entry(enUrl, viUrl, enUrl))
  }

  const collections = [
    { endpoint: 'posts', prefix: 'insights' },
    { endpoint: 'solutions', prefix: 'solutions' },
    { endpoint: 'products', prefix: 'products' },
    { endpoint: 'projects', prefix: 'our-work' },
    { endpoint: 'audiences', prefix: 'who-we-help' },
    { endpoint: 'research', prefix: 'research' },
  ]

  for (const collection of collections) {
    const [itemsVi, itemsEn] = await Promise.all([
      $fetch<{ data: SlugItem[] }>(`${apiBase}/api/${collection.endpoint}`, {
        query: { locale: 'vi', per_page: 200 },
      }).catch(() => ({ data: [] })),
      $fetch<{ data: SlugItem[] }>(`${apiBase}/api/${collection.endpoint}`, {
        query: { locale: 'en', per_page: 200 },
      }).catch(() => ({ data: [] })),
    ])

    for (const item of itemsVi.data) {
      urls.push(entry(`${siteUrl}/${collection.prefix}/${item.slug}`, `${siteUrl}/${collection.prefix}/${item.slug}`))
    }

    for (const item of itemsEn.data) {
      urls.push(
        entry(`${siteUrl}/en/${collection.prefix}/${item.slug}`, undefined, `${siteUrl}/en/${collection.prefix}/${item.slug}`),
      )
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')

  return xml
})

function entry(loc: string, viAlt?: string, enAlt?: string) {
  const alternates = [
    viAlt ? `    <xhtml:link rel="alternate" hreflang="vi" href="${viAlt}" />` : '',
    enAlt ? `    <xhtml:link rel="alternate" hreflang="en" href="${enAlt}" />` : '',
  ]
    .filter(Boolean)
    .join('\n')

  return `  <url>\n    <loc>${loc}</loc>\n${alternates}\n  </url>`
}
