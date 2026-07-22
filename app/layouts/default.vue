<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const { data: solutionsData } = await useSolutionsList()
const { data: productsData } = await useProductsList()
const { data: audiencesData } = await useAudiencesList()

function findSolution(slug: string) {
  return solutionsData.value?.data.find((s) => s.slug === slug)
}
function findProduct(slug: string) {
  return productsData.value?.data.find((p) => p.slug === slug)
}

const solutionGroups = computed(() => [
  {
    heading: t('navGroups.solutionsBuild'),
    items: [
      ...(['lms', 'online-exam-platform'] as const)
        .map((slug) => findSolution(slug))
        .filter((s): s is NonNullable<typeof s> => !!s)
        .map((s) => ({ label: s.title, to: `/solutions/${s.slug}` })),
      { label: t('navGroups.solutionsCustomProduct'), to: '/contact' },
    ],
  },
  {
    heading: t('navGroups.solutionsImprove'),
    items: (['ai-education', 'learning-analytics', 'adaptive-learning'] as const)
      .map((slug) => findSolution(slug))
      .filter((s): s is NonNullable<typeof s> => !!s)
      .map((s) => ({ label: s.title, to: `/solutions/${s.slug}` })),
  },
  {
    heading: t('navGroups.solutionsOperate'),
    items: (['school-management', 'edtech-consulting'] as const)
      .map((slug) => findSolution(slug))
      .filter((s): s is NonNullable<typeof s> => !!s)
      .map((s) => ({ label: s.title, to: `/solutions/${s.slug}` })),
  },
])

const productGroups = computed(() => [
  {
    heading: t('navGroups.productsLive'),
    items: (['topthi'] as const)
      .map((slug) => findProduct(slug))
      .filter((p): p is NonNullable<typeof p> => !!p)
      .map((p) => ({ label: p.name, to: `/products/${p.slug}` })),
  },
  {
    heading: t('navGroups.productsCore'),
    items: (['exam-engine', 'question-bank-engine', 'learning-analytics-platform'] as const)
      .map((slug) => findProduct(slug))
      .filter((p): p is NonNullable<typeof p> => !!p)
      .map((p) => ({ label: p.name, to: `/products/${p.slug}` })),
  },
  {
    heading: t('navGroups.productsDev'),
    items: (['ai-learning-engine', 'knowledge-graph-engine'] as const)
      .map((slug) => findProduct(slug))
      .filter((p): p is NonNullable<typeof p> => !!p)
      .map((p) => ({ label: p.name, to: `/products/${p.slug}` })),
  },
])

const audienceItems = computed(
  () => audiencesData.value?.data.map((a) => ({ label: a.title, to: `/who-we-help/${a.slug}` })) ?? [],
)

