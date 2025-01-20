<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>{{ mode ? 'Giriş Yap' : 'Kayıt Ol' }}</h2>
        <button class="close-button" @click="$emit('close')">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form">
        <div v-if="error" class="error-message">
          <i class="fas fa-exclamation-circle"></i>
          {{ error }}
        </div>
        
        <div class="form-group">
          <label for="email">E-posta</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="ornek@email.com"
            required
            :disabled="loading"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Şifre</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="••••••••"
            required
            :disabled="loading"
          />
        </div>

        <div v-if="!mode" class="form-group">
          <label for="confirmPassword">Şifre Tekrar</label>
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            placeholder="••••••••"
            required
            :disabled="loading"
          />
        </div>
        
        <button 
          type="submit" 
          class="submit-button"
          :disabled="loading"
        >
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>{{ mode ? 'Giriş Yap' : 'Kayıt Ol' }}</span>
        </button>
        
        <div class="divider">
          <span>veya</span>
        </div>
        
        <div class="social-login">
          <button 
            type="button" 
            @click="handleSocialLogin('google')" 
            class="social-button google"
            :disabled="loading"
          >
            <i class="fab fa-google"></i>
            Google ile devam et
          </button>
          <button 
            type="button" 
            @click="handleSocialLogin('facebook')" 
            class="social-button facebook"
            :disabled="loading"
          >
            <i class="fab fa-facebook"></i>
            Facebook ile devam et
          </button>
        </div>
        
        <div class="toggle-mode">
          {{ mode ? 'Hesabınız yok mu?' : 'Zaten hesabınız var mı?' }}
          <button type="button" @click="mode = !mode" :disabled="loading">
            {{ mode ? 'Kayıt Ol' : 'Giriş Yap' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useFirebase } from '@/composables/firebase'
import { useAuth } from '@/composables/useAuth'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type AuthError
} from "firebase/auth"

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const { auth, googleProvider, facebookProvider } = useFirebase()
const { isAuthenticated, updateUserState } = useAuth()

const mode = ref(props.isLogin)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const loading = ref(false)

const validatePassword = () => {
  if (!mode.value && password.value.length < 6) {
    error.value = 'Şifre en az 6 karakter olmalıdır'
    return false
  }
  
  if (!mode.value && password.value !== confirmPassword.value) {
    error.value = 'Şifreler eşleşmiyor'
    return false
  }
  
  return true
}

const getErrorMessage = (errorCode: string): string => {
  const code = errorCode.replace('auth/', '')
  switch (code) {
    case 'user-not-found':
      return 'Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı'
    case 'wrong-password':
      return 'Hatalı şifre'
    case 'email-already-in-use':
      return 'Bu e-posta adresi zaten kullanımda'
    case 'invalid-email':
      return 'Geçersiz e-posta adresi'
    case 'weak-password':
      return 'Şifre çok zayıf. En az 6 karakter kullanın'
    case 'network-request-failed':
      return 'Bağlantı hatası. İnternet bağlantınızı kontrol edin'
    case 'popup-closed-by-user':
      return 'Sosyal medya girişi iptal edildi'
    case 'service-unavailable':
      return 'Kimlik doğrulama servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin'
    case 'provider-unavailable':
      return 'Seçilen giriş yöntemi şu anda kullanılamıyor'
    case 'operation-not-allowed':
      return 'Bu giriş yöntemi şu anda devre dışı'
    case 'too-many-requests':
      return 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin'
    case 'invalid-credential':
      return 'Geçersiz kimlik bilgileri. Lütfen bilgilerinizi kontrol edip tekrar deneyin'
    case 'account-exists-with-different-credential':
      return 'Bu e-posta adresi başka bir giriş yöntemi ile ilişkilendirilmiş'
    case 'credential-already-in-use':
      return 'Bu hesap başka bir kullanıcı tarafından kullanılıyor'
    default:
      return 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin'
  }
}

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    error.value = 'Lütfen tüm alanları doldurun'
    return
  }

  if (!validatePassword()) {
    return
  }

  loading.value = true
  error.value = ''

  try {
    if (!auth) {
      console.error('Auth is not initialized')
      throw new Error('auth/service-unavailable')
    }

    console.log('Attempting authentication...')
    if (mode.value) {
      // Login mode
      console.log('Login attempt with:', email.value)
      const result = await signInWithEmailAndPassword(auth, email.value, password.value)
      console.log('Login successful:', result.user)
      if (result.user) {
        updateUserState(result.user)
        emit('close')
      }
    } else {
      // Register mode
      console.log('Register attempt with:', email.value)
      const result = await createUserWithEmailAndPassword(auth, email.value, password.value)
      console.log('Registration successful:', result.user)
      if (result.user) {
        updateUserState(result.user)
        emit('close')
      }
    }
  } catch (err: any) {
    console.error('Auth error:', err)
    console.error('Error code:', err.code)
    console.error('Error message:', err.message)
    
    if (err.code) {
      error.value = getErrorMessage(err.code)
    } else if (err.message && err.message.includes('auth/')) {
      error.value = getErrorMessage(err.message)
    } else {
      error.value = 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    }
  } finally {
    loading.value = false
  }
}

const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  loading.value = true
  error.value = ''

  try {
    if (!auth) {
      console.error('Auth is not initialized')
      throw new Error('auth/service-unavailable')
    }

    const authProvider = provider === 'google' 
      ? googleProvider 
      : facebookProvider

    if (!authProvider) {
      console.error('Provider is not initialized:', provider)
      throw new Error('auth/provider-unavailable')
    }

    console.log('Attempting social login with:', provider)
    const result = await signInWithPopup(auth, authProvider)
    console.log('Social login successful:', result.user)
    
    if (result.user) {
      updateUserState(result.user)
      emit('close')
    }
  } catch (err: any) {
    console.error('Social login error:', err)
    console.error('Error code:', err.code)
    console.error('Error message:', err.message)
    
    if (err.code) {
      error.value = getErrorMessage(err.code)
    } else if (err.message && err.message.includes('auth/')) {
      error.value = getErrorMessage(err.message)
    } else {
      error.value = 'Sosyal medya girişi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: #f5f5f5;
  color: #333;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.error-message {
  background-color: #fff2f2;
  color: #ff4747;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.form-group input {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #FF4747;
  box-shadow: 0 0 0 3px rgba(255, 71, 71, 0.1);
}

.form-group input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background: #FF4747;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.submit-button:hover:not(:disabled) {
  background: #ff3333;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(255, 71, 71, 0.2);
}

.submit-button:disabled {
  background: #ffb3b3;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #ddd;
}

.divider span {
  padding: 0 10px;
  color: #666;
  font-size: 14px;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-button {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: white;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.social-button:hover:not(:disabled) {
  background: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.social-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.social-button i {
  font-size: 18px;
}

.social-button.google i {
  color: #4285f4;
}

.social-button.facebook i {
  color: #1877f2;
}

.toggle-mode {
  text-align: center;
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}

.toggle-mode button {
  background: none;
  border: none;
  color: #FF4747;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  transition: all 0.3s ease;
}

.toggle-mode button:hover:not(:disabled) {
  text-decoration: underline;
}

.toggle-mode button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>