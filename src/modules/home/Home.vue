<template>
  <div class="home-wrapper">

    <home-background :play="playBackground"></home-background>

    <home-navigation :play="playNavigation" @played="playBackground = true"></home-navigation>

  </div>
</template>

<script>
  import HomeBackground from "./HomeBackground"
  import HomeNavigation from "./HomeNavigation"

  export default {
    name: 'home',

    data() {
      return {
        playBackground: false,
        playNavigation: false
      }
    },

    mounted() {
      setTimeout(() => this.playNavigation = true)
    },

    components: {
      HomeBackground,
      HomeNavigation
    }
  }
</script>

<style>

  .home-wrapper {
    background-color: #000000
  }

</style>
