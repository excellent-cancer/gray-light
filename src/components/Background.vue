<template>
  <fade-transition :duration="1000">
    <div v-show="isShow" style="z-index: 1">
      <div class="background"></div>
    </div>
  </fade-transition>
</template>

<script>

  export default {
    name: "Background",

    props: {
      isShow: Boolean
    }
  }
</script>

<style scoped>

  .background {
    background: url("../assets/31585071810_.pic_hd.jpg") no-repeat top;
    background-size: cover;
    z-index: -1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.3;
  }




</style>