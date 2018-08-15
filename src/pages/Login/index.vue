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
      const api = `${process.env.APIPATH}/signin`
      this.axios.post(api, this.user).then(res => {
        // console.log('signin', res.data)
        if (res.data.success) {
          // console.log('Login~~~~')
          // this.$router.push({ path: '/admin' })
          this.$router.push({ path: '/admin/products' })
        }
      })
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
