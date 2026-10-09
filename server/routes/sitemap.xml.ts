interface SlugItem {
  slug: string
  published_at?: string | null
}

interface SitemapEntry {
  loc: string
  lastmod?: string | null
  alternates?: { vi: string; en: string }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public.siteUrl || 'http://localhost:3000').replace(/\/$/, '')
  const apiBase = config.public.apiBaseUrl

  // search is intentionally excluded: result pages are noindex.
  const staticPaths = ['/about', '/contact', '/privacy', '/terms', '/solutions', '/products', '/our-work', '/who-we-help', '/insights', '/research']

  const entries: SitemapEntry[] = []

  const home = { vi: `${siteUrl}/`, en: `${siteUrl}/en` }
  entries.push({ loc: home.vi, alternates: home }, { loc: home.en, alternates: home })

  for (const path of staticPaths) {
    const alternates = { vi: `${siteUrl}${path}`, en: `${siteUrl}/en${path}` }
    entries.push({ loc: alternates.vi, alternates }, { loc: alternates.en, alternates })
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

    // Slugs differ per locale, so detail pages are listed per locale; their hreflang
    // alternates are emitted in the page <head> (useLocalizedSlugs).
    for (const item of itemsVi.data) {
      if (item.slug) entries.push({ loc: `${siteUrl}/${collection.prefix}/${item.slug}`, lastmod: item.published_at })
    }
    for (const item of itemsEn.data) {
      if (item.slug) entries.push({ loc: `${siteUrl}/en/${collection.prefix}/${item.slug}`, lastmod: item.published_at })
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.map(render).join('\n')}\n</urlset>`

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  return xml
})

function render(entry: SitemapEntry) {
  const lines = [`    <loc>${escapeXml(entry.loc)}</loc>`]

  if (entry.lastmod) {
    const date = new Date(entry.lastmod)
    if (!Number.isNaN(date.getTime())) lines.push(`    <lastmod>${date.toISOString()}</lastmod>`)
  }

  if (entry.alternates) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="vi" href="${escapeXml(entry.alternates.vi)}" />`,
      `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(entry.alternates.en)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(entry.alternates.vi)}" />`,
    )
  }

  return `  <url>\n${lines.join('\n')}\n  </url>`
}

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}
