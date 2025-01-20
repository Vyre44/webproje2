<template>
  <div class="category-grid">
    <div class="grid-container">
      <!-- Sol büyük kart -->
      <div class="viva-card">
        <h3>Viva</h3>
        <p>Sizin moda seçiminiz</p>
        <button class="buy-now">Şimdi satın alın</button>
        <div class="product-grid">
          <div class="product" v-for="product in vivaProducts" :key="product.id">
            <NuxtLink :to="`/product/${product.id}`" class="product-link">
              <img :src="product.image" :alt="product.name">
              <div class="product-info">
                <div class="product-name">{{ product.name }}</div>
                <div class="price">{{ product.price }}TL</div>
                <div class="original-price">{{ product.originalPrice }}TL</div>
                <div class="stats">
                  <span class="rating">★ {{ product.rating }}</span>
                  <span class="sales">{{ product.sales }}+ satıldı</span>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Sağ kategori kartları -->
      <div class="category-section">
        <h2 class="section-title">Kategoriye Göre Alışveriş</h2>
        <div class="category-cards-container">
          <button class="nav-button prev" @click="slidePrev">
            <font-awesome-icon icon="chevron-left" />
          </button>
          
          <div class="category-cards" ref="categoryCardsRef">
            <div class="category-card" v-for="category in categories" :key="category.id">
              <img :src="category.image" :alt="category.name">
              <div class="category-info">
                <h3>{{ category.name }}</h3>
                <span class="product-count">{{ category.productCount.toLocaleString() }} ürün</span>
              </div>
            </div>
          </div>

          <button class="nav-button next" @click="slideNext">
            <font-awesome-icon icon="chevron-right" />
          </button>
        </div>
      </div>
    </div>

    <!-- Beğenebileceğiniz Diğer Ürünler -->
    <div class="recommended-products">
      <h2 class="title">Beğenebileceğiniz Diğer Ürünler</h2>
      <div class="products-grid">
        <div class="product-card" v-for="product in recommendedProducts" :key="product.id">
          <div class="image-container">
            <img :src="product.image" :alt="product.name">
            <div class="hover-buttons">
              <button class="hover-button quick-view">
                <font-awesome-icon icon="eye" /> Ürünü İncele
              </button>
              <button class="hover-button" @click.stop="handleAddToCart(product)">
                <font-awesome-icon icon="shopping-cart" /> Sepete Ekle
              </button>
            </div>
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <div class="price-container">
              <span class="price">{{ product.price }}TL</span>
              <span class="original-price">{{ product.originalPrice }}TL</span>
            </div>
            <div class="rating">
              <span class="stars">★ {{ product.rating || "4.5" }}</span>
              <span class="sales">{{ product.sales }}+ satıldı</span>
            </div>
            <div class="shipping" v-if="product.freeShipping">Ücretsiz sevkiyat</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Local state için ref'ler
interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
}

interface VivaProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  sales: number;
}

interface RecommendedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  sales: number;
  freeShipping?: boolean;
}

const categories = ref<Category[]>([
  {
    id: 1,
    name: "Elektronik",
    image: "/categories/electronics.jpg",
    productCount: 15420
  },
  {
    id: 2,
    name: "Moda",
    image: "/categories/fashion.jpg",
    productCount: 24150
  },
  {
    id: 3,
    name: "Ev & Yaşam",
    image: "/categories/home.jpg",
    productCount: 18730
  },
  {
    id: 4,
    name: "Spor & Outdoor",
    image: "/categories/sports.jpg",
    productCount: 9845
  },
  {
    id: 5,
    name: "Kozmetik",
    image: "/categories/cosmetics.jpg",
    productCount: 12680
  },
  {
    id: 6,
    name: "Oyun & Hobi",
    image: "/categories/gaming.jpg",
    productCount: 7420
  },
  {
    id: 7,
    name: "Kitap & Müzik",
    image: "/categories/books.jpg",
    productCount: 32150
  },
  {
    id: 8,
    name: "Bebek & Oyuncak",
    image: "/categories/baby.jpg",
    productCount: 15890
  },
  {
    id: 9,
    name: "Otomotiv",
    image: "/categories/automotive.jpg",
    productCount: 8920
  },
  {
    id: 10,
    name: "Süpermarket",
    image: "/categories/supermarket.jpg",
    productCount: 28450
  },
  {
    id: 11,
    name: "Yapı Market",
    image: "/categories/hardware.jpg",
    productCount: 11230
  },
  {
    id: 12,
    name: "Sağlık",
    image: "/categories/health.jpg",
    productCount: 9630
  }
])

