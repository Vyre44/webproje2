import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, type Auth, onAuthStateChanged, type User } from 'firebase/auth'
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

// Shared refs
const isAuthenticated = ref(false)
const user = ref<User | null>(null)

// Initialize Firebase and Auth
let app: FirebaseApp
let auth: Auth
let googleProvider: GoogleAuthProvider
let facebookProvider: FacebookAuthProvider
let twitterProvider: TwitterAuthProvider

// Initialize on client side
if (process.client) {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  
  auth = getAuth(app)
  googleProvider = new GoogleAuthProvider()
  facebookProvider = new FacebookAuthProvider()
  twitterProvider = new TwitterAuthProvider()

  // Set up auth state observer
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    isAuthenticated.value = !!currentUser
  })
}

export const useFirebase = () => {
  return {
    auth,
    googleProvider,
    facebookProvider,
    twitterProvider,
    isAuthenticated,
    user
  }
}

export { auth, isAuthenticated, user }