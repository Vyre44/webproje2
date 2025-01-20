import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVivaProductsStore = defineStore('vivaProducts', () => {
  const products = ref<{ id: number; name: string; price: number; originalPrice: number; image: string; rating: number; sales: number }[]>([])

  async function fetchVivaProducts() {
    // Örnek veri
    products.value = [
      {
        id: 1,
        name: 'Viva Ürün 1',
        price: 199.99,
        originalPrice: 299.99,
        image: '/images/product1.jpg',
        rating: 4.5,
        sales: 150
      }
    ]
  }

  return {
    products,
    fetchVivaProducts
  }
})
