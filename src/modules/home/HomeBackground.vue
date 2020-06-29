<!-- 背景播放组件 -->

<template>
  <fade-transition :duration="duration" @afterEnter="played">
    <div v-show="play" class="background-wrapper">
      <!--<div class="background" :style="imgStyle"></div>-->

      <video :src="src" autoplay="autoplay" loop="loop" muted="muted" class="background"></video>
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
        src: this.$settings.getSetting("background.img"),
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
    opacity: 0.4;
  }

  .background-wrapper {
    z-index: -1;
  }

  .intro-bg-video {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -720px 0 0 -1280px;
    display: block;
    width: 2560px;
    height: 1440px;
    opacity: 0.4;
  }
</style>