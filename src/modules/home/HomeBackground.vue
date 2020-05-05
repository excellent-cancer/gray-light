<!-- 背景播放组件 -->

<template>
  <fade-transition :duration="duration" @afterEnter="played">
    <div v-show="play" class="background-wrapper">
      <div class="background" :style="imgStyle"></div>
    </div>
  </fade-transition>
</template>

<script>
  import playItem from '../../mixins/PlayItem'

  export default {
    mixins: [ playItem ],

    data() {
      return {
        duration: this.$settings.getSettingOrDefault("background.duration", 500),
        imgStyle: {
          backgroundSize: "cover",
          backgroundImage: "url(" + this.$settings.getSetting("background.img") + ")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top"
        }
      }
    }
  }
</script>

<style scoped>
  .background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    opacity: 0.3;
  }

  .background-wrapper {
    z-index: -1;
  }
</style>