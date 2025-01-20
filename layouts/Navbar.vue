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
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div class="navbar-right">
          <div class="language-selector">
            <i class="fas fa-globe"></i>
            <span><i class="fas fa-flag-usa"></i> TR</span>
          </div>
          <div class="account-link" @mouseenter="showAccountMenu = true" @mouseleave="showAccountMenu = false">
            <i class="fas fa-user"></i>
            <span>{{ isAuthenticated ? userName : 'Giriş Yap' }}</span>
            
            <div class="account-dropdown" v-show="showAccountMenu">
              <template v-if="isAuthenticated">
                <div class="dropdown-welcome">
                  <NuxtLink to="/account" class="user-name">{{ userName }}</NuxtLink>
                  <div class="user-email">{{ user?.email }}</div>
                </div>
                <div class="dropdown-divider"></div>
                <ul class="dropdown-menu">
                  <li><NuxtLink to="/orders" class="dropdown-link"><i class="fas fa-box"></i> Siparişlerim</NuxtLink></li>
                  <li><i class="fas fa-envelope"></i> Mesaj Merkezi</li>
                  <li><i class="fas fa-wallet"></i> Ödeme</li>
                  <li><i class="fas fa-heart"></i> İstek Listesi</li>
                  <li><i class="fas fa-ticket-alt"></i> Kuponlarım</li>
                </ul>
                <div class="dropdown-divider"></div>
                <ul class="dropdown-menu secondary">
                  <li><i class="fas fa-cog"></i> Ayarlar</li>
                  <li><i class="fas fa-question-circle"></i> Yardım Merkezi</li>
                  <li @click="handleSignOut"><i class="fas fa-sign-out-alt"></i> Çıkış Yap</li>
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
            <i class="fas fa-shopping-cart"></i>
            <span><i class="fas fa-shopping-basket"></i> Sepet</span>
          </NuxtLink>
        </div>
      </div>
      
      <div class="navbar-bottom">
        <ul class="menu">
          <li class="categories-dropdown" @mouseenter="showCategories = true" @mouseleave="showCategories = false">
            <a href="#" class="menu-link">
              <i class="fas fa-bars"></i> Tüm Kategoriler <i class="fas fa-chevron-down"></i>
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
                    <i :class="category.icon"></i>
                    <span>{{ category.name }}</span>
                    <i class="fas fa-chevron-right"></i>
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
          <li><a href="#" class="menu-link red-link"><i class="fas fa-fire"></i> Süper Fırsatlar</a></li>
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
              Daha fazla <i class="fas fa-chevron-down"></i>
            </a>
            
            <!-- Daha Fazla Dropdown -->
            <div class="more-menu" v-show="showMoreMenu">
              <ul class="more-menu-list">
                <li><a href="#"><i class="fas fa-lightbulb"></i> Ev geliştirme ve aydınlatma</a></li>
                <li><a href="#"><i class="fas fa-home"></i> Ev aletleri</a></li>
                <li><a href="#"><i class="fas fa-car"></i> Otomotiv ve motosiklet</a></li>
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
import { useFirebase } from '@/composables/firebase'
import { signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { navigateTo } from 'nuxt/app'

const { auth, isAuthenticated } = useFirebase()
const user = ref<User | null>(null)

const searchQuery = ref('')
const showAccountMenu = ref(false)
const showCategories = ref(false)
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
const selectedCategory = ref<Category | undefined>(undefined)
const lastScrollPosition = ref(0)
const isNavbarVisible = ref(true)
const showMoreMenu = ref(false)
const showAuthModal = ref(false)

const categories = [
  {
    name: 'Kadın Giyim',
    icon: 'fas fa-tshirt',
    subcategories: {
      'Üst Giyim': ['T-shirt', 'Bluz', 'Gömlek', 'Kazak', 'Hırka'],
      'Alt Giyim': ['Pantolon', 'Etek', 'Şort', 'Tayt'],
      'Dış Giyim': ['Mont', 'Ceket', 'Trençkot', 'Kaban']
    }
  },
  {
    name: 'Erkek Giyim',
    icon: 'fas fa-male',
    subcategories: {
      'Üst Giyim': ['T-shirt', 'Gömlek', 'Kazak', 'Sweatshirt'],
      'Alt Giyim': ['Pantolon', 'Şort', 'Eşofman'],
      'Dış Giyim': ['Mont', 'Ceket', 'Kaban']
    }
  },
  {
    name: 'Elektronik',
    icon: 'fas fa-mobile-alt',
    subcategories: {
      'Telefon': ['Akıllı Telefon', 'Telefon Kılıfı', 'Ekran Koruyucu'],
      'Bilgisayar': ['Laptop', 'Tablet', 'Aksesuar'],
      'Ev Elektroniği': ['TV', 'Ses Sistemi', 'Küçük Ev Aletleri']
    }
  },
  {
    name: 'Ev & Yaşam',
    icon: 'fas fa-home',
    subcategories: {
      'Mobilya': ['Oturma Odası', 'Yatak Odası', 'Mutfak'],
      'Dekorasyon': ['Aydınlatma', 'Halı', 'Perde'],
      'Ev Tekstili': ['Nevresim', 'Havlu', 'Battaniye']
    }
  }
]

const userName = computed(() => {
  if (user.value?.displayName) {
    return user.value.displayName
  }
  return user.value?.email?.split('@')[0] || 'Kullanıcı'
})

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset
  if (currentScrollPosition < 0) {
    return
  }
  
  isNavbarVisible.value = 
    (currentScrollPosition < lastScrollPosition.value && currentScrollPosition > 100) || 
    currentScrollPosition < 100
  
  lastScrollPosition.value = currentScrollPosition
}

