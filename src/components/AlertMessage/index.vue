<script>
export default {
  name: 'alertMessage',
  components: {},
  data() {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      // 移除訊息
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage(num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming(timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    }
  },
  created() {
    const vm = this
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('messsage:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
    // vm.$bus.$emit('message:push');
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
