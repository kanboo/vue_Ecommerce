/* eslint no-shadow:0, no-param-reassign:0 */

import axios from 'axios'
import $ from 'jquery'

const state = {
  products: [],
  product: {},
  pagination: {}
}

const getters = {
  // isLoading: state => state.isLoading
}

const actions = {
  getProducts({ commit }, page = 1) {
    const api = `/api/${process.env.DBPATH}/products?page=${page}`

    commit('LOADING', true, { root: true })
    axios.get(api).then(res => {
      // console.log('getProducts', res.data)
      if (res.data.success) {
        commit('PRODUCTS', res.data.products)
        commit('PAGINATION', res.data.pagination)
      } else {
        this.$bus.$emit('messsage:push', res.data.message, 'danger')
      }
      commit('LOADING', false, { root: true })
    })
  },
  getProduct({ commit }, id) {
    const api = `/api/${process.env.DBPATH}/product/${id}`

    commit('LOADINGITEM', id, { root: true })
    axios.get(api).then(res => {
      console.log('getProduct', res.data)
      if (res.data.success) {
        // commit('PRODUCT', res.data.product)
        commit('PRODUCT', Object.assign(res.data.product, { num: 1 }))

        $('#productModal').modal('show')
      } else {
        this.$bus.$emit('messsage:push', res.data.message, 'danger')
      }
      commit('LOADINGITEM', '', { root: true })
    })
  },
  updateProduct({ commit }, payload) {
    commit('PRODUCT', Object.assign({}, state.product, payload))
  }
}

const mutations = {
  PRODUCTS(state, value) {
    state.products = value
  },
  PRODUCT(state, value) {
    state.product = value
  },
  PAGINATION(state, value) {
    state.pagination = value
  }
}

export default {
  namespaced: true, // 將 actions, mutations, getters 變更為區域變數
  state,
  getters,
  actions,
  mutations
}
