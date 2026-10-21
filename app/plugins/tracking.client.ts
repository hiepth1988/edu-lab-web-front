// First-party visitor tracking → POST {apiBaseUrl}/api/track.
// The API decides whether the visitor is Vietnamese or foreign (IP country, then the
// timezone/language sent here), so nothing about the visitor's identity is computed client-side.
//
// Tracked automatically:
//   page_view       every route change (the API maps the path to post/research/… + slug)
//   page_engagement seconds the page was on screen (tab visible), sent on leave/hide
//   scroll_depth    25/50/75/100% per page view
//   section_view    elements with data-track-section="name" seen ≥ 50% on screen
//   cta_click       elements with data-track="name", or links to /contact and /hop-tac
//   nav_click       other links inside <header>
//   contact_click   mailto:, tel:, Zalo / Messenger / WhatsApp links
//   outbound_click  links to other sites
// Components send business events (lead_submit, search, …) through useTracking().

type TrackProps = {
  label?: string | null
  target?: string | null
  value?: number | null
  meta?: Record<string, unknown>
}

type QueuedEvent = TrackProps & { event: string; path: string }

const SESSION_IDLE_MS = 30 * 60 * 1000
const FLUSH_INTERVAL_MS = 5000
const MAX_BATCH = 20
const SCROLL_MILESTONES = [25, 50, 75, 100]
const CTA_PATHS = /^(\/en)?\/(contact|hop-tac)\/?$/
const CONTACT_LINK = /^(mailto:|tel:|https?:\/\/(zalo\.me|m\.me|wa\.me|api\.whatsapp\.com)\/)/i
// Mirrored to GA4 too, so they can be marked as key events there.
const GA_EVENTS = new Set(['cta_click', 'contact_click', 'outbound_click', 'lead_submit', 'newsletter_subscribe', 'search'])

function safeStorage(kind: 'localStorage' | 'sessionStorage'): Storage | null {
  try {
    const storage = window[kind]
    storage.getItem('_')
    return storage
  } catch {
    return null
  }
}

