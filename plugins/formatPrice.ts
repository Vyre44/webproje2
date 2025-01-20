export default defineNuxtPlugin((nuxtApp) => {
  const formatPrice = (price: number): string => {
    if (typeof price !== 'number') return '0.00'
    return price.toLocaleString('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  nuxtApp.provide('formatPrice', formatPrice)
}) 