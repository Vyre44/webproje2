<template>
  <nav class="navbar" :class="{ 'hidden': !isNavbarVisible }">
    <div class="navbar-container">
      <div class="navbar-top">
        <div class="navbar-left">
          <NuxtLink to="/" class="logo-link">
            <img class="logo" src="/logo.png" alt="Logo" />
          </NuxtLink>
          <div class="search-container">
            <input
              type="text" 
              placeholder="Gümrüksüz vergisiz ürünler"
              class="search-bar"
              v-model="searchQuery"
              @keyup.enter="handleSearch"
            />
            <button class="search-button" @click="handleSearch">
              <font-awesome-icon icon="fa-solid fa-search" />
            </button>
          </div>
        </div>
        <div class="navbar-right">
          <div class="language-selector">
            <font-awesome-icon icon="fa-solid fa-globe" class="text-lg mb-1" />
            <span>TR</span>
          </div>
          <div class="account-link" @mouseenter="showAccountMenu = true" @mouseleave="showAccountMenu = false">
            <font-awesome-icon icon="fa-solid fa-user" class="text-lg mb-1" />
            <span>{{ isAuthenticated ? userName : 'Giriş Yap' }}</span>
            
            <div class="account-dropdown" v-if="showAccountMenu">
              <template v-if="isAuthenticated">
                <div class="dropdown-welcome">
                  <NuxtLink to="/account" class="user-name">{{ userName }}</NuxtLink>
                  <div class="user-email">{{ user?.email }}</div>
                </div>
                <div class="dropdown-divider"></div>
                <ul class="dropdown-menu">
                  <li>
                    <NuxtLink to="/account/orders" class="dropdown-link">
                      <font-awesome-icon icon="fa-solid fa-box" />
                      <span>Siparişlerim</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/messages" class="dropdown-link">
                      <font-awesome-icon icon="fa-solid fa-envelope" />
                      <span>Mesaj Merkezi</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/payment" class="dropdown-link">
                      <font-awesome-icon icon="fa-solid fa-wallet" />
                      <span>Ödeme</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/wishlist" class="dropdown-link">
                      <font-awesome-icon icon="fa-solid fa-heart" />
                      <span>İstek Listesi</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/account/coupons" class="dropdown-link">
                      <font-awesome-icon icon="fa-solid fa-ticket" />
                      <span>Kuponlarım</span>
                    </NuxtLink>
                  </li>
                </ul>
                <div class="dropdown-divider"></div>
                <ul class="dropdown-menu secondary">
                  <li>
                    <NuxtLink to="/account/settings" class="dropdown-link">
                      <font-awesome-icon icon="fa-solid fa-cog" />
                      <span>Ayarlar</span>
                    </NuxtLink>
                  </li>
                  <li>
                    <NuxtLink to="/help" class="dropdown-link">
                      <font-awesome-icon icon="fa-solid fa-question-circle" />
                      <span>Yardım Merkezi</span>
                    </NuxtLink>
                  </li>
                  <li @click="handleLogout" class="dropdown-link">
                    <font-awesome-icon icon="fa-solid fa-sign-out-alt" />
                    <span>Çıkış Yap</span>
                  </li>
                </ul>
              </template>
              <template v-else>
                <div class="dropdown-welcome">Hoşgeldiniz</div>
                <div class="dropdown-header">
                  <button class="auth-button" @click="openAuthModal(true)">Giriş Yap</button>
                  <button class="auth-button signup" @click="openAuthModal(false)">Kayıt Ol</button>
                </div>
              </template>
            </div>
          </div>
          <NuxtLink to="/cart" class="cart-link">
            <font-awesome-icon icon="shopping-cart" class="text-lg mb-1" />
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
            <span>Sepet</span>
          </NuxtLink>
        </div>
      </div>
      
      <div class="navbar-bottom">
        <ul class="menu">
          <li class="categories-dropdown" @mouseenter="showCategories = true" @mouseleave="showCategories = false">
            <a href="#" class="menu-link">
              <font-awesome-icon icon="fa-solid fa-bars" /> Tüm Kategoriler <font-awesome-icon icon="fa-solid fa-chevron-down" />
            </a>
            
            <!-- Kategoriler Dropdown -->
            <div class="categories-menu" v-show="showCategories">
              <div class="categories-layout">
                <div class="main-categories">
                  <div 
                    v-for="category in categories" 
                    :key="category.name"
                    class="category-item"
                    @mouseenter="selectedCategory = category"
                  >
                    <font-awesome-icon :icon="category.icon" />
                    <span>{{ category.name }}</span>
                    <font-awesome-icon icon="fa-solid fa-chevron-right" />
                  </div>
                </div>
                
                <div class="subcategories" v-if="selectedCategory">
                  <div class="subcategories-grid">
                    <div v-for="(items, title) in selectedCategory.subcategories" :key="title" class="subcategory-column">
                      <h3>{{ title }}</h3>
                      <ul>
                        <li v-for="item in items" :key="item">{{ item }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="#" class="menu-link red-link">
              <font-awesome-icon icon="fa-solid fa-fire" /> Süper Fırsatlar
            </a>
          </li>
          <li><a href="#" class="menu-link">Plus</a></li>
          <li><a href="#" class="menu-link">Yeni</a></li>
          <li><a href="#" class="menu-link">AliExpress Business</a></li>
          <li><a href="#" class="menu-link">Ev ve bahçe</a></li>
          <li><a href="#" class="menu-link">Saç ekleme ve peruk</a></li>
          <li><a href="#" class="menu-link">Erkek giyim</a></li>
          <li><a href="#" class="menu-link">Aksesuarlar</a></li>
          <li><a href="#" class="menu-link">Tüketici elektroniği</a></li>
          <li class="more-dropdown" @mouseenter="showMoreMenu = true" @mouseleave="showMoreMenu = false">
            <a href="#" class="menu-link">
              Daha fazla <font-awesome-icon icon="fa-solid fa-chevron-down" />
            </a>
            
            <!-- Daha Fazla Dropdown -->
            <div class="more-menu" v-show="showMoreMenu">
              <ul class="more-menu-list">
                <li>
                  <a href="#">
                    <font-awesome-icon icon="fa-solid fa-lightbulb" /> Ev geliştirme ve aydınlatma
                  </a>
                </li>
                <li>
                  <a href="#">
                    <font-awesome-icon icon="fa-solid fa-home" /> Ev aletleri
                  </a>
                </li>
                <li>
                  <a href="#">
                    <font-awesome-icon icon="fa-solid fa-car" /> Otomotiv ve motosiklet
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <AuthModal 
    v-if="showAuthModal" 
    :isLogin="isLoginMode"
    @close="showAuthModal = false" 
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useState } from '#app'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

