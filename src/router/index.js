import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import { useUserStore } from '../stores/user.js'

// Navigation Guard
const requireAuth = async(to, from, next) => {
    const userStore = useUserStore();
    const user = await userStore.currentUser()
    if (user) {
      next('/home')
    } else {
      next()
    }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',  
      name: 'Login', 
      component: Login,
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
    },
  ],
})

export default router
