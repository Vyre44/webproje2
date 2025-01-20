<template>
  <div class="product-page">
    <div v-if="loading" class="loading-state">
      <p>Ürün yükleniyor...</p>
    </div>
    
    <div v-else-if="error" class="error-state">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="product" class="product-container">
      <!-- Sol Taraf - Ürün Görselleri -->
      <div class="product-gallery">
        <div class="thumbnail-list">
          <div v-for="(image, index) in productImages" :key="index" 
               class="thumbnail" 
               :class="{ active: selectedImage === index }"
               @click="selectedImage = index">
            <img :src="image" :alt="product.name">
          </div>
        </div>
        <div class="main-image">
          <img :src="productImages[selectedImage]" :alt="product.name">
        </div>
      </div>

      <!-- Sağ Taraf - Ürün Bilgileri -->
      <div class="product-info">
        <div class="product-header">
          <h1 class="product-title">{{ product.name }}</h1>
          <div class="product-meta">
            <div class="rating">
              <span class="stars">★ {{ product.rating }}</span>
              <span class="reviews">{{ product.sales }}+ satıldı</span>
            </div>
          </div>
        </div>

        <div class="price-section">
          <div class="current-price">{{ product.price }}TL</div>
          <div class="original-price">{{ product.originalPrice }}TL</div>
          <div class="discount">
            {{ calculateDiscount(product.price, product.originalPrice) }}% indirim
          </div>
        </div>

        <div class="shipping-info" v-if="product.freeShipping">
          <font-awesome-icon icon="truck" />
          <span>Ücretsiz Kargo</span>
        </div>

        <div class="seller-info">
          <div class="seller-name">
            <span>Satıcı:</span>
            <a href="#">{{ product.seller }}</a>
          </div>
          <div class="seller-rating">
            <div class="rating-item">
              <span class="label">Ürün Puanı</span>
              <span class="value positive">4.8/5</span>
            </div>
            <div class="rating-item">
              <span class="label">Kargo Hızı</span>
              <span class="value positive">4.7/5</span>
            </div>
            <div class="rating-item">
              <span class="label">İletişim</span>
              <span class="value positive">4.9/5</span>
            </div>
          </div>
        </div>

        <div class="quantity-selector">
          <span class="label">Miktar:</span>
          <div class="quantity-controls">
            <button @click="decrementQuantity" :disabled="quantity <= 1">-</button>
            <input type="number" v-model="quantity" min="1" max="99">
            <button @click="incrementQuantity">+</button>
          </div>
          <span class="stock">Stok: {{ product.stock }}</span>
        </div>

        <div class="action-buttons">
          <button class="buy-now" @click="buyNow">Hemen Al</button>
          <button class="add-to-cart" @click="addToCartHandler">
            <font-awesome-icon icon="shopping-cart" /> Sepete Ekle
          </button>
        </div>

        <div class="protection-info">
          <div class="protection-item">
            <font-awesome-icon icon="shield-alt" />
            <span>Alıcı Koruması</span>
          </div>
          <div class="protection-item">
            <font-awesome-icon icon="undo" />
            <span>15 Gün İade Hakkı</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Ürün Detayları ve Açıklamalar -->
    <div v-if="product" class="product-details">
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'description'" class="description">
          <h2>Ürün Açıklaması</h2>
          <div class="description-content">
            <p>{{ product.description }}</p>
          </div>
        </div>

        <div v-if="activeTab === 'specs'" class="specifications">
          <h2>Teknik Özellikler</h2>
          <table class="specs-table">
            <tr v-for="(value, key) in product.specifications" :key="key">
              <td>{{ key }}</td>
              <td>{{ value }}</td>
            </tr>
          </table>
        </div>

        <div v-if="activeTab === 'reviews'" class="reviews-section">
          <h2>Değerlendirmeler</h2>
          <div class="review-stats">
            <div class="overall-rating">
              <div class="rating-number">{{ product.rating }}</div>
              <div class="rating-stars">★★★★☆</div>
              <div class="total-reviews">{{ product.sales }} Değerlendirme</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, navigateTo } from '#app'
import { useCart } from '@/composables/useCart'

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  description: string
  images: string[]
  rating: number
  sales: number
  stock: number
  seller: string
  freeShipping: boolean
  specifications: Record<string, string>
}

// State
const selectedImage = ref(0)
const quantity = ref(1)
const activeTab = ref('description')
const route = useRoute()

// Product state
const loading = ref(false)
const error = ref<string | null>(null)
const product = ref<Product | null>(null)

// Cart
const cart = useCart()

// Computed
const productImages = computed(() => product.value?.images || [])