function text(el: Element): string {
  return (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 120)
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const noop = () => {}

  if (!config.public.trackingEnabled) {
    return { provide: { track: noop } }
  }

  const local = safeStorage('localStorage')
  const session = safeStorage('sessionStorage')
  const endpoint = `${config.public.apiBaseUrl}/api/track`

  let visitorId = local?.getItem('xo_vid') ?? ''
  if (!visitorId) {
    visitorId = crypto.randomUUID()
    local?.setItem('xo_vid', visitorId)
  }

  // A session ends after 30 minutes without activity; its referrer/UTM come from its landing page.
  function sessionContext() {
    const now = Date.now()
    const last = Number(session?.getItem('xo_sid_at') ?? 0)
    let sid = session?.getItem('xo_sid')
    let attribution = session?.getItem('xo_attr')

    if (!sid || now - last > SESSION_IDLE_MS) {
      sid = crypto.randomUUID()
      const params = new URLSearchParams(location.search)
      const referrer = document.referrer && new URL(document.referrer).host !== location.host ? document.referrer : null
      attribution = JSON.stringify({
        referrer,
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
      })
      session?.setItem('xo_sid', sid)
      session?.setItem('xo_attr', attribution)
    }
    session?.setItem('xo_sid_at', String(now))

    return { session_id: sid, ...JSON.parse(attribution ?? '{}') }
  }

  let queue: QueuedEvent[] = []

  function flush() {
    if (!queue.length) return
    const events = queue.splice(0, MAX_BATCH)
    const locale = (nuxtApp.$i18n as { locale: { value: string } } | undefined)?.locale.value ?? 'vi'

    // text/plain keeps this a "simple" CORS request (no preflight); keepalive lets it outlive pagehide.
    fetch(`${endpoint}?locale=${locale}`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      credentials: 'omit',
      keepalive: true,
      body: JSON.stringify({
        visitor_id: visitorId,
        ...sessionContext(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        events,
      }),
    }).catch(noop)

    if (queue.length) flush()
  }

  function track(event: string, props: TrackProps = {}) {
    queue.push({ event, path: location.pathname, ...props })
    if (queue.length >= MAX_BATCH) flush()

    if (GA_EVENTS.has(event) && typeof window.gtag === 'function') {
      window.gtag('event', event, { event_label: props.label ?? undefined, link_url: props.target ?? undefined, value: props.value ?? undefined })
    }
  }

  // --- time on page -------------------------------------------------------------------------
  // Only counts while the tab is visible; may be sent in several parts per view (each time the
  // tab is hidden), so reports sum it and divide by views.
  let currentPath = ''
  let engagedMs = 0
  let visibleSince: number | null = document.visibilityState === 'visible' ? Date.now() : null

  function sendEngagement() {
    if (visibleSince !== null) {
      engagedMs += Date.now() - visibleSince
      visibleSince = document.visibilityState === 'visible' ? Date.now() : null
    }
    const seconds = Math.min(3600, Math.round(engagedMs / 1000))
    engagedMs = 0
    if (currentPath && seconds >= 1) queue.push({ event: 'page_engagement', path: currentPath, value: seconds })
  }

  setInterval(flush, FLUSH_INTERVAL_MS)
  addEventListener('pagehide', () => {
    sendEngagement()
    flush()
  })
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendEngagement()
      visibleSince = null
      flush()
    } else {
      visibleSince = Date.now()
    }
  })

  // --- page views, scroll depth, section views -------------------------------------------
  let scrollReached = new Set<number>()
  let sectionObserver: IntersectionObserver | null = null

  nuxtApp.hook('page:finish', () => {
    if (location.pathname === currentPath) return
    sendEngagement()
    currentPath = location.pathname
    engagedMs = 0
    visibleSince = document.visibilityState === 'visible' ? Date.now() : null
    scrollReached = new Set()
    track('page_view')

    sectionObserver?.disconnect()
    const seen = new Set<string>()
    sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.trackSection
          if (entry.isIntersecting && name && !seen.has(name)) {
            seen.add(name)
            track('section_view', { label: name })
            sectionObserver?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.5 },
    )
    // Wait a frame so v-if'd sections that render after data loads are in the DOM.
    requestAnimationFrame(() => {
      document.querySelectorAll('[data-track-section]').forEach((el) => sectionObserver?.observe(el))
    })
  })

  let scrollTimer: ReturnType<typeof setTimeout> | null = null
  addEventListener(
    'scroll',
    () => {
      if (scrollTimer) return
      scrollTimer = setTimeout(() => {
        scrollTimer = null
        const scrollable = document.documentElement.scrollHeight - innerHeight
        const percent = scrollable <= 0 ? 100 : Math.round((scrollY / scrollable) * 100)
        for (const milestone of SCROLL_MILESTONES) {
          if (percent >= milestone && !scrollReached.has(milestone)) {
            scrollReached.add(milestone)
            track('scroll_depth', { value: milestone })
          }
        }
      }, 250)
    },
    { passive: true },
  )

  // --- clicks ------------------------------------------------------------------------------
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track], a[href]')
      if (!el) return

      const href = el.getAttribute('href') ?? ''

      if (el.dataset.track) {
        track(el.dataset.trackEvent || 'cta_click', { label: el.dataset.track, target: href || null })
        return
      }

      if (CONTACT_LINK.test(href)) {
        track('contact_click', { label: href.split(':')[0] === 'mailto' || href.startsWith('tel:') ? href : text(el) || href, target: href })
        return
      }

      let url: URL
      try {
        url = new URL(href, location.href)
      } catch {
        return
      }

      if (url.host !== location.host) {
        track('outbound_click', { label: text(el) || url.host, target: url.href })
      } else if (CTA_PATHS.test(url.pathname)) {
        track('cta_click', { label: text(el), target: url.pathname })
      } else if (el.closest('header')) {
        track('nav_click', { label: text(el), target: url.pathname })
      }
    },
    { capture: true },
  )

  return { provide: { track } }
})

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
