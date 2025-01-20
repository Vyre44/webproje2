<template>
  <div class="daily-offers">
    <h1 class="title">Günün teklifleri</h1>
    
    <div class="offers-container">
      <!-- Süper Fırsatlar -->
      <div class="offer-section">
        <div class="section-header">
          <h2>Süper Fırsatlar</h2>
          <div class="countdown">
            <i class="fas fa-clock"></i>
            Bitiş: {{ countdownTime }}
          </div>
        </div>
        
        <Swiper
          :modules="[Navigation]"
          :slides-per-view="3"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <SwiperSlide v-for="product in superDealProducts" :key="product.id">
            <div class="product-card">
              <NuxtLink :to="`/product/${product.id}`" class="product-link">
                <img :src="product.image" :alt="product.title">
                <h3>{{ product.title }}</h3>
                <div class="price">
                  <span class="current">{{ product.price }}TL</span>
                  <span class="original">{{ product.originalPrice }}TL</span>
                  <span class="discount">-{{ product.discount }}%</span>
                </div>
                <div class="hover-buttons">
                  <button class="preview-btn">Önizlemeyi görüntüle</button>
                  <button class="similar-btn">Benzer ürünler</button>
                </div>
              </NuxtLink>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Big Save -->
      <div class="offer-section">
        <div class="section-header">
          <h2>Big Save</h2>
          <div class="brands">
            <i class="fas fa-store"></i>
            500+ Marka
          </div>
        </div>
        <Swiper
          :modules="[Navigation]"
          :slides-per-view="3"
          :space-between="20"
          navigation
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <SwiperSlide v-for="product in bigSaveProducts" :key="product.id">
            <div class="product-card">
              <NuxtLink :to="`/product/${product.id}`" class="product-link">
                <img :src="product.image" :alt="product.title">
                <h3>{{ product.title }}</h3>
                <div class="price">
                  <span class="current">{{ product.price }}TL</span>
                  <span class="original">{{ product.originalPrice }}TL</span>
                  <div class="savings">Tasarrufunuz: {{ product.savings }}TL</div>
                </div>
                <div class="hover-buttons">
                  <button class="preview-btn">Önizlemeyi görüntüle</button>
                  <button class="similar-btn">Benzer ürünler</button>
                </div>
              </NuxtLink>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper/modules'

interface Product {
  id: number
  image: string
  title: string
  price: number
  originalPrice: number
  discount?: number
  savings?: number
}

const onSwiper = (swiper: any) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}

const countdownTime = ref('10:00:06')
const superDealProducts = ref<Product[]>([
  {
    id: 1,
    image: '/images/product1.jpg',
    title: 'Yüksek kaliteli çocuk pijama seti Avengers örümcek',
    price: 357.66,
    originalPrice: 1075.78,
    discount: 66
  },
  {
    id: 2,
    image: '/images/product2.jpg',
    title: '12-262 Renk Çift Kalem Ucu İşaretleyiciler Fırça Kalem',
    price: 891.78,
    originalPrice: 1819.98,
    discount: 51
  },
  {
    id: 3,
    image: '/images/product3.jpg',
    title: 'Marvel İnanılmaz örümcek adam dans eden Robot',
    price: 542.38,
    originalPrice: 1558.94,
    discount: 65
  },
  {
    id: 4,
    image: '/images/product4.jpg',
    title: 'Yeni Model Akıllı Saat Pro Max',
    price: 299.99,
    originalPrice: 599.99,
    discount: 50
  },
  {
    id: 5,
    image: '/images/product5.jpg',
    title: 'Kablosuz Bluetooth Kulaklık',
    price: 199.99,
    originalPrice: 399.99,
    discount: 50
  }
])

