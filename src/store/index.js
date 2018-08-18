// 參考範本：https://github.com/milkmidi/2017_vue_vuex_hello_world
/* eslint no-shadow:0, no-param-reassign:0 */
import Vuex from 'vuex'
import Vue from 'vue'

import Products from './modules/Products'
import Carts from './modules/Carts'

Vue.use(Vuex)

/*
vue 裡用
import { mapState } from 'vuex'
// 方法1(不推)
this.$store.state.showLoading
// 方法2(建議)
computed: {
  ...mapState(['showLoading','isLogin','userName','formData'])
}
*/
const state = {
  isLoading: false,
  status: {
    loadingItem: ''
  }
}

/*
vue 裡用
import { mapGetters } from 'vuex';
// 方法1(不推)
this.$store.state.showLoading
// 方法2(建議)
computed: {
  ...mapGetters(['showLoading','isLogin','userName','formData'])
}
 */
const getters = {
  // isLoading: state => state.isLoading
}

/*
vue 裡用
import { mapActions } from 'vuex';
// 方法1(不推)
this.$store.dispatch('loading', true)
// 方法2(建議)
methods: {
  ...mapActions(['loading','login']),
}

Action 類似於 Mutation，不同在於：
Action 提交的是 Mutation，而不是直接變更狀態。
Action 可以包含任意異步操作。
Action 可以非同步，但一定只能 return Promise
*/
const actions = {
  loading({ commit }, value) {
    commit('LOADING', value)
  }
}

/*
vue 裡用
import { mapMutations } from 'vuex';
// 方法1(不推)
this.$store.commit('SHOWLOADING' , true)
// 方法2(建議)
methods: {
  ...mapMutations(['SHOWLOADING','ISLOGIN','FORMDATA'])
}

Mutation 必須是「同步」函數, 很重要
*/
const mutations = {
  LOADING(state, value) {
    state.isLoading = value
  },
  LOADINGITEM(state, value) {
    state.status.loadingItem = value
  }
}

const modules = {
  Products,
  Carts
}

// https://vuex.vuejs.org/en/plugins.html
// Plugins
const myPlugin = store => {
  // called when the store is initialized
  store.subscribe(mutation => {
    // called after every mutation.
    // console.log(mutation)
    // The mutation comes in the format of { type, payload }.
  })
}

export default new Vuex.Store({
  strict: true, // 嚴格模式
  state,
  getters,
  actions,
  mutations,
  modules,
  plugins: [myPlugin]
})
