<script>
import AdminNavBar from '@/components/AdminNavBar'
import AdminSideBar from '@/components/AdminSideBar'

export default {
  name: 'admin',
  components: {
    AdminNavBar,
    AdminSideBar
  },
  data() {
    return {
      title: 'Vue - Porject'
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
