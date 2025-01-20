<template>
  <div class="super-buyer">
    <div class="super-buyer-header">
      <div class="logo-section">
        <h2>SuperBuyer</h2>
        <div class="features">
          <span><i class="fas fa-check"></i> Vergi muafiyetleri</span>
          <span><i class="fas fa-bolt"></i> Ekspres Ödemeler</span>
          <span><i class="fas fa-hand-holding-usd"></i> Finansal destek</span>
        </div>
        <button class="buy-now" @click="handleBuyNow">Şimdi satın alın</button>
      </div>
      <div class="stats">
        <div class="stat">
          <span>5M+</span>
          <p>Doğrudan fabrikadan tedarik</p>
        </div>
        <div class="stat">
          <span>20M+</span>
          <p>Değerli stoksuz satış ürünleri</p>
        </div>
        <div class="stat">
          <span>10</span>
          <p>Dünya çapındaki yerel depolar</p>
        </div>
        <div class="stat">
          <span>24H</span>
          <p>Kişiselleştirilmiş tedarik hizmeti</p>
        </div>
      </div>
    </div>

    <div class="product-sections">
      <div class="product-section">
        <div class="section-content">
          <h3>Toplu satın alın</h3>
          <div class="product-grid">
            <div class="product" v-for="product in bulkProducts" :key="product.id">
              <NuxtLink :to="`/product/${product.id}`" class="product-link">
                <img :src="product.image" :alt="product.name">
                <div class="product-info">
                  <div class="price">{{ product.price }}TL</div>
                  <div class="quantity">≥{{ product.minQuantity }} adet</div>
                  <div class="retail">Perakende:{{ product.retailPrice }}TL</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="product-section">
        <div class="section-content">
          <h3>Hızlı teslimat</h3>
          <div class="product-grid">
            <div class="product" v-for="product in fastDeliveryProducts" :key="product.id">
              <NuxtLink :to="`/product/${product.id}`" class="product-link">
                <img :src="product.image" :alt="product.name">
                <div class="product-info">
                  <div class="price">{{ product.price }}TL</div>
                  <div class="original-price">{{ product.originalPrice }}TL</div>
                  <div class="delivery">2 gün içinde kargoya verilir</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="product-section">
        <div class="section-content">
          <h3>Tekrar satın alın</h3>
          <div class="product-grid">
            <div class="product" v-for="product in repeatProducts" :key="product.id">
              <NuxtLink :to="`/product/${product.id}`" class="product-link">
                <img :src="product.image" :alt="product.name">
                <div class="product-info">
                  <div class="price">{{ product.price }}TL</div>
                  <div class="original-price">{{ product.originalPrice }}TL</div>
                  <div class="similar">Benzer ürünler</div>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface BulkProduct {
  id: number
  image: string
  name: string
  price: string
  minQuantity: number
  retailPrice: string
}

interface DeliveryProduct {
  id: number
  image: string
  name: string
  price: string
  originalPrice: string
}

const router = useRouter()

const handleBuyNow = () => {
  router.push('/products')
}

const bulkProducts: BulkProduct[] = [
  {
    id: 1,
    image: '/images/product1.jpg',
    name: 'Ürün 1',
    price: '161,36',
    minQuantity: 5,
    retailPrice: '165,48'
  },
  {
    id: 2,
    image: '/images/product2.jpg',
    name: 'Ürün 2',
    price: '245,90',
    minQuantity: 3,
    retailPrice: '299,99'
  }
]

const fastDeliveryProducts: DeliveryProduct[] = [
  {
    id: 1,
    image: '/images/product3.jpg',
    name: 'Ürün 3',
    price: '393,00',
    originalPrice: '1.176,78'
  },
  {
    id: 2,
    image: '/images/product4.jpg',
    name: 'Ürün 4',
    price: '450,00',
    originalPrice: '899,99'
  }
]

const repeatProducts: DeliveryProduct[] = [
  {
    id: 1,
    image: '/images/product5.jpg',
    name: 'Ürün 5',
    price: '200,13',
    originalPrice: '400,65'
  },
  {
    id: 2,
    image: '/images/product6.jpg',
    name: 'Ürün 6',
    price: '150,00',
    originalPrice: '299,99'
  }
]
</script>

<style scoped>
.super-buyer {
  margin: 30px auto;
  max-width: 1200px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              url('/images/business-people.png') center/cover no-repeat;
  border-radius: 12px;
  color: white;
  padding: 30px;
  min-height: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.super-buyer-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 40px;
}

.logo-section h2 {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.features {
  display: flex;
  gap: 25px;
  margin-bottom: 25px;
}

.features span {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}

.features i {
  color: #4CAF50;
  font-size: 18px;
}

.buy-now {
  background: #FF4747;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.buy-now:hover {
  background: #ff3333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.stats {
  display: flex;
  gap: 40px;
}

.stat {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 20px;
  border-radius: 8px;
  backdrop-filter: blur(5px);
  min-width: 150px;
}

.stat span {
  font-size: 24px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #FF4747;
}

.stat p {
  font-size: 13px;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
}

.product-sections {
  display: flex;
  gap: 25px;
  margin: 30px 0;
}

.product-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.section-content {
  background: white;
  padding: 25px;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.product-section h3 {
  color: #333;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
}

.product-section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: #FF4747;
  border-radius: 2px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  flex: 1;
}

.product {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: calc(100% - 24px);
  display: flex;
  flex-direction: column;
}

.product:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: #FF4747;
}

.product img {
  width: 100%;
  height: 120px;
  object-fit: contain;
  margin-bottom: 12px;
  transition: transform 0.3s ease;
}

.product:hover img {
  transform: scale(1.05);
}

.product-info {
  font-size: 14px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price {
  font-size: 16px;
  font-weight: bold;
  color: #FF4747;
  margin-bottom: 4px;
}

.original-price, .retail {
  color: #999;
  text-decoration: line-through;
  font-size: 13px;
}

.quantity, .delivery, .similar {
  color: #666;
  font-size: 13px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

@media (max-width: 1200px) {
  .super-buyer {
    margin: 20px;
  }

  .product-sections {
    flex-direction: column;
  }
  
  .product-section {
    width: 100%;
  }

  .super-buyer-header {
    flex-direction: column;
    gap: 30px;
  }

  .stats {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .stat {
    min-width: 120px;
  }
}

@media (max-width: 768px) {
  .super-buyer {
    padding: 20px;
    margin: 10px;
  }

  .features {
    flex-direction: column;
    gap: 15px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    gap: 15px;
  }

  .stat {
    flex: 0 0 calc(50% - 15px);
    min-width: auto;
  }

  .logo-section h2 {
    font-size: 24px;
  }

  .features span {
    font-size: 14px;
  }

  .buy-now {
    width: 100%;
    padding: 10px 20px;
  }
}
</style> 