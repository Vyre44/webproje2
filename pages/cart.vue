<template>
  <div class="cart-page">
    <h1>Alışveriş Sepeti</h1>
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Sepetiniz boş</p>
      <NuxtLink to="/" class="continue-shopping">Alışverişe Devam Et</NuxtLink>
    </div>
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="seller">{{ item.seller }}</p>
            <div class="item-options" v-if="item.options">
              <span v-for="(value, key) in item.options" :key="key">
                {{ key }}: {{ value }}
              </span>
            </div>
          </div>
          <div class="item-quantity">
            <button @click="updateQuantity(item.id, item.quantity - 1, item.options)" :disabled="item.quantity <= 1">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1, item.options)">+</button>
          </div>
          <div class="item-price">{{ formatPrice(item.price * item.quantity) }} TL</div>
          <button class="remove-item" @click="removeItem(item.id, item.options)">Kaldır</button>
        </div>
      </div>
      <div class="cart-summary">
        <h2>Sipariş Özeti</h2>
        <div class="summary-row">
          <span>Ara Toplam</span>
          <span>{{ formatPrice(totalPrice) }} TL</span>
        </div>
        <div class="summary-row">
          <span>Kargo</span>
          <span>Ücretsiz</span>
        </div>
        <div class="summary-total">
          <span>Toplam</span>
          <span>{{ formatPrice(totalPrice) }} TL</span>
        </div>
        <button class="checkout-button">Alışverişi Tamamla</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState } from '#app'
import { computed } from 'vue'
import type { CartItem } from '@/stores/cart.ts'
import { usePrice } from '@/composables/price'

const cartItems = useState<CartItem[]>('cart-items', () => [])
const { formatPrice } = usePrice()

// Toplam fiyat hesaplama
const totalPrice = computed(() => {
  if (!cartItems.value || !Array.isArray(cartItems.value)) return 0
  return cartItems.value.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'number' ? item.price : 0
    const quantity = typeof item.quantity === 'number' ? item.quantity : 0
    return sum + (itemPrice * quantity)
  }, 0)
})

// Miktar güncelleme fonksiyonu
const updateQuantity = (itemId: string, quantity: number, options?: Record<string, any>) => {
  if (quantity < 1) return
  if (!cartItems.value || !Array.isArray(cartItems.value)) return
  
  const item = cartItems.value.find(i => 
    i.id === itemId && 
    JSON.stringify(i.options) === JSON.stringify(options)
  )
  if (item) {
    item.quantity = quantity
  }
}

// Ürün kaldırma fonksiyonu
const removeItem = (itemId: string, options?: Record<string, any>) => {
  if (!cartItems.value || !Array.isArray(cartItems.value)) return
  
  cartItems.value = cartItems.value.filter(item => 
    !(item.id === itemId && JSON.stringify(item.options) === JSON.stringify(options))
  )
}
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
}

.continue-shopping {
  display: inline-block;
  padding: 10px 20px;
  background: #ff4747;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  margin-top: 20px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 20px;
}

.cart-items {
  background: white;
  border-radius: 12px;
  padding: 20px;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 20px;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.seller {
  font-size: 14px;
  color: #666;
}

.item-options {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-quantity button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.item-quantity button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.item-price {
  font-weight: 600;
  color: #ff4747;
}

.remove-item {
  padding: 8px 12px;
  border: none;
  background: #f5f5f5;
  color: #666;
  border-radius: 4px;
  cursor: pointer;
}

.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 20px;
  height: fit-content;
}

.cart-summary h2 {
  font-size: 18px;
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-weight: 600;
  font-size: 16px;
}

.checkout-button {
  width: 100%;
  padding: 12px;
  background: #ff4747;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 20px;
  cursor: pointer;
}

.checkout-button:hover {
  background: #ff3333;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 15px;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-quantity,
  .item-price,
  .remove-item {
    grid-column: 2;
    justify-self: start;
  }
}
</style> 