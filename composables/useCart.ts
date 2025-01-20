import { ref } from 'vue'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
}

export const useCart = () => {
  const cart = ref<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    const existingItem = cart.value.find(cartItem => cartItem.id === item.id)
    
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      cart.value.push(item)
    }
  }

  const removeFromCart = (itemId: string) => {
    cart.value = cart.value.filter(item => item.id !== itemId)
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    const item = cart.value.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
    }
  }

  const clearCart = () => {
    cart.value = []
  }

  const getCartTotal = () => {
    return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartItemCount = () => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  }
} 