const bigSaveProducts = ref<Product[]>([
  {
    id: 1,
    image: '/images/product6.jpg',
    title: 'SOYO grafik kartları Radeon Radeon 8G GDDR5',
    price: 3442.37,
    originalPrice: 7171.64,
    savings: 3729.27
  },
  {
    id: 2,
    image: '/images/product7.jpg',
    title: 'İlkbahar Sonbahar 3 Parça Kadın Hırka Eşofman',
    price: 1365.50,
    originalPrice: 3034.47,
    savings: 1668.97
  },
  {
    id: 3,
    image: '/images/product8.jpg',
    title: 'Woopker AK45 HiFi dijital amplifikatör',
    price: 767.25,
    originalPrice: 1665.17,
    savings: 897.92
  },
  {
    id: 4,
    image: '/images/product9.jpg',
    title: 'Akıllı Robot Süpürge',
    price: 2999.99,
    originalPrice: 5999.99,
    savings: 3000.00
  },
  {
    id: 5,
    image: '/images/product10.jpg',
    title: '4K Ultra HD Smart TV',
    price: 4999.99,
    originalPrice: 8999.99,
    savings: 4000.00
  }
])

const dailyProducts = []
</script>

<style scoped>
.daily-offers {
  margin-top: 140px;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;
}

.title {
  font-size: 24px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-header h2 {
  color: #333;
  font-size: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
}

.product-card h3 {
  color: #333;
  font-size: 14px;
}

.price {
  color: #333;
}

.product-swiper {
  width: 100%;
  height: 100%;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #333;
}

:deep(.swiper-slide) {
  height: auto;
}

.offers-container {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.offer-section {
  flex: 1;
  min-width: 0;
  background: #f0f0f0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.section-header {
  padding: 0 8px 12px 8px;
  margin-bottom: 15px;
  border-bottom: none;
}

.section-header h2 {
  font-size: 16px;
  font-weight: 500;
  color: #222;
}

.countdown, .brands {
  color: #ee4d2d;
  font-size: 13px;
  background: #fff1f0;
  padding: 4px 8px;
  border-radius: 4px;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  background: rgba(255, 255, 255, 0.9);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15);
}

:deep(.swiper-button-next)::after,
:deep(.swiper-button-prev)::after {
  font-size: 10px;
}

.product-card {
  background: white;
  border-radius: 4px;
  padding: 8px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.product-card img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  margin-bottom: 8px;
  background: white;
}

.product-card h3 {
  font-size: 13px;
  margin: 8px 0;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 36px;
  line-height: 1.4;
}

.price {
  margin-top: auto;
  padding: 8px 0;
}

.price .current {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  display: block;
}

.price .original {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
  margin-right: 6px;
}

.price .discount, .price .savings {
  color: #ee4d2d;
  font-size: 13px;
}

.hover-buttons {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.product-card:hover .hover-buttons {
  opacity: 1;
}

.preview-btn,
.similar-btn {
  width: 100%;
  padding: 8px;
  border: none;
  background: transparent;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
  border: 1px solid white;
}

.preview-btn:hover,
.similar-btn:hover {
  background: white;
  color: #333;
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.product-card {
  cursor: pointer;
}

/* Responsive tasarım */
@media (min-width: 1400px) {
  :deep(.swiper-slide) {
    width: calc(33.333% - 20px) !important;
  }
}

@media (max-width: 1399px) {
  :deep(.swiper-slide) {
    width: calc(50% - 15px) !important;
  }
}

@media (max-width: 1200px) {
  .offers-container {
    flex-direction: column;
  }
  
  .offer-section {
    margin-bottom: 30px;
  }
}

@media (max-width: 768px) {
  .daily-offers {
    padding: 20px;
  }

  :deep(.swiper-slide) {
    width: 100% !important;
  }

  .product-card img {
    height: 150px;
  }
}

/* Swiper navigasyon butonlarını düzenleyelim */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  top: 40%;
}

:deep(.swiper-button-prev) {
  left: 5px;
}

:deep(.swiper-button-next) {
  right: 5px;
}

h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 15px;
  }
}
</style>