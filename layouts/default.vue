<template>
  <div class="layout">
    <Navbar />
    <main class="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '~/components/layout/Footer.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
}

.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  margin-top: 160px;
  flex: 1;
  width: 100%;
}
</style>