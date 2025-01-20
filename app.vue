<template>
  <div id="app">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
