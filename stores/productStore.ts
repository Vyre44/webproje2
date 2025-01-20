import { defineStore } from 'pinia';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  sales: number;
  stock: number;
  freeShipping: boolean;
  seller: string;
  images: string[];
  description: string;
  specifications: Record<string, string>;
}

export const useProductStore = defineStore({
  id: 'product', // Store kimliği
  state: () => ({
    products: [] as Product[], // Ürün listesi
    currentProduct: null as Product | null, // Şu anki ürün
    loading: false, // Yüklenme durumu
    error: null as string | null, // Hata mesajı
  }),

  actions: {
    // Ürün detaylarını getir
    async fetchProduct(id: string) {
      this.loading = true; // Yüklenme durumu başlatıldı
      this.error = null; // Önceki hataları temizle
      try {
        // Simüle edilmiş ürün verisi
        const product = {
          id,
          name: 'Mini TV el tipi rekreasyon Video oyunu konsol AV çıkışı Retro dahili 620 klasik oyunlar',
          price: 365.51,
          originalPrice: 1029.38,
          rating: 4.4,
          sales: 168,
          stock: 999,
          freeShipping: true,
          seller: '3C Digital Club Store',
          images: [
            '/products/game-console-1.jpg',
            '/products/game-console-2.jpg',
            '/products/game-console-3.jpg',
            '/products/game-console-4.jpg',
          ],
          description: 'Mini TV el tipi rekreasyon Video oyunu konsol...',
          specifications: {
            Model: 'Mini TV Game Console',
            'Oyun Sayısı': '620+',
            Bağlantı: 'AV Çıkışı',
            Kontrol: '2x Gamepad',
          },
        };

        this.currentProduct = product; // Ürünü state'e ata
      } catch (err) {
        this.error = 'Ürün yüklenirken bir hata oluştu'; // Hata durumunda mesaj ata
        console.error('Error fetching product:', err);
      } finally {
        this.loading = false; // Yüklenme durumu sona erdi
      }
    },
  },
});
