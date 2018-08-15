<script>
export default {
  name: 'adminNavBar',
  components: {},
  data() {
    return {
      title: 'Vue - Porject'
    }
  },
  methods: {
    signout() {
      const vm = this
      const api = `${process.env.APIPATH}/logout`
      this.axios.post(api).then(response => {
        if (response.data.success) {
          // console.log('logout~~~~')
          vm.$router.push({ name: 'Login' })
        }
      })
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
