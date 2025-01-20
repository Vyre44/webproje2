<template>
  <section class="viva-products">
    <h2 class="section-title">Viva Ürünleri</h2>
    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CartItem } from '@/stores/cart'

const products = ref<CartItem[]>([
  {
    id: 'viva-1',
    name: 'Viva Parfüm 100ml',
    price: 199.99,
    quantity: 1,
    image: '/images/viva-parfum.jpg',
    seller: 'Viva Kozmetik',
    options: {
      size: '100ml'
    }
  },
  {
    id: 'viva-2',
    name: 'Viva Nemlendirici Krem 50ml',
    price: 149.99,
    quantity: 1,
    image: '/images/viva-krem.jpg',
    seller: 'Viva Kozmetik',
    options: {
      size: '50ml'
    }
  }
])
</script>

<style scoped>
.viva-products {
  margin: 40px 0;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style> 