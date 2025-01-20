<template>
  <div class="account-overview">
    <!-- Sol Menü -->
    <div class="sidebar">
      <h3>Hesap</h3>
      <ul class="menu-list">
        <li><NuxtLink to="/account" class="menu-link">Genel bakış</NuxtLink></li>
        <li class="active">Emirler</li>
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

      <!-- Sipariş Durumu -->
      <div class="order-status">
        <div class="status-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'credit-card']" />
          </div>
          <span>Ödenmemiş</span>
        </div>
        <div class="status-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'box']" />
          </div>
          <span>Gönderilecekler</span>
        </div>
        <div class="status-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'truck']" />
          </div>
          <span>Gönderilen</span>
        </div>
        <div class="status-item">
          <div class="icon-circle">
            <font-awesome-icon :icon="['fas', 'star']" />
          </div>
          <span>İncelenecekler</span>
        </div>
      </div>

      <!-- Sipariş Listesi -->
      <div class="orders-list">
        <div class="order-item">
          <div class="order-header">
            <div class="order-info">
              <span class="order-date">Sipariş tarihi: 15 Mart 2024</span>
              <span class="order-number">Sipariş no: #123456789</span>
            </div>
            <div class="order-status-badge">
              Kargoya verildi
            </div>
          </div>
          <div class="product-list">
            <div class="product-item">
              <img src="https://placehold.co/100x100" alt="Ürün resmi" class="product-image" />
              <div class="product-details">
                <h4 class="product-title">iPhone 15 Pro Max Silikon Kılıf</h4>
                <p class="product-specs">Renk: Siyah, Boyut: iPhone 15 Pro Max</p>
                <div class="product-price">
                  <span class="price">₺249.99</span>
                  <span class="quantity">x 1</span>
                </div>
              </div>
              <div class="product-actions">
                <button class="action-button">Ürünü Değerlendir</button>
                <button class="action-button">Tekrar Satın Al</button>
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
import { getAuth } from 'firebase/auth'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCreditCard, faBox, faTruck, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faCreditCard, faBox, faTruck, faStar)

const auth = getAuth()
const userName = ref('Kullanıcı')

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    userName.value = user.displayName || user.email?.split('@')[0] || 'Kullanıcı'
  }
})

useHead({
  title: 'Siparişlerim - AliExpress Clone'
})
</script>

<style scoped>
.account-overview {
  display: flex;
  max-width: 1200px;
  margin: 250px auto 20px;
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
}

.qr-icon {
  font-size: 150px;
  color: #666;
  margin: 20px 0;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar i {
  font-size: 30px;
  color: #666;
}

.order-status {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
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
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #FF4747;
  transition: all 0.3s ease;
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

.orders-list {
  margin-top: 30px;
}

.order-item {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #f9f9f9;
  border-bottom: 1px solid #eee;
}

.order-info {
  display: flex;
  gap: 20px;
}

.order-date, .order-number {
  color: #666;
  font-size: 14px;
}

.order-status-badge {
  background: #FF4747;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
}

.product-list {
  padding: 20px;
}

.product-item {
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.product-item:last-child {
  border-bottom: none;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.product-details {
  flex: 1;
}

.product-title {
  font-size: 16px;
  color: #333;
  margin: 0 0 8px 0;
}

.product-specs {
  color: #666;
  font-size: 14px;
  margin: 0 0 12px 0;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
}

.price {
  font-size: 16px;
  font-weight: 500;
  color: #FF4747;
}

.quantity {
  color: #666;
  font-size: 14px;
}

.product-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 150px;
}

.action-button {
  padding: 8px 16px;
  border: 1px solid #FF4747;
  background: white;
  color: #FF4747;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.action-button:hover {
  background: #FF4747;
  color: white;
}

.status-item .count {
  color: #666;
  font-size: 13px;
}

.status-item:hover .count {
  color: #FF4747;
}
</style> 