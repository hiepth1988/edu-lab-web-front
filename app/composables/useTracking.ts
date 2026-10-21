type TrackProps = {
  label?: string | null
  target?: string | null
  value?: number | null
  meta?: Record<string, unknown>
}

// Business events from components (lead_submit, search, …). Page views and clicks are
// tracked automatically by plugins/tracking.client.ts; on the server this is a no-op.
export function useTracking() {
  const nuxtApp = useNuxtApp()

  function track(event: string, props: TrackProps = {}) {
    const fn = nuxtApp.$track as ((event: string, props: TrackProps) => void) | undefined
    fn?.(event, props)
  }

  return { track }
}
