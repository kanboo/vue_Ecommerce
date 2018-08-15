<script>
import $ from 'jquery'
import Pagination from '@/components/Pagination'

export default {
  name: 'adminProducts',
  components: { Pagination },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: true,
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    getProducts(page = 1) {
      const api = `/api/${process.env.DBPATH}/admin/products?page=${page}`

      this.isLoading = true
      this.axios.get(api).then(response => {
        // console.log('getProducts', response.data)
        if (response.data.success) {
          // this.$set(this, 'products', [...response.data.products])
          this.products = response.data.products
          this.pagination = response.data.pagination
        } else {
          this.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
        this.isLoading = false
      })
    },
    updateProduct() {
      // 新增
      let api = `/api/${process.env.DBPATH}/admin/product`
      let httpMethod = 'post'

      // 修改
      if (!this.isNew) {
        api = `/api/${process.env.DBPATH}/admin/product/${this.tempProduct.id}`
        httpMethod = 'put'
      }

      // CallAPI
      this.axios[httpMethod](api, { data: this.tempProduct }).then(response => {
        // console.log('createProducts', response.data)
        if (!response.data.success) {
          this.$bus.$emit('messsage:push', response.data.message, 'danger')
        }
        $('#productModal').modal('hide')
        this.getProducts()
      })
    },
    deleteProduct() {
      // 刪除
      let api = `/api/${process.env.DBPATH}/admin/product/${
        this.tempProduct.id
      }`
      let httpMethod = 'delete'

      this.axios[httpMethod](api).then(response => {
        // console.log('createProducts', response.data)
        if (response.data.success) {
          // console.log(response.data.message)
          $('#delProductModal').modal('hide')
          this.getProducts()
        }
      })
    },
    uploadFile() {
      // console.log(this)

      const api = `/api/${process.env.DBPATH}/admin/upload`
      const uploadedFile = this.$refs.files.files[0] // 取得檔案

      // 客制上傳檔案格式
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)

      // loading
      this.status.fileUploading = true

      // Call API
      this.axios
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // 上傳檔案格式
          }
        })
        .then(response => {
          // console.log(response.data)

          if (response.data.success) {
            this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl)
          } else {
            this.$bus.$emit('messsage:push', response.data.message, 'danger')
          }
          this.status.fileUploading = false
        })
    },
    openModal(
      isNew = true,
      item = {
        category: '手作品',
        unit: '個',
        is_enabled: 1
      }
    ) {
      this.isNew = isNew
      this.$set(this, 'tempProduct', Object.assign({}, item))
      $('#productModal').modal({
        backdrop: 'static',
        show: true
      })
    },
    deleteModal(item = {}) {
      this.$set(this, 'tempProduct', Object.assign({}, item))
      $('#delProductModal').modal({
        backdrop: 'static',
        show: true
      })
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
