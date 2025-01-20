import { ref } from 'vue'
import { useFirebase } from './firebase'
import type { User as FirebaseUser } from 'firebase/auth'
import { signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth'

interface User {
  displayName: string | null
  email: string | null
  uid: string
}

// Create shared state
const isAuthenticated = ref(false)
const user = ref<User | null>(null)

export const useAuth = () => {
  const { auth } = useFirebase()

  // Update user state from Firebase user
  const updateUserState = (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      user.value = {
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        uid: firebaseUser.uid
      }
      isAuthenticated.value = true
      console.log('User authenticated:', user.value)
    } else {
      user.value = null
      isAuthenticated.value = false
      console.log('User signed out')
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      if (auth) {
        await firebaseSignOut(auth)
        updateUserState(null)
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  // Initialize auth state if auth is available
  if (auth) {
    onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      console.log('Auth state changed:', firebaseUser)
      updateUserState(firebaseUser)
    })
  }

  return {
    isAuthenticated,
    user,
    signOut,
    updateUserState
  }
} 