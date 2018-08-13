import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'active',
  routes: [
    {
      path: '/admin',
      // name: 'Admin',
      component: () => import('@/pages/Admin'),
      children: [
        {
          path: '', // 第一個子項(default)
          name: 'AdminDashboard',
          component: () => import('@/components/AdminDashboard'),
          meta: { requiresAuth: true } // 驗證是否登入
        },
        {
          path: 'products', // 第二個子項
          name: 'AdminProducts',
          component: () => import('@/components/AdminProducts'),
          meta: { requiresAuth: true } // 驗證是否登入
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Login')
    },
    {
      path: '*',
      redirect: 'Login'
    }
  ]
})
