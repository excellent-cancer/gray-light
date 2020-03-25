<template>
  <div id="app">
    <background :is-show="isShow"></background>
    <symbol-position :is-show="isShowForSymbol" @hh="h1"></symbol-position>
  </div>
</template>

  <script>
import Background  from "./components/Background";
import SymbolPosition from "./components/Symbol";

export default {
  name: 'app',

  data() {
    return {
      isShow: false,
      isShowForSymbol: false
    }
  },

  mounted() {
    setTimeout(() => this.isShowForSymbol = true, 2000)
  },

  methods: {
    h1() {
      this.isShow = true
    }
  },

  components: {
    Background,
    SymbolPosition
  }
}
</script>

<style>
</style>
