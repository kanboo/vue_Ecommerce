<script>
import Pagination from '@/components/Pagination'

export default {
  name: 'adminOrders',
  components: { Pagination },
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false
    }
  },
  methods: {
    getOrders(page = 1) {
      const api = `/api/${process.env.DBPATH}/admin/orders?page=${page}`

      this.isLoading = true
      this.axios.get(api).then(res => {
        // console.log('getOrders', res.data)
        if (res.data.success) {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.isLoading = false
      })
    }
  },
  computed: {
    sortOrder() {
      const vm = this
      let newOrder = []
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0
          const bIsPaid = b.is_paid ? 1 : 0
          return bIsPaid - aIsPaid
        })
      }
      return newOrder
    }
  },
  created() {
    this.getOrders()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