const vivaProducts = ref<VivaProduct[]>([
  {
    id: 1,
    name: "Viva Comfort Fit Spor Ayakkabı",
    price: 899.99,
    originalPrice: 1299.99,
    image: "/products/viva-sneaker.jpg",
    rating: 4.8,
    sales: 1250
  },
  {
    id: 2,
    name: "Viva Premium Deri Ceket",
    price: 2499.99,
    originalPrice: 3499.99,
    image: "/products/viva-jacket.jpg",
    rating: 4.9,
    sales: 856
  }
])

const recommendedProducts = ref<RecommendedProduct[]>([
  {
    id: 1,
    name: "Apple iPhone 14 Pro Max 256GB",
    price: 54999,
    originalPrice: 59999,
    image: "/products/iphone.jpg",
    rating: 4.9,
    sales: 1250,
    freeShipping: true
  },
  {
    id: 2,
    name: "Samsung 65\" QLED 4K Smart TV",
    price: 29999,
    originalPrice: 34999,
    image: "/products/samsung-tv.jpg",
    rating: 4.8,
    sales: 856,
    freeShipping: true
  },
  {
    id: 3,
    name: "Sony WH-1000XM4 Kulaklık",
    price: 7299,
    originalPrice: 8499,
    image: "/products/sony-headphones.jpg",
    rating: 4.9,
    sales: 2341,
    freeShipping: true
  },
  {
    id: 4,
    name: "MacBook Air M2 8GB 256GB",
    price: 39999,
    originalPrice: 42999,
    image: "/products/macbook.jpg",
    rating: 4.8,
    sales: 978,
    freeShipping: true
  },
  {
    id: 5,
    name: "DJI Mini 3 Pro Drone",
    price: 15999,
    originalPrice: 17999,
    image: "/products/drone.jpg",
    rating: 4.7,
    sales: 445,
    freeShipping: true
  },
  {
    id: 6,
    name: "PlayStation 5 Digital Edition",
    price: 17999,
    originalPrice: 19999,
    image: "/products/ps5.jpg",
    rating: 4.9,
    sales: 1567,
    freeShipping: true
  },
  {
    id: 7,
    name: "Dyson V15 Detect Absolute",
    price: 12999,
    originalPrice: 14999,
    image: "/products/dyson.jpg",
    rating: 4.8,
    sales: 789,
    freeShipping: true
  },
  {
    id: 8,
    name: "iPad Pro 12.9\" M2 128GB",
    price: 24999,
    originalPrice: 27999,
    image: "/products/ipad.jpg",
    rating: 4.9,
    sales: 678,
    freeShipping: true
  },
  {
    id: 9,
    name: "Nintendo Switch OLED",
    price: 9999,
    originalPrice: 11999,
    image: "/products/switch.jpg",
    rating: 4.7,
    sales: 1234,
    freeShipping: true
  },
  {
    id: 10,
    name: "Canon EOS R6 Mark II",
    price: 44999,
    originalPrice: 47999,
    image: "/products/canon.jpg",
    rating: 4.8,
    sales: 234,
    freeShipping: true
  }
]) // son iki ürünü kaldırdık

const categoryCardsRef = ref<HTMLElement | null>(null)
let currentSlide = ref(0)
const itemsPerPage = 6 // 3x2 grid
const maxSlide = Math.ceil(categories.value.length / itemsPerPage) - 1

// Cart işlemleri
const handleAddToCart = async (product: RecommendedProduct) => {
  try {
    // Sepete ekleme işlemi için event emit edelim
    emit('add-to-cart', {
      id: String(product.id),
      name: product.name,
      quantity: 1,
      image: product.image,
      price: product.price
    })
    alert('Ürün sepete eklendi')
  } catch (error) {
    console.error('Add to cart error:', error)
  }
}

