// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'
import 'bootstrap'

import App from './App'
import router from './router'
import store from './store'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.component('Loading', Loading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 路由確認
router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next)
  // 驗證是否登入
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    const api = '/api/user/check'
    axios.post(api).then(response => {
      console.log(response.data)
      if (response.data.success) {
        next()
      } else {
        next({
          name: 'Login'
        })
      }
    })
  } else {
    next()
  }
})
