import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'active',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/admin',
      component: () => import('@/pages/Admin'),
      children: [
        {
          path: '', // 首頁
          name: 'AdminDashboard',
          component: () => import('@/components/AdminProducts'),
          meta: { requiresAuth: true } // 驗證是否登入
        },
        {
          path: 'products', // 產品列表
          name: 'AdminProducts',
          component: () => import('@/components/AdminProducts'),
          meta: { requiresAuth: true } // 驗證是否登入
        },
        {
          path: 'orders', // 訂單
          name: 'AdminOrders',
          component: () => import('@/components/AdminOrders'),
          meta: { requiresAuth: true } // 驗證是否登入
        },
        {
          path: 'coupons', // 優惠券
          name: 'AdminCoupons',
          component: () => import('@/components/AdminCoupons'),
          meta: { requiresAuth: true } // 驗證是否登入
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/pages/Admin'),
      children: [
        {
          path: 'customer_order', // 購買頁面
          name: 'AdminShopping',
          component: () => import('@/components/AdminShopping')
        },
        {
          path: 'customer_checkout/:orderId', // 結帳頁面
          name: 'AdminCheckout',
          component: () => import('@/components/AdminCheckout')
        }
      ]
    },
    {
      path: '*',
      redirect: 'Login'
    }
  ]
})
