import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface Category {
  id: number;
  name: string;
  image: string;
  productCount?: number;
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchCategories() {
    loading.value = true;
    error.value = null;

    try {
      // Örnek veri
      categories.value = [
        {
          id: 1,
          name: 'Elektronik',
          image: '/images/categories/electronics.jpg',
          productCount: 150,
        },
        {
          id: 2,
          name: 'Moda',
          image: '/images/categories/fashion.jpg',
          productCount: 300,
        },
      ];
    } catch (err) {
      error.value = 'Kategoriler yüklenirken bir hata oluştu';
      console.error('Error fetching categories:', err);
    } finally {
      loading.value = false;
    }
  }
  return {
    categories,
    loading,
    error,
    fetchCategories,
  };
});