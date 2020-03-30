<template>
  <li>
    <a :href="headline.href"
       @click="handleSelect"
       @mouseenter="onMouseEnter"
       @focus="onMouseEnter"
       @blur="onMouseLeave"
       @mouseleave="onMouseLeave"
       class="aside-headline-item"
       :style="[ commonStyle, hoverStyle, activeStyle ]">
      {{headline.title}}
    </a>

    <ul v-if="headline.items != null" v-show="isActive" class="aside-sub-headline-group">

      <li v-for="(subHeadline, subHeadlineIndex) in headline.items" :key="subHeadlineIndex">

        <a :href="subHeadline.href" class="aside-headline-item" :style="commonStyle">{{subHeadline.title}}</a>

      </li>

    </ul>
  </li>
</template>

<script>
  export default {
    name: "AsideContainerHeadline",

    props: {
      id: Number,
      activeId: Number,
      headline: Object,
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
        return this.id === this.activeId
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

    methods: {
      handleSelect() {
        this.id === this.activeId ? this.$emit("unselect") : this.$emit("select", this.id)
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