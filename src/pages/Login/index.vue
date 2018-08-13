<script>
export default {
  name: 'login',
  components: {},
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin() {
      const vm = this
      const api = `${process.env.APIPATH}/signin`
      this.axios.post(api, this.user).then(response => {
        // console.log('signin', response.data)
        if (response.data.success) {
          console.log('Login~~~~')
          // vm.$router.push({ path: '/admin' })
          vm.$router.push({ path: '/admin/products' })
        }
      })
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
