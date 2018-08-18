/* eslint no-shadow:0, no-param-reassign:0 */

import axios from 'axios'
import $ from 'jquery'

const state = {
  cart: {}
}

const getters = {
  // isLoading: state => state.isLoading
}

const actions = {
  addToCart({ commit, dispatch }, { id, qty = 1 }) {
    const api = `/api/${process.env.DBPATH}/cart`
    const cart = {
      product_id: id,
      qty
    }
    console.log(cart)

    commit('LOADINGITEM', id, { root: true })
    axios.post(api, { data: cart }).then(res => {
      console.log('addToCart', res.data)
      if (res.data.success) {
        dispatch('getCart')
        // $('#productModal').modal('hide')
      } else {
        this.$bus.$emit('messsage:push', res.data.message, 'danger')
        commit('LOADINGITEM', '', { root: true })
      }
    })
  },
  removeCartItem({ commit, dispatch }, id) {
    const api = `/api/${process.env.DBPATH}/cart/${id}`

    commit('LOADING', true, { root: true })
    axios.delete(api).then(res => {
      // console.log('addToCart', res.data)
      if (res.data.success) {
        dispatch('getCart')
      } else {
        this.$bus.$emit('messsage:push', res.data.message, 'danger')
        commit('LOADING', false, { root: true })
      }
    })
  },
  getCart({ commit }) {
    const api = `/api/${process.env.DBPATH}/cart`

    axios.get(api).then(res => {
      // console.log('getCart', res.data)
      if (res.data.success) {
        commit('CART', res.data.data)
      } else {
        this.$bus.$emit('messsage:push', res.data.message, 'danger')
      }
      commit('LOADINGITEM', '', { root: true })
      commit('LOADING', false, { root: true })
      $('#productModal').modal('hide')
    })
  }
}

const mutations = {
  CART(state, value) {
    state.cart = value
  }
}

export default {
  namespaced: true, // 將 actions, mutations, getters 變更為區域變數
  state,
  getters,
  actions,
  mutations
}
