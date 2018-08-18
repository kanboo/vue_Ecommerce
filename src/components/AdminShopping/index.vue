<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'adminShopping',
  components: {},
  data() {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  computed: {
    ...mapState(['isLoading', 'status']),
    ...mapState('Products', ['products', 'product', 'pagination']),
    ...mapState('Carts', ['cart']),
    // Vuex 遇 v-model 時，改用 computed 解決
    // 參考：https://vuex.vuejs.org/zh/guide/forms.html
    productNum: {
      get() {
        return this.product.num
      },
      set(num) {
        this.updateProduct({ num })
      }
    }
  },
  methods: {
    ...mapActions(['loading']),
    ...mapMutations('Products', ['PRODUCT']),
    ...mapActions('Products', ['getProducts', 'getProduct', 'updateProduct']),
    ...mapActions('Carts', [
      'removeCartItem',
      'addToCart', // 利用物件解構賦值方式，傳遞參數
      'getCart'
    ]),
    addCouponCode() {
      const api = `/api/${process.env.DBPATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }

      this.loading(true)
      this.axios.post(api, { data: coupon }).then(res => {
        // console.log('addToCart', res.data)
        if (res.data.success) {
          this.getCart()
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.loading(false)
      })
    },
    createOrder() {
      const api = `/api/${process.env.DBPATH}/order`

      this.$validator.validate().then(result => {
        if (!result) {
          // do stuff if not valid.
          this.$bus.$emit('messsage:push', '表單資料尚未填寫完成', 'danger')
        } else {
          this.loading(true)
          this.axios.post(api, { data: this.form }).then(res => {
            console.log('addToCart', res.data)
            if (res.data.success) {
              this.$router.push({
                path: `/customer_checkout/${res.data.orderId}`
              })
            } else {
              this.$bus.$emit('messsage:push', res.data.message, 'danger')
            }
            this.loading(false)
          })
        }
      })
    }
  },
  created() {
    this.getProducts()
    this.getCart()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
