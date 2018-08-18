<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'

export default {
  name: 'adminCoupons',
  components: { Pagination },
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getCoupons(page = 1) {
      const api = `/api/${process.env.DBPATH}/admin/coupons?page=${page}`

      this.isLoading = true
      this.axios.get(api).then(res => {
        console.log('getCoupons', res.data)
        if (res.data.success) {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
        } else {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        this.isLoading = false
      })
    },
    updateCoupon() {
      // 新增
      let api = `/api/${process.env.DBPATH}/admin/coupon`
      let httpMethod = 'post'

      // 修改
      if (!this.isNew) {
        api = `/api/${process.env.DBPATH}/admin/coupon/${this.tempCoupon.id}`
        httpMethod = 'put'
      }

      this.isLoading = true
      // CallAPI
      this.axios[httpMethod](api, { data: this.tempCoupon }).then(res => {
        // console.log('updateCouponss', res.data)
        if (!res.data.success) {
          this.$bus.$emit('messsage:push', res.data.message, 'danger')
        }
        $('#couponModal').modal('hide')
        this.getCoupons()
      })
    },
    deleteCoupon() {
      // 刪除
      let api = `/api/${process.env.DBPATH}/admin/coupon/${this.tempCoupon.id}`
      let httpMethod = 'delete'

      this.isLoading = true
      this.axios[httpMethod](api).then(res => {
        // console.log('deleteCoupon', res.data)
        if (res.data.success) {
          // console.log(res.data.message)
          $('#delCouponModal').modal('hide')
          this.getCoupons()
        }
      })
    },
    openModal(isNew = true, item = {}) {
      this.isNew = isNew
      this.$set(this, 'tempCoupon', Object.assign({}, item))
      $('#couponModal').modal({
        backdrop: 'static',
        show: true
      })
    },
    deleteModal(item = {}) {
      this.$set(this, 'tempCoupon', Object.assign({}, item))
      $('#delCouponModal').modal({
        backdrop: 'static',
        show: true
      })
    }
  },
  created() {
    this.getCoupons()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
