<template>
  <div v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)"
       id="app"
       style="height: 100vh">

    <router-view v-show="!loading"></router-view>

  </div>
</template>

<script>
  export default {
    name: "App",

    data() {
      return {
        loading: true
      }
    },

    mounted() {
      this.$hooks.loadOwnerDetails(() => this.loading = false)
    }
  }
</script>

<style scoped>

</style>