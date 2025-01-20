<template>
  <div class="account-overview">
    <!-- Sol Menü -->
    <div class="sidebar">
      <h3>Hesap</h3>
      <ul class="menu-list">
        <li class="active">Genel bakış</li>
        <li><NuxtLink to="/account/orders" class="menu-link">Emirler</NuxtLink></li>
        <li>Ödeme</li>
        <li>Ürün ve para iadesi</li>
        <li>Geribildirim</li>
        <li>Ayarlar</li>
        <li>Kargo adresi</li>
        <li>Mesaj merkezi</li>
        <li>Arkadaş davet edin</li>
        <li>Yardım Merkezi</li>
        <li>Raporları yönetmek</li>
        <li>Öneri</li>
        <li>Dropshipping merkezi</li>
        <li>Ceza bilgileri</li>
        <li>Geri çağırmalar ve ürün güvenliği uyarıları</li>
      </ul>

      <!-- QR Kod Bölümü -->
      <div class="qr-section">
        <h4>AliExpress Mobile App</h4>
        <p>Herzaman, Anywhere ara!</p>
        <font-awesome-icon icon="fa-solid fa-qrcode" class="qr-icon" />
        <p>Tarama veya indirmek için tıklayın</p>
      </div>
    </div>

    <!-- Ana İçerik -->
    <div class="main-content">
      <!-- Kullanıcı Profil Başlığı -->
      <div class="profile-header">
        <div class="profile-info">
          <div class="profile-avatar">
            <font-awesome-icon icon="fa-solid fa-user" />
          </div>
          <h2>{{ userName }}</h2>
        </div>
      </div>

      <!-- Hızlı Erişim Menüsü -->
      <div class="quick-access">
        <NuxtLink to="/account/wishlist" class="quick-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'heart']" />
          </div>
          <span>İstek listesi</span>
        </NuxtLink>
        <NuxtLink to="/account/following" class="quick-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'users']" />
          </div>
          <span>Takip edilenler</span>
        </NuxtLink>
        <NuxtLink to="/account/viewed" class="quick-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'clock']" />
          </div>
          <span>Bakılanlar</span>
        </NuxtLink>
        <NuxtLink to="/account/coupons" class="quick-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'ticket']" />
          </div>
          <span>Kuponlar</span>
        </NuxtLink>
        <NuxtLink to="/account/credit" class="quick-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'credit-card']" />
          </div>
          <span>Alışveriş kredisi</span>
        </NuxtLink>
      </div>

      <!-- Siparişler Bölümü -->
      <div class="orders-section">
        <div class="section-header">
          <h3>Siparişler</h3>
          <NuxtLink to="/account/orders" class="view-all">Tümünü gör <i class="fas fa-chevron-right"></i></NuxtLink>
        </div>
        <div class="order-status">
          <div class="status-item">
            <div class="icon-circle">
              <font-awesome-icon icon="fa-solid fa-wallet" />
            </div>
            <span>Ödenmemiş</span>
          </div>
          <div class="status-item">
            <div class="icon-circle">
              <font-awesome-icon icon="fa-solid fa-box" />
            </div>
            <span>Gönderilecekler</span>
          </div>
          <div class="status-item">
            <div class="icon-circle">
              <font-awesome-icon icon="fa-solid fa-truck" />
            </div>
            <span>Gönderilen</span>
          </div>
          <div class="status-item">
            <div class="icon-circle">
              <font-awesome-icon icon="fa-solid fa-check-circle" />
            </div>
            <span>İncelenecekler</span>
          </div>
        </div>
      </div>

      <!-- İtirazlar ve İadeler -->
      <div class="disputes-section">
        <div class="dispute-item">
          <font-awesome-icon icon="fa-solid fa-exclamation-circle" />
          <span>İtirazlar</span>
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </div>
        <div class="dispute-item">
          <font-awesome-icon icon="fa-solid fa-undo" />
          <span>Ürün ve para iadesi</span>
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </div>
      </div>

      <!-- Beğenebileceğiniz Ürünler -->
      <div class="recommended-products">
        <div class="section-header">
          <h3>Beğenebileceğiniz ürünler</h3>
        </div>
        <div class="product-grid">
          <div class="product-card">
            <div class="product-image">
              <img src="https://placehold.co/200x200" alt="Ürün resmi" />
            </div>
            <div class="product-info">
              <div class="product-price">
                <span class="current-price">794.21TL</span>
                <span class="original-price">1321.21TL</span>
              </div>
              <div class="product-rating">
                <span class="stars">★★★★★</span>
                <span class="rating">4.5</span>
                <span class="sales">148+ satıldı</span>
              </div>
              <div class="product-actions">
                <button class="action-btn">Önizlemeyi görüntüle</button>
                <button class="action-btn">Benzer ürünler</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useFirebase } from '@/composables/firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faHeart, faUsers, faClock, faTicket, faCreditCard, 
  faBox, faTruck, faStar, faQrcode, faUser, faWallet,
  faCheckCircle, faExclamationCircle, faChevronRight,
  faUndo
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart, faUsers, faClock, faTicket, faCreditCard, 
  faBox, faTruck, faStar, faQrcode, faUser, faWallet,
  faCheckCircle, faExclamationCircle, faChevronRight,
  faUndo
)