const { user, isAuthenticated, signOut } = useAuth()

// Cart state
const cartItems = useState<CartItem[]>('cart-items', () => [])
const cartItemCount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const showAuthModal = ref(false)
const searchQuery = ref('')
const showAccountMenu = ref(false)
const showCategories = ref(false)
const selectedCategory = ref<Category | undefined>(undefined)
const lastScrollPosition = ref(0)
const isNavbarVisible = ref(true)
const showMoreMenu = ref(false)
const isLoginMode = ref(true)

interface Subcategories {
  'Üst Giyim'?: string[];
  'Alt Giyim'?: string[];
  'Dış Giyim'?: string[];
  'Telefon'?: string[];
  'Bilgisayar'?: string[];
  'Ev Elektroniği'?: string[];
  'Mobilya'?: string[];
  'Dekorasyon'?: string[];
  'Ev Tekstili'?: string[];
  [key: string]: string[] | undefined;
}

interface Category {
  name: string;
  icon: string;
  subcategories: Subcategories;
}

const categories = [
  {
    name: 'Kadın Giyim',
    icon: 'fa-solid fa-tshirt',
    subcategories: {
      'Üst Giyim': ['T-shirt', 'Bluz', 'Gömlek', 'Kazak', 'Hırka'],
      'Alt Giyim': ['Pantolon', 'Etek', 'Şort', 'Tayt'],
      'Dış Giyim': ['Mont', 'Ceket', 'Trençkot', 'Kaban']
    }
  },
  {
    name: 'Erkek Giyim',
    icon: 'fa-solid fa-person',
    subcategories: {
      'Üst Giyim': ['T-shirt', 'Gömlek', 'Kazak', 'Sweatshirt'],
      'Alt Giyim': ['Pantolon', 'Şort', 'Eşofman'],
      'Dış Giyim': ['Mont', 'Ceket', 'Kaban']
    }
  },
  {
    name: 'Elektronik',
    icon: 'fa-solid fa-mobile-screen',
    subcategories: {
      'Telefon': ['Akıllı Telefon', 'Telefon Kılıfı', 'Ekran Koruyucu'],
      'Bilgisayar': ['Laptop', 'Tablet', 'Aksesuar'],
      'Ev Elektroniği': ['TV', 'Ses Sistemi', 'Küçük Ev Aletleri']
    }
  },
  {
    name: 'Ev & Yaşam',
    icon: 'fa-solid fa-house',
    subcategories: {
      'Mobilya': ['Oturma Odası', 'Yatak Odası', 'Mutfak'],
      'Dekorasyon': ['Aydınlatma', 'Halı', 'Perde'],
      'Ev Tekstili': ['Nevresim', 'Havlu', 'Battaniye']
    }
  }
]