// Event tanımlaması
const emit = defineEmits(['add-to-cart'])

onMounted(() => {
  updateSlidePosition()
})

// Slider fonksiyonları
const updateSlidePosition = () => {
  if (categoryCardsRef.value) {
    const offset = currentSlide.value * -100
    categoryCardsRef.value.style.transform = `translateX(${offset}%)`
  }
}

const slidePrev = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
    updateSlidePosition()
  }
}

const slideNext = () => {
  if (currentSlide.value < 1) {
    currentSlide.value++
    updateSlidePosition()
  }
}

defineExpose({
  slidePrev,
  slideNext,
  updateSlidePosition
})
</script>

<style scoped>
.category-grid {
  margin: 40px 0;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* İki eşit bölüm */
  gap: 30px;
  max-width: 1000px; /* 1200px'den 1000px'e düşürdük */
  margin: 0 auto;
}

/* Viva Card Styles */
.viva-card {
  background: #FFF5F5;
  border-radius: 12px;
  padding: 25px;
  height: 100%;
  min-height: 400px; /* Minimum yükseklik ekledik */
}

.viva-card h3 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 5px;
}

.viva-card p {
  color: #666;
  margin-bottom: 15px;
  font-size: 14px;
}

.buy-now {
  background: #000;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 25px;
  font-size: 14px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
}

.product {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.product img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-info {
  padding: 10px;
}

.product-name {
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
}

.price {
  font-weight: 600;
  color: #FF4747;
  font-size: 16px;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 12px;
}

.stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
}

/* Category Section Styles */
.category-section {
  position: relative;
  overflow: visible;
  margin-top: 0;
  height: 100%;
  min-height: 400px;
  max-width: 450px; /* Kategori bölümü için maksimum genişlik */
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.category-cards-container {
  position: relative;
  overflow: hidden;
  padding: 0 45px;
  width: 100%;
  height: 400px;
}

.category-cards {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 12px; /* Gap'i biraz azalttık */
  transition: transform 0.3s ease;
  width: 200%;
  height: 100%;
}

.category-card {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.category-card:hover img {
  transform: scale(1.05);
}

.category-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
  transition: background 0.3s ease;
}

.category-card:hover .category-info {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.category-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.category-info .product-count {
  font-size: 14px;
  opacity: 0.9;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #f0f0f0;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 200; /* z-index'i artırdık */
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
}

.nav-button.prev {
  left: 10px;
}

.nav-button.next {
  right: 10px;
}

@media (max-width: 1200px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
  
  .viva-card {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .category-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

.recommended-products {
  margin-top: 40px;
  padding: 0 20px;
}

.recommended-products .title {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.image-container {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background: #fff;
}

.image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  padding: 10px;
}

.product-card:hover .image-container img {
  transform: scale(1.02);
}

.hover-buttons {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.95);
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
}

.product-card:hover .hover-buttons {
  opacity: 1;
  transform: translateY(0);
}

.hover-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  background: #f5f5f5;
  color: #333;
  font-weight: 500;
}

.hover-button:hover {
  background: #e8e8e8;
}

.quick-view {
  background: #FF4747;
  color: white;
}

.quick-view:hover {
  background: #ff3333;
  transform: translateY(-1px);
}

.product-info {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-info h3 {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.price-container {
  margin-top: auto;
  margin-bottom: 8px;
}

.price {
  color: #FF4747;
  font-size: 16px;
  font-weight: 500;
}

.original-price {
  color: #999;
  font-size: 13px;
  text-decoration: line-through;
  margin-left: 5px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
}

.stars {
  color: #FFB800;
}

.shipping {
  font-size: 12px;
  color: #00A650;
  margin-top: 4px;
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-card {
  cursor: pointer;
}

.cart-icon {
  position: absolute;
  bottom: 60px; /* Yazıların üstünde kalması için */
  right: 10px;
  background: rgba(255, 255, 255, 0.9);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;
  border: none;
  color: #333;
}

.cart-icon:hover {
  background: #FF4747;
  color: white;
  transform: scale(1.1);
}
</style>