const { auth } = useFirebase()
const userName = ref('Kullanıcı')

onMounted(() => {
  const user = auth?.currentUser
  if (user) {
    userName.value = user.displayName || user.email?.split('@')[0] || 'Kullanıcı'
  }
})

useHead({
  title: 'Hesabım - AliExpress Clone'
})
</script>

<style scoped>
.account-overview {
  display: flex;
  max-width: 1200px;
  margin: 150px auto 20px;
  gap: 20px;
  padding: 0 20px;
}

.sidebar {
  width: 250px;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-list li {
  padding: 12px 0;
  cursor: pointer;
  color: #333;
}

.menu-list li:hover {
  color: #ff4747;
}

.menu-list li.active {
  color: #ff4747;
  font-weight: bold;
}

.qr-section {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  border-top: 1px solid #eee;
  cursor: pointer;
}

.qr-section h4 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.qr-section p {
  color: #666;
  font-size: 13px;
  margin: 8px 0;
}

.qr-icon {
  font-size: 80px;
  color: #333;
  margin: 15px 0;
  display: block;
}

.main-content {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.profile-header {
  margin-bottom: 30px;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar svg {
  font-size: 20px;
  color: #666;
}

.quick-access {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.quick-item:hover {
  background: #f8f8f8;
}

.quick-item:hover .icon-circle {
  background: #FF4747;
  color: white;
}

.icon-circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #FF4747;
  transition: all 0.3s ease;
}

.quick-item span {
  color: #333;
  font-size: 14px;
}

.count {
  color: #666;
  font-size: 13px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h3 {
  color: #000;
  font-weight: 500;
}

.view-all {
  color: #666;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 5px;
}

.order-status {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.status-item:hover {
  background: #f8f8f8;
}

.status-item:hover .icon-circle {
  background: #FF4747;
  color: white;
}

.status-item span {
  color: #333;
  font-size: 14px;
}

.status-item .icon-circle {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #FF4747;
  transition: all 0.3s ease;
}

.disputes-section {
  margin: 30px 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.dispute-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
  gap: 8px;
}

.dispute-item:first-child {
  border-bottom: 1px solid #eee;
}

.dispute-item span {
  flex: 1;
  color: #000;
  font-size: 14px;
}

.dispute-item svg {
  color: #666;
  width: 12px;
  height: 12px;
}

.dispute-item svg:first-child {
  color: #FF4747;
  width: 14px;
  height: 14px;
}

.recommended-products {
  margin-top: 30px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-card:hover {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.product-image {
  width: 100%;
  aspect-ratio: 1;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-price {
  margin-bottom: 8px;
}

.current-price {
  color: #FF4747;
  font-size: 18px;
  font-weight: 600;
}

.original-price {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
  margin-left: 8px;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 14px;
}

.stars {
  color: #FFB800;
}

.rating {
  color: #666;
}

.sales {
  color: #666;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.action-btn {
  width: 100%;
  padding: 8px;
  border: none;
  background: #333;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
}

.action-btn:hover {
  background: #000;
}

.profile-info h2 {
  color: #000;
  font-weight: 500;
}

.menu-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.menu-list li:hover .menu-link {
  color: #ff4747;
}
</style> 