const userName = computed(() => {
  return user.value?.displayName || user.value?.email?.split('@')[0] || 'Kullanıcı'
})

const handleScroll = () => {
  const currentScrollPosition = window.scrollY
  isNavbarVisible.value = lastScrollPosition.value > currentScrollPosition || currentScrollPosition < 100
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Implement search functionality
    console.log('Searching for:', searchQuery.value)
  }
}

const handleLogout = async () => {
  if (isAuthenticated.value) {
    await signOut()
    showAccountMenu.value = false
  }
}

const openAuthModal = (isLogin: boolean) => {
  isLoginMode.value = isLogin
  showAuthModal.value = true
  showAccountMenu.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: auto;
  min-height: 140px;
  background-color: white;
  z-index: 100;
  border-bottom: 1px solid #e8e8e8;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  transform: translateY(0);
}

.navbar.hidden {
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}

.navbar-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
}

.logo {
  height: 80px;
  width: auto;
  object-fit: contain;
  margin-right: 30px;
}

.navbar-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.navbar-bottom {
  display: flex;
  justify-content: center;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  max-width: calc(100% - 200px);
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
  margin: 0 20px;
}

.search-bar {
  padding: 8px 40px 8px 15px;
  font-size: 13px;
  border: 2px solid #FF4747;
  border-radius: 20px;
  width: 100%;
  transition: all 0.3s ease;
  height: 38px;
}

.search-bar:focus {
  outline: none;
  border-color: #000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.search-button {
  position: absolute;
  right: 5px;
  padding: 6px;
  background-color: #FF4747;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
}

.search-button:hover {
  background-color: #ff3333;
}

.search-button svg {
  width: 14px;
  height: 14px;
  color: #333;
}

.menu {
  display: flex;
  list-style: none;
  gap: 20px;
  padding: 0;
  margin: 0;
  align-items: center;
}

.menu-link {
  text-decoration: none;
  color: #333;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.3s ease;
}

.menu-link:hover {
  color: #FF4747;
}

.red-link {
  color: #FF4747;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 25px;
  min-width: 250px;
}

