import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import { useUserStore } from '../stores/user.js'

// Navigation Guard - Para rutas protegidas
const requireAuth = async(to, from, next) => {
    const userStore = useUserStore();
    const user = await userStore.currentUser()
    if (user) {
      next()
    } else {
      next('/')  // Redirige al login si no está autenticado
    }
}

// Navigation Guard - Para la ruta de login
const redirectIfAuth = async(to, from, next) => {
    const userStore = useUserStore();
    const user = await userStore.currentUser()
    if (user) {
      next('/home')  // Si está autenticado, va a home
    } else {
      next()  // Si no está autenticado, permite acceder al login
    }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',  
      name: 'Login', 
      component: Login,
      beforeEnter: redirectIfAuth  // ✅ CORRECTO: Redirige a home si está autenticado
    },
    {
      path: '/editar/:id?',
      name: 'editar',
      component: () => import('../components/Editar.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue'),
      beforeEnter: requireAuth
    },
    {
      path: '/productForm',
      name: 'productForm',
      component: () => import('../components/ProductForm.vue'),
    
    }
  ],
})

export default router