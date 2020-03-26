<template>
  <div id="app">

    <home-background :play="playBackground"></home-background>

    <home-navigation :play="playNavigation" @played="playBackground = true"></home-navigation>

  </div>
</template>

  <script>
import HomeBackground  from "./components/HomeBackground"
import HomeNavigation from "./components/HomeNavigation"

export default {
  name: 'app',

  data() {
    return {
      playBackground: false,
      playNavigation: false
    }
  },

  mounted() {
    setTimeout(() => this.playNavigation = true, 2000)
  },

  components: {
    HomeBackground,
    HomeNavigation
  }
}
</script>

<style>
</style>