.language-selector, .account-link, .cart-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: #333;
  font-size: 13px;
  transition: all 0.3s ease;
  background-color: transparent;
  padding: 8px 15px;
  border: none;
  border-radius: 20px;
  text-decoration: none;
}

.language-selector:hover, .account-link:hover, .cart-link:hover {
  background-color: #f5f5f5;
}

.language-selector i, .account-link i, .cart-link i {
  color: #333;
  font-size: 18px;
}

.account-link {
  position: relative;
}

.account-dropdown {
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 240px;
  padding: 15px;
  z-index: 1000;
}

.dropdown-welcome {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 15px;
  padding: 0 5px;
}

.user-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-decoration: none;
  display: block;
  margin-bottom: 4px;
}

.user-email {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
  color: #FF4747;
}

.dropdown-menu li svg {
  width: 16px;
  color: #666;
}

.dropdown-menu li:hover svg {
  color: #FF4747;
}

.dropdown-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.dropdown-menu.secondary li {
  color: #666;
}

.dropdown-menu.secondary li:hover {
  color: #FF4747;
}

.cart-link {
  position: relative;
}

.cart-badge {
  position: absolute;
  top: 0;
  right: 5px;
  background: #FF4747;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.categories-dropdown {
  position: relative;
}

.categories-dropdown a {
  display: flex;
  align-items: center;
  gap: 5px;
}

.categories-menu {
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 800px;
  padding: 0;
  z-index: 1000;
}

.categories-layout {
  display: flex;
  height: 400px;
}

.main-categories {
  width: 240px;
  border-right: 1px solid #eee;
  overflow-y: auto;
}

.subcategories {
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
}

.subcategories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.subcategory-column h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.subcategory-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.subcategory-column li {
  font-size: 13px;
  color: #666;
  padding: 5px 0;
  cursor: pointer;
}

.subcategory-column li:hover {
  color: #FF4747;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  font-size: 14px;
}

.category-item:hover {
  background-color: #f5f5f5;
}

.category-item i:last-child {
  margin-left: auto;
  font-size: 12px;
  color: #666;
}

.more-dropdown {
  position: relative;
}

.more-menu {
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 250px;
  padding: 10px 0;
  z-index: 1000;
}

.more-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.more-menu-list li a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.more-menu-list li a:hover {
  background-color: #f5f5f5;
  color: #FF4747;
}

.more-menu-list i {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 30px;
}

.dropdown-header {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.auth-button {
  flex: 1;
  padding: 8px;
  border: 1px solid #FF4747;
  border-radius: 20px;
  background: white;
  color: #FF4747;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.auth-button.signup {
  background: #FF4747;
  color: white;
}

.auth-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(255, 71, 71, 0.2);
}

.auth-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.dropdown-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 15px 0;
}

@media (max-width: 768px) {
  .navbar {
    padding: 15px 20px;
  }

  .navbar-container {
    padding: 0 10px;
  }

  .navbar-left {
    flex-wrap: wrap;
    gap: 10px;
    max-width: 100%;
  }

  .search-container {
    width: 100%;
    margin: 10px 0;
    order: 3;
  }

  .logo {
    width: 180px;
    min-width: 180px;
    height: 80px;
  }

  .navbar-right {
    min-width: unset;
    gap: 15px;
  }

  .language-selector span, 
  .account-link span, 
  .cart-link span {
    display: none;
  }

  .cart-link {
    padding: 8px;
  }

  .language-selector, .account-link, .cart-link {
    padding: 8px;
  }

  .account-dropdown {
    width: 200px;
    right: -70px;
  }

  .categories-menu {
    width: 240px;
  }

  .menu {
    gap: 15px;
    overflow-x: auto;
    padding-bottom: 5px;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .menu::-webkit-scrollbar {
    display: none;
  }

  .more-menu {
    right: -50px;
    width: 200px;
  }
}

@media (max-width: 480px) {
  .navbar-top {
    margin-bottom: 10px;
  }

  .menu {
    gap: 15px;
    font-size: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>