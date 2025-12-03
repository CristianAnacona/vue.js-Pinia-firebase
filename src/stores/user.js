import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../firebasdeConfig'
import router from '@/router/index.js'

export const useUserStore = defineStore('user', () => {
  const userData = ref(null)
  const loadingUser = ref(false);
// Register User
  const registerUser = async () => {
  loadingUser.value = true;  
  try {
      const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value)
      userData.value = {
        uid: user.uid,
        email: user.email
    } 
      router.push('/home')
    } catch (error) {
      console.log(error)
    }finally {
      loadingUser.value = false;
    }
  }
// Login User
const loginUser = async (email, password) => {
    loadingUser.value = true;
    let errorMessage = ''; 
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Éxito:
        userData.value = {
            uid: user.uid,
            email: user.email
        };
        router.push('/home');
      } catch (error) {
        // 1. Manejo del Error de Firebase: 
         switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
                errorMessage = 'Credenciales no válidas. El email o la contraseña son incorrectos.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'El formato del correo electrónico es inválido.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Bloqueo temporal por demasiados intentos fallidos.';
                break;
            default:
                errorMessage = 'Ocurrió un error desconocido durante el inicio de sesión.';
                break;
        }
        return errorMessage; 
    } finally {
        loadingUser.value = false;
    }
};
//Logout User
  const logoutUser = async() => {
    try {
      await signOut(auth)
      userData.value = null
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

// Update Current User
const currentUser = () => { 
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          userData.value = {
            uid: user.uid,
            email: user.email
          }
        } else {
          userData.value = null
        }
        
        resolve(user)
        unsubscribe() 
      }, 
      (error) => {
        reject(error)
        unsubscribe()
      }
    ); 
  });
}
  return { userData, registerUser, loginUser, logoutUser, loadingUser, currentUser } 
})

