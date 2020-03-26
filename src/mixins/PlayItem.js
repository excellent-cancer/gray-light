/**
 * 定义一个播放Item，控制播放顺序
 * 事件 played：播放完成
 */
export default {

  props: {
    play: Boolean
  },

  methods: {
    played() {
      this.$emit('played')
    }
  }

}