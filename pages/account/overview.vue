<template>
  <div class="account-page">
    <div class="page-layout">
      <!-- Sol Menü -->
      <div class="sidebar">
        <h3>Hesap</h3>
        <ul class="menu-list">
          <li class="active"><NuxtLink to="/account" class="menu-link">Genel bakış</NuxtLink></li>
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
          <i class="fas fa-qrcode qr-icon"></i>
          <p>Tarama veya indirmek için tıklayın</p>
        </div>
      </div>

      <!-- Ana İçerik -->
      <div class="main-content">
        <!-- Profil Özeti -->
        <div class="profile-summary">
          <div class="user-info">
            <div class="avatar">
              <img :src="userAvatar" alt="Profil" class="avatar-img">
              <div class="avatar-edit">
                <i class="fas fa-camera"></i>
              </div>
            </div>
            <div class="user-details">
              <h2>{{ userName }}</h2>
              <p class="member-since">Üyelik: {{ memberSince }}</p>
              <div class="user-stats">
                <div class="stat">
                  <span class="stat-value">{{ followersCount }}</span>
                  <span class="stat-label">Takipçi</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ followingCount }}</span>
                  <span class="stat-label">Takip Edilen</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- İstatistikler -->
        <div class="stats-grid">
          <div class="stat-card">
            <i class="fas fa-shopping-cart stat-icon"></i>
            <div class="stat-info">
              <span class="stat-value">{{ orderCount }}</span>
              <span class="stat-label">Siparişler</span>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-heart stat-icon"></i>
            <div class="stat-info">
              <span class="stat-value">{{ wishlistCount }}</span>
              <span class="stat-label">İstek Listesi</span>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-star stat-icon"></i>
            <div class="stat-info">
              <span class="stat-value">{{ reviewCount }}</span>
              <span class="stat-label">Değerlendirmeler</span>
            </div>
          </div>
          <div class="stat-card">
            <i class="fas fa-coins stat-icon"></i>
            <div class="stat-info">
              <span class="stat-value">{{ points }}</span>
              <span class="stat-label">Puanlar</span>
            </div>
          </div>
        </div>

        <!-- Son Aktiviteler -->
        <div class="recent-activities">
          <h3>Son Aktiviteler</h3>
          <div class="activity-list">
            <div v-if="activities.length === 0" class="no-activities">
              <i class="fas fa-history empty-icon"></i>
              <p>Henüz aktivite yok</p>
            </div>
            <div v-else class="activity-item" v-for="activity in activities" :key="activity.id">
              <div class="activity-icon">
                <i :class="activity.icon"></i>
              </div>
              <div class="activity-details">
                <p class="activity-text">{{ activity.text }}</p>
                <span class="activity-time">{{ activity.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { auth } from '~/composables/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Kullanıcı bilgileri
const userAvatar = ref('/images/default-avatar.png')
const userName = ref('Kullanıcı Adı')
const memberSince = ref('Ocak 2024')
const followersCount = ref(0)
const followingCount = ref(0)

// İstatistikler
const orderCount = ref(0)
const wishlistCount = ref(0)
const reviewCount = ref(0)
const points = ref(0)

// Aktiviteler
const activities = ref([
  {
    id: 1,
    icon: 'fas fa-shopping-bag',
    text: 'Yeni bir sipariş verdiniz',
    time: '2 saat önce'
  },
  {
    id: 2,
    icon: 'fas fa-heart',
    text: 'Bir ürünü favorilere eklediniz',
    time: '1 gün önce'
  }
])

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userName.value = user.displayName || 'Kullanıcı Adı'
      userAvatar.value = user.photoURL || '/images/default-avatar.png'
      memberSince.value = new Date(user.metadata.creationTime || '').toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long'
      })
    }
  })
})
</script>

<style scoped>
.account-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-layout {
  display: flex;
  gap: 20px;
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

.menu-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.menu-list li:hover .menu-link {
  color: #ff4747;
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
}

.profile-summary {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  gap: 20px;
  align-items: center;
}

.avatar {
  position: relative;
  width: 100px;
  height: 100px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #ff4747;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
}

.user-details {
  flex: 1;
}

.user-details h2 {
  margin: 0 0 5px 0;
  color: #333;
}

.member-since {
  color: #666;
  margin: 0 0 10px 0;
}

.user-stats {
  display: flex;
  gap: 20px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-weight: bold;
  color: #333;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.stat-icon {
  font-size: 24px;
  color: #ff4747;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.recent-activities {
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.recent-activities h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.activity-icon {
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff4747;
}

.activity-details {
  flex: 1;
}

.activity-text {
  margin: 0;
  color: #333;
}

.activity-time {
  font-size: 0.9em;
  color: #666;
}

.no-activities {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.empty-icon {
  font-size: 48px;
  color: #ddd;
  margin-bottom: 20px;
}
</style> 