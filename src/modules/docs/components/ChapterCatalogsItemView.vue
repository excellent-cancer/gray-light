<template>
  <li>
    <a @click="handleSelect"
       @mouseenter="onMouseEnter"
       @focus="onMouseEnter"
       @blur="onMouseLeave"
       @mouseleave="onMouseLeave"
       class="aside-headline-item"
       :style="[ commonStyle, hoverStyle, activeStyle ]">
      {{chapter.title}}
    </a>
  </li>
</template>

<script>
  export default {
    inject: ['sharedDocument'],

    props: {
      chapter: { type: Object, required: true },
      textColor: { default: "#2c3e50" },
      activeColor: { default: "#3eaf7c" },
      backgroundColor: { default: "#ffffff" }
    },

    data() {
      return {
        isHover: false
      }
    },

    computed: {
      isActive() {
        return this.sharedDocument.status.isActiveChapter(this.chapter)
      },
      commonStyle() {
        return { color: this.textColor, backgroundColor: this.backgroundColor }
      },
      hoverStyle() {
        return this.isHover ? { color: this.activeColor } : {}
      },
      activeStyle() {
        return this.isActive ? { color: this.backgroundColor, backgroundColor: this.activeColor } : {}
      }
    },

    mounted() {
      const status = this.sharedDocument.status
      if (!status.existsActiveChapter()) {
        status.setActiveChapter(this.chapter)
      }
    },

    methods: {
      handleSelect() {
        return !this.isActive && this.sharedDocument.status.setActiveChapter(this.chapter)
      },

      onMouseEnter() {
        this.isHover = !this.isActive
      },

      onMouseLeave() {
        this.isHover = false
      }
    }
  }
</script>

<style scoped>
  .aside-headline-item {
    text-decoration: none;
    font-size: 1em;
    font-weight: 400;
    display: block !important;
    padding: .35rem 1rem .35rem .75rem;
    line-height: 1.4;
    margin: 0 1rem 0 1.5rem;
    box-sizing: border-box;
    border-radius: .25rem;
  }
</style>