<script>
import $ from 'jquery'

export default {
  name: 'adminShopping',
  components: {},
  data() {
    return {
      products: [],
      product: {},
      cart: {},
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getProducts(page = 1) {
      const api = `/api/${process.env.DBPATH}/products?page=${page}`

      this.isLoading = true
      this.axios.get(api).then(res => {
        // console.log('getProducts', res.data)
        if (res.data.success) {
          this.products = res.data.products
          this.pagination = res.data.pagination
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.isLoading = false
      })
    },
    getProduct(id) {
      const api = `/api/${process.env.DBPATH}/product/${id}`

      this.status.loadingItem = id
      this.axios.get(api).then(res => {
        // console.log('getProduct', res.data)
        if (res.data.success) {
          this.product = res.data.product
          $('#productModal').modal('show')
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.status.loadingItem = ''
      })
    },
    addToCart(id, qty = 1) {
      const api = `/api/${process.env.DBPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }

      this.status.loadingItem = id
      this.axios.post(api, { data: cart }).then(res => {
        // console.log('addToCart', res.data)
        if (res.data.success) {
          $('#productModal').modal('hide')
          this.getCart()
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.status.loadingItem = ''
      })
    },
    removeCartItem(id) {
      const api = `/api/${process.env.DBPATH}/cart/${id}`

      this.isLoading = true
      this.axios.delete(api).then(res => {
        // console.log('addToCart', res.data)
        if (res.data.success) {
          this.getCart()
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.isLoading = false
      })
    },
    addCouponCode() {
      const api = `/api/${process.env.DBPATH}/coupon`
      const coupon = {
        code: this.coupon_code
      }

      this.isLoading = true
      this.axios.post(api, { data: coupon }).then(res => {
        // console.log('addToCart', res.data)
        if (res.data.success) {
          this.getCart()
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.isLoading = false
      })
    },
    getCart() {
      const api = `/api/${process.env.DBPATH}/cart`

      // this.status.loadingItem = id
      this.axios.get(api).then(res => {
        console.log('getCart', res.data)
        if (res.data.success) {
          // $('#productModal').modal('hide')
          this.cart = res.data.data
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        // this.status.loadingItem = ''
      })
    },
    createOrder() {
      const api = `/api/${process.env.DBPATH}/order`

      this.$validator.validate().then(result => {
        if (!result) {
          // do stuff if not valid.
          this.$bus.$emit('messsage:push', '表單資料尚未填寫完成', 'danger')
        } else {
          this.isLoading = true
          this.axios.post(api, { data: this.form }).then(res => {
            console.log('addToCart', res.data)
            if (res.data.success) {
              // this.getCart()
              this.$router.push({
                path: `/customer_checkout/${res.data.orderId}`
              })
            } else {
              this.$bus.$emit('messsage:push', res.data.message, 'danger')
            }
            this.isLoading = false
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
