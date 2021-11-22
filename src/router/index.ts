import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import MetaData from '../types/MetaData'
import store from '../store/'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      layout: 'main',
      title: 'Главная',
      requiresAuth: true,
    } as MetaData,
    component: Home
  },
  {
    path: '/view/:id',
    name: 'Order',
    props: true,
    meta: {
      layout: 'main',
      title: 'Обзор заказа',
      requiresAuth: true,
    },
    component: () => import('../views/Order.vue')
  },
  {
    path: '/auth',
    name: 'login',
    meta: {
      layout: 'auth',
      title: 'Авторизация',
    } as MetaData,
    component: Login,
  },
  {
    path: '/new',
    name: 'newOrder',
    meta: {
      layout: 'main',
      title: 'Новый заказ',
      requiresAuth: true
    },
    component: () => import('../views/NewOrder.vue')
  },
  {
    path: '/reference',
    name: 'Reference',
    meta: {
      layout: 'main',
      title: 'Справочники',
      requiresAuth: true,
    },
    component: () => import('../views/Reference.vue')
  },
  {
    path: '/reference/door',
    name: 'Door',
    meta: {
      layout: 'main',
      title: 'Справочники дверей',
      requiresAuth: true,
    },
    component: () => import('../views/Door/Door.vue')
  },
  {
    path: '/reference/door/new',
    name: 'doorNew',
    meta: {
      layout: 'main',
      title: 'Добавление двери',
      requiresAuth: true,
    },
    component: () => import('../views/Door/DoorNew.vue')
  },
  {
    path: '/reference/door/edit/:id',
    name: 'doorEdit',
    props: true,
    meta: {
      layout: 'main',
      title: 'Редактирование двери',
      requiresAuth: true,
    },
    component: () => import('../views/Door/DoorEdit.vue')
  },
  {
    path: '/reference/additionally',
    name: 'Additionally',
    meta: {
      layout: 'main',
      title: 'Справочники дополнительных услуг',
      requiresAuth: true,
    },
    component: () => import('../views/Additionally/Additionally.vue')
  },
  {
    path: '/reference/additionally/new',
    name: 'additionallyNew',
    meta: {
      layout: 'main',
      title: 'Добавление дополнительных услуг',
      requiresAuth: true,
    },
    component: () => import('../views/Additionally/AdditionallyNew.vue')
  },
  {
    path: '/reference/additionally/edit/:id',
    name: 'AdditionallyEdit',
    meta: {
      layout: 'main',
      title: 'Редактирование дополнительных услуг',
      requiresAuth: true,
    },
    component: () => import('../views/Additionally/AdditionallyEdit.vue')
  },
  {
    path: '*',
    name: 'notFound',
    meta: {
      requiresAuth: true,
      title: 'Ошибка 404',
      layout: 'main',
    },
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  const title = to.meta;
  document.title = `${title ? title : ""}`;

  if(to.meta) {
    const requireAuth = to.meta.requiresAuth
    if (requireAuth && !store.getters.isAuthenticated) {
      next('/auth?message=auth');
    } else if (requireAuth && store.getters.isAuthenticated) {
      next()
    } else {
      next();
    }
  }
 
})

export default router
