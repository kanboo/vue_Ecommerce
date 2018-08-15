<script>
export default {
  name: 'adminCheckout',
  components: {},
  data() {
    return {
      orderId: '',
      order: {
        user: {}
      },
      isLoading: false
    }
  },
  methods: {
    getOrder() {
      const api = `/api/${process.env.DBPATH}/order/${this.orderId}`

      this.isLoading = true
      this.axios.get(api).then(res => {
        console.log('getOrder', res.data)
        if (res.data.success) {
          this.order = res.data.order
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.isLoading = false
      })
    },
    payOrder() {
      const api = `/api/${process.env.DBPATH}/pay/${this.orderId}`

      this.isLoading = true
      this.axios.post(api).then(res => {
        console.log('payOrder', res.data)
        if (res.data.success) {
          this.getOrder()
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.isLoading = false
      })
    }
  },
  created() {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
