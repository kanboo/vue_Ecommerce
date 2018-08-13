<script>
import $ from 'jquery'

export default {
  name: 'adminProducts',
  components: {},
  data() {
    return {
      products: [],
      tempProduct: {},
      isNew: true,
      isLoading: false,
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    getProducts() {
      const vm = this
      const api = `/api/${process.env.DBPATH}/admin/products`

      vm.isLoading = true
      this.axios.get(api).then(response => {
        console.log('getProducts', response.data)
        if (response.data.success) {
          vm.$set(vm, 'products', [...response.data.products])
        }
        vm.isLoading = false
      })
    },
    updateProduct() {
      const vm = this
      // 新增
      let api = `/api/${process.env.DBPATH}/admin/product`
      let httpMethod = 'post'

      // 修改
      if (!vm.isNew) {
        api = `/api/${process.env.DBPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }

      // CallAPI
      this.axios[httpMethod](api, { data: vm.tempProduct }).then(response => {
        // console.log('createProducts', response.data)
        if (!response.data.success) {
          // console.log(response.data.message)
          console.log('新增失敗')
        }
        $('#productModal').modal('hide')
        vm.getProducts()
      })
    },
    deleteProduct() {
      const vm = this
      // 刪除
      let api = `/api/${process.env.DBPATH}/admin/product/${vm.tempProduct.id}`
      let httpMethod = 'delete'

      this.axios[httpMethod](api).then(response => {
        // console.log('createProducts', response.data)
        if (response.data.success) {
          // console.log(response.data.message)
          $('#delProductModal').modal('hide')
          vm.getProducts()
        }
      })
    },
    uploadFile() {
      // console.log(this)
      const vm = this

      const api = `/api/${process.env.DBPATH}/admin/upload`
      const uploadedFile = this.$refs.files.files[0] // 取得檔案

      // 客制上傳檔案格式
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)

      // loading
      vm.status.fileUploading = true

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
            vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
          } else {
            console.log(response.data.message)
          }
          vm.status.fileUploading = false
        })
    },
    openModal(isNew = true, item = {}) {
      this.isNew = isNew
      this.$set(this, 'tempProduct', Object.assign({}, item))
      $('#productModal').modal('show')
    },
    deleteModal(item = {}) {
      this.$set(this, 'tempProduct', Object.assign({}, item))
      $('#delProductModal').modal('show')
    }
  },
  created() {
    this.getProducts()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
