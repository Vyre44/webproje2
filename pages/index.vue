<template>
  <div class="home-page">
    <DailyOffers />
    <SuperBuyer />
    <CategoryGrid @add-to-cart="handleAddToCart" />
  </div>
</template>

<script setup lang="ts">
import SuperBuyer from '~/components/layout/SuperBuyer.vue'
import DailyOffers from '~/components/layout/DailyOffers.vue'
import CategoryGrid from '~/components/layout/CategoryGrid.vue'
import type { CartItem } from '@/stores/cart'
import { useState } from '#app'

// Cart state'ini composable olarak kullan
const cartItems = useState<CartItem[]>('cart-items', () => [])

const handleAddToCart = (item: CartItem) => {
  const existingItem = cartItems.value.find(i => i.id === item.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({ ...item, quantity: 1 })
  }
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.home-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>