// Tabs
const tabs = [
  { id: 'description', name: 'Ürün Açıklaması' },
  { id: 'specs', name: 'Özellikler' },
  { id: 'reviews', name: 'Değerlendirmeler' }
]

// Methods
const calculateDiscount = (currentPrice: number | undefined, originalPrice: number | undefined) => {
  if (!currentPrice || !originalPrice) return 0
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
}

const incrementQuantity = () => {
  if (quantity.value < (product.value?.stock || 99)) quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

const addToCartHandler = () => {
  if (!product.value) return

  cart.addToCart({
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0],
    quantity: quantity.value
  })
  
  // Show success message
  alert('Ürün sepete eklendi')
}

const buyNow = () => {
  addToCartHandler()
  navigateTo('/cart')
}

// Fetch product data
const fetchProduct = async (id: string) => {
  loading.value = true
  error.value = null
  try {
    // Mock data for now
    product.value = {
      id: id,
      name: 'Örnek Ürün',
      price: 199.99,
      originalPrice: 299.99,
      description: 'Bu bir örnek ürün açıklamasıdır.',
      images: ['/images/product1.jpg', '/images/product2.jpg'],
      rating: 4.5,
      sales: 150,
      stock: 50,
      seller: 'ABC Mağazası',
      freeShipping: true,
      specifications: {
        'Marka': 'XYZ',
        'Model': 'ABC123',
        'Renk': 'Siyah'
      }
    }
  } catch (err) {
    error.value = 'Ürün yüklenirken bir hata oluştu'
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Fetch product data on mount
onMounted(async () => {
  const productId = route.params.id as string
  await fetchProduct(productId)
})
</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #666;
}

.error-state {
  color: #ff4747;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

/* Galeri Stilleri */
.product-gallery {
  display: flex;
  gap: 20px;
}

.thumbnail-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border: 2px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.thumbnail.active {
  border-color: #FF4747;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.main-image {
  flex: 1;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Ürün Bilgileri Stilleri */
.product-header {
  margin-bottom: 20px;
}

.product-title {
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.3;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  color: #666;
  font-size: 14px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stars {
  color: #FFB800;
}

.price-section {
  margin: 20px 0;
  padding: 15px;
  background: #FFF5F5;
  border-radius: 8px;
}

.current-price {
  font-size: 32px;
  font-weight: 600;
  color: #FF4747;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  margin-top: 5px;
}

.discount {
  display: inline-block;
  background: #FF4747;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 5px;
}

.shipping-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00A650;
  font-size: 14px;
  margin: 15px 0;
}

.seller-info {
  margin: 20px 0;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 8px;
}

.seller-name {
  margin-bottom: 10px;
}

.seller-name a {
  color: #FF4747;
  text-decoration: none;
  margin-left: 5px;
}

.seller-rating {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.rating-item {
  text-align: center;
}

.rating-item .label {
  display: block;
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.rating-item .value {
  font-weight: 500;
}

.value.positive {
  color: #00A650;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.quantity-controls button {
  width: 36px;
  height: 36px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls input {
  width: 50px;
  height: 36px;
  border: none;
  text-align: center;
  font-size: 14px;
}

.stock {
  color: #666;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.buy-now,
.add-to-cart {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.buy-now {
  background: #FF4747;
  color: white;
}

.buy-now:hover {
  background: #ff3333;
}

.add-to-cart {
  background: #FFF5F5;
  color: #FF4747;
  border: 1px solid #FF4747;
}

.add-to-cart:hover {
  background: #ffe5e5;
}

.protection-info {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.protection-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}

/* Tabs Stilleri */
.product-details {
  margin-top: 40px;
}

.tabs {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.tabs button {
  padding: 15px 25px;
  border: none;
  background: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  position: relative;
}

.tabs button.active {
  color: #FF4747;
  font-weight: 500;
}

.tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #FF4747;
}

.tab-content {
  padding: 20px 0;
}

.description-content ul {
  list-style: none;
  padding: 0;
}

.description-content li {
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;
}

.description-content li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #FF4747;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table tr {
  border-bottom: 1px solid #eee;
}

.specs-table td {
  padding: 12px;
}

.specs-table td:first-child {
  width: 200px;
  color: #666;
}

.review-stats {
  text-align: center;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
}

.overall-rating {
  display: inline-block;
}

.rating-number {
  font-size: 48px;
  font-weight: 600;
  color: #FF4747;
}

.rating-stars {
  color: #FFB800;
  font-size: 24px;
  margin: 10px 0;
}

.total-reviews {
  color: #666;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
  }

  .seller-rating {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style> 