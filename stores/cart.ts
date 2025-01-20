export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  seller?: string
  options?: Record<string, any>
} 