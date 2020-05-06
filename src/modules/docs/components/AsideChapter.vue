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

    <ul v-if="headlines != null" v-show="isActive" class="aside-sub-headline-group">

      <li v-for="(subHeadline, subHeadlineIndex) in headlines" :key="subHeadlineIndex">

        <a :href="subHeadline.href" class="aside-headline-item" :style="commonStyle">{{subHeadline.title}}</a>

      </li>

    </ul>
  </li>
</template>

<script>
  export default {
    name: "AsideChapter",

    inject: ["activeChapter"],

    props: {
      id: { type: Number, required: true },
      chapter: { type: Object, required: true },
      textColor: { default: "#2c3e50" },
      activeColor: { default: "#3eaf7c" },
      backgroundColor: { default: "#ffffff" }
    },

    data() {
      return {
        isHover: false,
        inited: false,
        headlines: null,
      }
    },

    computed: {
      isActive() {
        return this.inited && this.activeChapter.isActive(this.id)
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
      this.activeChapter.on(this.id, this.handleSelect)
    },

    methods: {
      handleSelect() {
        // 只有在为激活的情况下才能处理选择事件
        if (!this.isActive) {
          if (this.inited) {
            this.activeChapter.setActiveId(this.id)
          } else {
            this.activeChapter.initActiveId(this.id, this.chapter, () => {
              this.headlines = this.activeChapter.headlines(this.id)
              this.inited = true
            })
          }
        }
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

  .aside-sub-headline-group {
    padding-left: 1.5rem;
    font-size: .95em;
    list-style-type: none;
  }

</style>