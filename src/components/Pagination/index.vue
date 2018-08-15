<script>
export default {
  name: 'pagination',
  components: {},
  props: {
    pagination: {
      type: Object // 型態
    }
  },
  data() {
    return {
      title: 'Vue - Porject'
    }
  },
  methods: {
    emitPages(page) {
      this.$emit('updatePage', page)
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
