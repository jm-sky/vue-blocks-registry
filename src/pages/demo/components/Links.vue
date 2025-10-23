<script setup lang="ts">
import Card from '@registry/components/ui/card/Card.vue'
import CardContent from '@registry/components/ui/card/CardContent.vue'
import HoverLink from '@registry/components/ui/hover-link/HoverLink.vue'
import HoverLinkExternal from '@registry/components/ui/hover-link/HoverLinkExternal.vue'
import LinkExternal from '@registry/components/ui/link/LinkExternal.vue'
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <div class="animate-fade-in">
      <h2 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-2">
        Links Components
      </h2>
      <p class="text-slate-600 dark:text-slate-300 leading-relaxed">
        Komponenty linków z hover efektem i smooth transitions
      </p>
    </div>

    <!-- LinkExternal Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        LinkExternal
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Link z underline hover efektem i smooth transitions
      </p>
      <Card>
        <CardContent>
          <ul class="list-none flex flex-col gap-5 text-muted-foreground">
            <li>
              <LinkExternal href="https://vuejs.org" target="_blank" aria-label="Vue.js">
                <span class="text-lg">Vue.js Documentation</span>
              </LinkExternal>
            </li>
            <li>
              <LinkExternal href="https://github.com/jm-sky/vue-blocks-registry" aria-label="GitHub Repository">
                <span class="text-lg">GitHub Repository</span>
              </LinkExternal>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <!-- HoverLink Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        HoverLink
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Link z underline hover efektem i smooth transitions
      </p>
      <Card>
        <CardContent>
          <ul class="list-none flex flex-col gap-5 text-muted-foreground">
            <li>
              <HoverLink to="/demo/buttons" aria-label="Buttons demo">
                <span class="text-lg">Button Components Demo</span>
              </HoverLink>
            </li>
            <li>
              <HoverLink to="/demo/forms" aria-label="Forms demo">
                <span class="text-lg">Form Components Demo</span>
              </HoverLink>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <!-- HoverLinkExternal Component -->
    <div class="space-y-4 animate-slide-up">
      <h3 class="text-2xl font-semibold text-slate-800 dark:text-slate-200">
        HoverLinkExternal
      </h3>
      <p class="text-slate-600 dark:text-slate-400">
        Link z external link icon i smooth transitions
      </p>
      <Card>
        <CardContent>
          <ul class="list-none flex flex-col gap-5 text-muted-foreground">
            <li>
              <HoverLinkExternal href="https://vuejs.org" target="_blank" aria-label="Vue.js">
                <span class="text-lg">Vue.js Documentation</span>
              </HoverLinkExternal>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
