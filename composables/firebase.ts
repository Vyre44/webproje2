import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, type Auth, onAuthStateChanged, type User } from 'firebase/auth'
import { type Firestore } from 'firebase/firestore'
import { ref } from 'vue'
import { initializeApp, type FirebaseApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA9AzWy5NLsrkQpEw2ENGJCdcJq5Tu8IUc",
  authDomain: "aliexpressclone-e483c.firebaseapp.com",
  projectId: "aliexpressclone-e483c",
  storageBucket: "aliexpressclone-e483c.appspot.com",
  messagingSenderId: "1031807808817",
  appId: "1:1031807808817:web:d9e8f9c0e3c7c0b4b7b9a0"
}

// Add error message for API key error
const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/api-key-not-valid':
      return 'API anahtarı geçersiz. Lütfen Firebase yapılandırmasını kontrol edin.'
    default:
      return 'Firebase başlatma hatası'
  }
}

// Singleton instances
let app: FirebaseApp | null = null
const auth = getAuth()
export { auth }

// Shared refs
const isAuthenticated = ref(false)
const user = ref<User | null>(null)

// Initialize Firebase only on client side
export const useFirebase = () => {
  // Only initialize Firebase if we're on the client side and it hasn't been initialized
  if (process.client && !app) {
    try {
      if (getApps().length === 0) {
        console.log('Initializing Firebase with config:', { ...firebaseConfig, apiKey: '***' })
        app = initializeApp(firebaseConfig)
      } else {
        console.log('Using existing Firebase app')
        app = getApps()[0]
      }

      // Check auth state initially
      if (auth) {
        onAuthStateChanged(auth, (currentUser) => {
          user.value = currentUser
          isAuthenticated.value = !!currentUser
          console.log('Auth state changed:', currentUser ? 'User logged in' : 'User logged out')
        })
      }
    } catch (error: any) {
      console.error('Firebase initialization error:', error)
      if (error.code) {
        console.error('Error code:', error.code)
        console.error('Error message:', getErrorMessage(error.code))
      }
    }
  }

  // Auth providers - only create if we have auth
  const googleProvider = auth ? new GoogleAuthProvider() : null
  const facebookProvider = auth ? new FacebookAuthProvider() : null
  const twitterProvider = auth ? new TwitterAuthProvider() : null

  return {
    app,
    auth,
    googleProvider,
    facebookProvider,
    twitterProvider,
    isAuthenticated,
    user
  }
}