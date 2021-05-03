import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/views/Goods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods',
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods,
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: () => import('@/views/Ratings'),
    },
    {
      path: '/seller',
      name: 'Seller',
      component: () => import('@/views/Seller'),
    },
  ],
})
