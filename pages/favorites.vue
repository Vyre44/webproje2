<template>
  <div class="favorites-page">
    <h1 class="page-title">Favorilerim</h1>
    <div class="favorites-grid">
      <!-- Favori ürünler buraya gelecek -->
      <p v-if="!favorites.length" class="empty-message">
        Henüz favori ürününüz bulunmuyor.
      </p>
    </div>
  </div>
</template>

<script setup>
const favorites = ref([])
</script>

<style scoped>
.favorites-page {
  padding: 20px;
  margin-top: 60px;
}

.page-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.empty-message {
  text-align: center;
  color: #666;
  grid-column: 1 / -1;
  padding: 40px;
}
</style> 