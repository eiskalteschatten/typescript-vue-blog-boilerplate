import { createRouter, createWebHistory } from 'vue-router';

import { useAccountStore } from '@/stores/account';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/AuthLoginView.vue'),
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/AuthRegisterView.vue'),
      meta: {
        title: 'Register',
      },
    },
  ],
});

export default router;

router.beforeEach((to) => {
  const { user, accessToken, refreshToken } = useAccountStore();
  const userIsLoggedin = user && accessToken && refreshToken;

  if (!userIsLoggedin && to.name !== 'Login' && to.name !== 'Register') {
    return { name: 'Login' };
  }
  else if (userIsLoggedin && (to.name === 'Login' || to.name === 'Register')) {
    return { name: 'Home' };
  }
});

router.afterEach((to) => {
  const defaultTitle = 'Typescript Fastify Vue.js Boilerplate';
  document.title = to.meta.title ? `${to.meta.title} | ${defaultTitle}` : defaultTitle;
});
