import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Komentar from '../views/Komentar.vue';
import Kontakt from '../views/Kontakt.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      needsUser: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue')
  },
  {
    path: '/komentar',
    name: 'komentar',
    component: Komentar
  },
  {
    path: '/kontakt',
    name: 'kontakt',
    component: Kontakt
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach ((to, from, next) => {
  const currentUser = store.currentUser;
  if (to.meta.requiresAuth && !currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router
