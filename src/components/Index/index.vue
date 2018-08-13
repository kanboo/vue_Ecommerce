<script>
import $ from 'jquery'

export default {
  name: 'index',
  components: {},
  data() {
    return {
      title: 'Vue - Porject'
    }
  },
  methods: {
    openModal() {
      $('#exampleModal').modal('show')
    },
    getAPIs() {
      const api = `/api/${process.env.DBPATH}/products`
      this.$http.get(api).then(response => {
        console.log('products', response.data)
      })

      this.axios.get('/data/youbike').then(response => {
        console.log('youbike', response.data)
      })

      this.axios.get('/local/comics').then(response => {
        console.log('local-comics', response.data)
      })

      this.axios.get('/local/detail').then(response => {
        console.log('local-detail', response.data)
      })

      this.axios
        .post('/local/comics', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  created() {
    this.getAPIs()
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
