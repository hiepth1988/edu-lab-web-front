import type { Ref } from 'vue'

// Detail pages: a missing record is a 404, but an API failure (rate limit, 5xx, timeout)
// must not be reported as "page gone", or search engines drop the URL. Those become 503
// so crawlers retry later.
export function throwIfMissing(data: Ref<unknown>, error: Ref<unknown>, message: string) {
  if (data.value) return
  const status = (error.value as { statusCode?: number } | null)?.statusCode
  if (error.value && status !== 404) {
    throw createError({ statusCode: 503, statusMessage: 'Service temporarily unavailable' })
  }
  throw createError({ statusCode: 404, statusMessage: message })
}