const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-canvas text-on-surface">
    <header class="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
      <nav class="flex justify-between items-center gap-md px-margin-mobile sm:px-margin-desktop py-sm max-w-max-width mx-auto">
        <NuxtLinkLocale :to="localePath('/')" class="flex items-center gap-xs shrink-0">
          <img src="/images/home/logo.jpg" alt="XO Edu Lab" class="h-9 w-9 rounded-lg object-cover" />
          <span class="font-headline-sm text-lg font-bold text-primary whitespace-nowrap">XO Edu Lab</span>
        </NuxtLinkLocale>

        <div class="hidden xl:flex gap-4 items-center h-full">
          <NuxtLinkLocale :to="localePath('/about')" class="text-on-surface-variant hover:text-secondary transition-colors text-sm whitespace-nowrap">
            {{ t('nav.whyXo') }}
          </NuxtLinkLocale>

          <div class="relative mega-menu-trigger h-full flex items-center group">
            <button type="button" class="flex items-center gap-1 text-on-surface-variant group-hover:text-secondary transition-colors text-sm whitespace-nowrap">
              {{ t('nav.solutions') }}
              <span class="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-180">expand_more</span>
            </button>
            <div class="mega-menu z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white border border-outline-variant/20 rounded-xl p-md shadow-xl grid grid-cols-3 gap-md">
              <div v-for="group in solutionGroups" :key="group.heading">
                <h5 class="text-secondary font-label-md uppercase tracking-wider mb-2">{{ group.heading }}</h5>
                <ul class="space-y-1.5">
                  <li v-for="item in group.items" :key="item.to">
                    <NuxtLinkLocale :to="item.to" class="text-on-surface-variant hover:text-secondary text-sm leading-snug block py-1">
                      {{ item.label }}
                    </NuxtLinkLocale>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="relative mega-menu-trigger h-full flex items-center group">
            <button type="button" class="flex items-center gap-1 text-on-surface-variant group-hover:text-secondary transition-colors text-sm whitespace-nowrap">
              {{ t('nav.products') }}
              <span class="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-180">expand_more</span>
            </button>
            <div class="mega-menu z-50 absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white border border-outline-variant/20 rounded-xl p-md shadow-xl grid grid-cols-3 gap-md">
              <div v-for="group in productGroups" :key="group.heading">
                <h5 class="text-secondary font-label-md uppercase tracking-wider mb-2">{{ group.heading }}</h5>
                <ul class="space-y-1.5">
                  <li v-for="item in group.items" :key="item.to">
                    <NuxtLinkLocale :to="item.to" class="text-on-surface-variant hover:text-secondary text-sm leading-snug block py-1">
                      {{ item.label }}
                    </NuxtLinkLocale>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="audienceItems.length" class="relative mega-menu-trigger h-full flex items-center group">
            <button type="button" class="flex items-center gap-1 text-on-surface-variant group-hover:text-secondary transition-colors text-sm whitespace-nowrap">
              {{ t('nav.whoWeHelp') }}
              <span class="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-180">expand_more</span>
            </button>
            <div class="mega-menu z-50 absolute top-full left-0 mt-2 w-64 bg-white border border-outline-variant/20 rounded-xl p-sm shadow-xl">
              <ul class="space-y-1">
                <li v-for="item in audienceItems" :key="item.to">
                  <NuxtLinkLocale :to="item.to" class="text-on-surface-variant hover:text-secondary text-sm leading-snug block px-md py-2 hover:bg-surface-container-low rounded-lg">
                    {{ item.label }}
                  </NuxtLinkLocale>
                </li>
              </ul>
            </div>
          </div>

          <NuxtLinkLocale :to="localePath('/research')" class="text-on-surface-variant hover:text-secondary transition-colors text-sm whitespace-nowrap">
            {{ t('nav.research') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale :to="localePath('/our-work')" class="text-on-surface-variant hover:text-secondary transition-colors text-sm whitespace-nowrap">
            {{ t('nav.ourWork') }}
          </NuxtLinkLocale>
          <NuxtLinkLocale :to="localePath('/insights')" class="text-on-surface-variant hover:text-secondary transition-colors text-sm whitespace-nowrap">
            {{ t('nav.insights') }}
          </NuxtLinkLocale>
        </div>

        <div class="flex items-center gap-3">
          <NuxtLinkLocale :to="localePath('/search')" class="hidden sm:flex text-on-surface-variant hover:text-secondary" :aria-label="t('nav.search')">
            <span class="material-symbols-outlined">search</span>
          </NuxtLinkLocale>
          <LocaleSwitcher class="hidden sm:flex" />
          <NuxtLinkLocale
            :to="localePath('/contact')"
            class="hidden sm:inline-block bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {{ t('cta.buildWithXo') }}
          </NuxtLinkLocale>
          <button
            type="button"
            class="xl:hidden text-on-surface-variant"
            :aria-label="t('nav.search')"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <span class="material-symbols-outlined text-3xl">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </nav>

      <div v-if="mobileMenuOpen" class="xl:hidden border-t border-outline-variant/30 bg-surface px-margin-mobile py-md space-y-md max-h-[80vh] overflow-y-auto">
        <NuxtLinkLocale :to="localePath('/about')" class="block font-body-md text-on-surface-variant" @click="mobileMenuOpen = false">{{ t('nav.whyXo') }}</NuxtLinkLocale>

        <div>
          <p class="font-label-sm uppercase tracking-wider text-outline mb-1">{{ t('nav.solutions') }}</p>
          <div v-for="group in solutionGroups" :key="group.heading" class="mb-2">
            <p class="text-secondary font-label-md text-xs uppercase tracking-wider mb-1">{{ group.heading }}</p>
            <NuxtLinkLocale v-for="item in group.items" :key="item.to" :to="item.to" class="block py-1 text-sm text-on-surface-variant" @click="mobileMenuOpen = false">
              {{ item.label }}
            </NuxtLinkLocale>
          </div>
        </div>

        <div>
          <p class="font-label-sm uppercase tracking-wider text-outline mb-1">{{ t('nav.products') }}</p>
          <div v-for="group in productGroups" :key="group.heading" class="mb-2">
            <p class="text-secondary font-label-md text-xs uppercase tracking-wider mb-1">{{ group.heading }}</p>
            <NuxtLinkLocale v-for="item in group.items" :key="item.to" :to="item.to" class="block py-1 text-sm text-on-surface-variant" @click="mobileMenuOpen = false">
              {{ item.label }}
            </NuxtLinkLocale>
          </div>
        </div>

        <div v-if="audienceItems.length">
          <p class="font-label-sm uppercase tracking-wider text-outline mb-1">{{ t('nav.whoWeHelp') }}</p>
          <NuxtLinkLocale v-for="item in audienceItems" :key="item.to" :to="item.to" class="block py-1 text-sm text-on-surface-variant" @click="mobileMenuOpen = false">
            {{ item.label }}
          </NuxtLinkLocale>
        </div>

        <NuxtLinkLocale :to="localePath('/research')" class="block font-body-md text-on-surface-variant" @click="mobileMenuOpen = false">{{ t('nav.research') }}</NuxtLinkLocale>
        <NuxtLinkLocale :to="localePath('/our-work')" class="block font-body-md text-on-surface-variant" @click="mobileMenuOpen = false">{{ t('nav.ourWork') }}</NuxtLinkLocale>
        <NuxtLinkLocale :to="localePath('/insights')" class="block font-body-md text-on-surface-variant" @click="mobileMenuOpen = false">{{ t('nav.insights') }}</NuxtLinkLocale>
        <NuxtLinkLocale :to="localePath('/search')" class="block font-body-md text-on-surface-variant" @click="mobileMenuOpen = false">{{ t('nav.search') }}</NuxtLinkLocale>

        <div class="flex items-center justify-between pt-sm border-t border-outline-variant/20">
          <LocaleSwitcher />
          <NuxtLinkLocale
            :to="localePath('/contact')"
            class="bg-secondary text-white px-md py-sm rounded-full font-label-md hover:opacity-90 transition-opacity"
            @click="mobileMenuOpen = false"
          >
            {{ t('cta.buildWithXo') }}
          </NuxtLinkLocale>
        </div>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="w-full bg-surface-container-low border-t border-outline-variant/20 pt-xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-xl px-margin-mobile sm:px-margin-desktop pb-xl max-w-max-width mx-auto">
        <div class="space-y-md">
          <div class="flex items-center gap-xs">
            <img src="/images/home/logo.jpg" alt="XO Edu Lab" class="h-8 w-8 rounded-lg object-cover" />
            <span class="font-headline-md text-headline-md font-bold text-primary">XO Edu Lab</span>
          </div>
          <p class="font-body-md text-on-surface-variant">{{ t('footer.tagline') }}</p>
        </div>

        <div>
          <h5 class="font-label-md text-primary mb-md uppercase tracking-widest">{{ t('footer.whyXoGroup') }}</h5>
          <ul class="space-y-sm">
            <li><NuxtLinkLocale :to="localePath('/about')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('nav.whyXo') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale :to="localePath('/solutions')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('nav.solutions') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale :to="localePath('/about')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('footer.ourProcess') }}</NuxtLinkLocale></li>
          </ul>
        </div>

        <div>
          <h5 class="font-label-md text-primary mb-md uppercase tracking-widest">{{ t('footer.forCreatorsGroup') }}</h5>
          <ul class="space-y-sm">
            <li><NuxtLinkLocale :to="localePath('/who-we-help/independent-educators')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('footer.forEducators') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale :to="localePath('/who-we-help/edtech-startups')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('footer.forEdtechTeams') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale :to="localePath('/insights')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('nav.insights') }}</NuxtLinkLocale></li>
          </ul>
        </div>

        <div>
          <h5 class="font-label-md text-primary mb-md uppercase tracking-widest">{{ t('footer.companyGroup') }}</h5>
          <ul class="space-y-sm">
            <li><NuxtLinkLocale :to="localePath('/privacy')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('footer.privacyPolicy') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale :to="localePath('/terms')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('footer.termsOfService') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale :to="localePath('/contact')" class="text-on-surface-variant hover:text-primary transition-all font-body-md">{{ t('footer.contactUs') }}</NuxtLinkLocale></li>
          </ul>
        </div>
      </div>

      <div class="max-w-max-width mx-auto px-margin-mobile sm:px-margin-desktop pb-lg">
        <div class="sm:w-96">
          <p class="text-sm font-medium text-on-surface-variant mb-2">{{ t('footer.newsletterTitle') }}</p>
          <NewsletterForm />
        </div>
      </div>

      <div class="border-t border-outline-variant/10 py-md px-margin-mobile sm:px-margin-desktop text-center">
        <p class="font-body-md text-on-surface-variant text-sm">© {{ new Date().getFullYear() }} {{ t('footer.rights') }}</p>
      </div>
    </footer>
  </div>
</template>