const handleSignOut = async () => {
  try {
    if (auth) {
      await signOut(auth)
      showAccountMenu.value = false
      user.value = null
      isAuthenticated.value = false
    }
  } catch (error) {
    console.error('Çıkış yapılırken hata oluştu:', error)
  }
}
const isLoginMode = ref(true)
const openAuthModal = (isLogin: boolean) => {
  isLoginMode.value = isLogin
  showAuthModal.value = true
  showAccountMenu.value = false
}

onMounted(() => {
  const unsubscribe = auth?.onAuthStateChanged((currentUser) => {
    user.value = currentUser
    isAuthenticated.value = !!currentUser
  })

  window.addEventListener('scroll', handleScroll)

  return () => {
    window.removeEventListener('scroll', handleScroll)
    unsubscribe && unsubscribe()
  }
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: white;
  z-index: 9999;
  border-bottom: 1px solid #e8e8e8;
  transition: transform 0.3s ease;
  padding-top: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar.hidden {
  transform: translateY(-100%);
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
}

.search-bar:focus {
  outline: none;
  border-color: #000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.search-button {
  position: absolute;
  right: 5px;
  padding: 8px 12px;
  background-color: #FF4747;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.search-button i {
  color: white;
  font-size: 16px;
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
  font-size: 16px;
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
}

.dropdown-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 15px 0;
}

.dropdown-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  font-size: 14px;
}

.dropdown-menu li i {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 50%;
  color: #FF4747;
}

.dropdown-menu.secondary li i {
  color: #666;
  background: #f0f0f0;
}

.dropdown-menu li:hover {
  background: #f8f8f8;
}

.dropdown-menu li:hover i {
  background: #FF4747;
  color: white;
}

.dropdown-menu.secondary li:hover i {
  background: #666;
  color: white;
}

.dropdown-menu i {
  font-size: 16px;
  width: 20px;
  color: inherit;
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

.user-name {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.user-name:hover {
  color: #FF4747;
}

.user-email {
  font-size: 13px;
  color: #666;
  margin-top: 4px;
}

.dropdown-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.dropdown-menu li:hover .dropdown-link {
  color: inherit;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 30px;
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