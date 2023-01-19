import { createRouter, createWebHistory } from 'vue-router'

import { useAccountStore } from '@/stores/account';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/AuthLoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/AuthRegisterView.vue')
    }
  ]
})

export default router

router.beforeEach(async (to) => {
  const { user, accessToken, refreshToken } = useAccountStore();
  const userIsLoggedin = user && accessToken && refreshToken;

  if (!userIsLoggedin && to.name !== 'Login' && to.name !== 'Register') {
    return { name: 'Login' }
  }
})
