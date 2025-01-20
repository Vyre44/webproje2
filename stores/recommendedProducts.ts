import { defineStore } from 'pinia'
import { ref } from 'vue'

interface RecommendedProduct {
  id: number
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  sales: number
  freeShipping?: boolean
}

export const useRecommendedProductsStore = defineStore('recommendedProducts', () => {
  const products = ref<RecommendedProduct[]>([])

  async function fetchRecommendedProducts() {
    // Örnek veri
    products.value = [
      {
        id: 1,
        name: 'Önerilen Ürün 1',
        price: 149.99,
        originalPrice: 249.99,
        image: '/images/recommended1.jpg',
        rating: 4.8,
        sales: 200,
        freeShipping: true
      }
    ]
  }

  return {
    products,
    fetchRecommendedProducts
  }
})
