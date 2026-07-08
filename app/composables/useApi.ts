export function useApi() {
  const config = useRuntimeConfig()
  const { locale } = useI18n()

  function request<T>(path: string, options: Parameters<typeof $fetch>[1] = {}) {
    return $fetch<T>(path, {
      baseURL: `${config.public.apiBaseUrl}/api`,
      ...options,
      query: {
        locale: locale.value,
        ...(options?.query as Record<string, unknown> | undefined),
      },
    })
  }

  return { request }
}
