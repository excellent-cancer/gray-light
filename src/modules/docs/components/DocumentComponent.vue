<!-- 文档动态组件 -->

<template>
  <component :is="documentContainerType"></component>
</template>

<script>
  export default {
    name: "DocumentComponent",

    computed: {
      documentContainerType() {
        return ""
      }
    }
  }
</script>

<style scoped>

</style>