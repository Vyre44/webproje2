<template>
  <div class="bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-gray-100">
    <div class="relative pt-[100%]">
      <img :src="product.image" :alt="product.name" class="absolute top-0 left-0 w-full h-full object-cover">
    </div>
    <div class="p-4">
      <h3 class="text-sm font-medium text-gray-800 h-10 overflow-hidden line-clamp-2 mb-2">{{ product.name }}</h3>
      <div class="text-xs text-gray-600 mb-2">{{ product.seller }}</div>
      <div class="mb-3">
        <span class="text-lg font-semibold text-red-500">{{ formatPrice(product.price) }} TL</span>
      </div>
      <button @click="addToCartHandler" 
              class="w-full py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors">
        Sepete Ekle
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, type CartItem } from '@/stores/cart'
import { usePrice } from '@/composables/price'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  product: CartItem
}>()

const { formatPrice } = usePrice()
const cartStore = useCartStore()

const addToCartHandler = () => {
  cartStore.addItem({ ...props.product, quantity: 1 })
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #eee;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.product-image {
  position: relative;
  padding-top: 100%;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.seller {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.price-container {
  margin-bottom: 12px;
}

.current-price {
  font-size: 18px;
  font-weight: 600;
  color: #ff4747;
}

.add-to-cart {
  width: 100%;
  padding: 8px;
  background: #ff4747;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-to-cart:hover {
  background: #ff3333;
}

@media (max-width: 768px) {
  .product-info {
    padding: 10px;
  }

  .product-name {
    font-size: 13px;
    height: 36px;
  }

  .current-price {
    font-size: 16px;
  }
}
</style>
