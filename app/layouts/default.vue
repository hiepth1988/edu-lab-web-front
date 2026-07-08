<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const navItems = computed(() => [
  { label: t('nav.solutions'), to: localePath('/solutions') },
  { label: t('nav.products'), to: localePath('/products') },
  { label: t('nav.research'), to: localePath('/research') },
  { label: t('nav.caseStudies'), to: localePath('/case-studies') },
  { label: t('nav.insights'), to: localePath('/insights') },
  { label: t('nav.about'), to: localePath('/about') },
])
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white text-slate-900">
    <header class="border-b border-slate-200">
      <div class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <NuxtLink :to="localePath('/')" class="font-semibold text-slate-900">
          XO Education Technology Lab
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="hover:text-slate-900"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-4">
          <NuxtLink :to="localePath('/search')" class="text-slate-500 hover:text-slate-900 text-sm">
            {{ t('nav.search') }}
          </NuxtLink>
          <LocaleSwitcher />
          <NuxtLink
            :to="localePath('/contact')"
            class="rounded-full bg-slate-900 text-white text-sm px-4 py-2 hover:bg-slate-800"
          >
            {{ t('cta.bookConsultation') }}
          </NuxtLink>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-slate-200 py-10 bg-slate-50">
      <div class="max-w-6xl mx-auto px-6 space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p class="text-sm font-medium text-slate-700">{{ t('footer.newsletterTitle') }}</p>
          <div class="sm:w-96">
            <NewsletterForm />
          </div>
        </div>
        <div class="text-sm text-slate-500 border-t border-slate-200 pt-4">
          © {{ new Date().getFullYear() }} {{ t('footer.rights') }}
        </div>
      </div>
    </footer>
  </div>
</template>
