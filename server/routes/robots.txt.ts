export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'http://localhost:3000'

  setHeader(event, 'Content-Type', 'text/plain')

  if (!config.public.allowIndexing) {
    return `User-agent: *\nDisallow: /\n`
  }

  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
})
