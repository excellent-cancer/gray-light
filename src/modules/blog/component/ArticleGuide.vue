<template>
  <v-navigation-drawer app clipped right width="10rem">

    <v-subheader>On this page:</v-subheader>

    <ul v-if="headlines != null" class="aside-sub-headline-group">

      <li v-for="(headline, i) in headlines"
          :key="i"
          :style="[indentStyle(headline.level), activeStyle(headline.id)]">

        <a class="aside-headline-item"
           :style="commonStyle"
           v-text="headline.title">
        </a>

      </li>
    </ul>
  </v-navigation-drawer>
</template>

<script>
  import SharedBlog from "@/modules/blog/mixins/shared-blog"

  export default {
    name: "HeadlineGuide",

    mixins: [SharedBlog],

    props: {
      textColor: {default: "#2c3e50"},
      activeColor: {default: "#3eaf7c"},
      backgroundColor: {default: "#ffffff"}
    },

    data() {
      return {
        store: null,
        headlines: null
      }
    },

    watch: {
      "status.selectedBlogId"() {
        this.store = this.status.getSelectedBlogStore()
        this.headlines = this.store != null ? this.store.headlines : null
      }
    },

    computed: {
      commonStyle() {
        return {color: this.textColor, backgroundColor: this.backgroundColor}
      }
    },

    methods: {
      indentStyle(level) {
        return {
          "margin-left": `${level - 1}rem`
        }
      },
      activeStyle(id) {
        return id === this.store.scrollId ?
          { "border-left": "2px solid red" } : null
      }
    },
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
    margin: 0 1rem 0 1rem;
    box-sizing: border-box;
  }

  .aside-sub-headline-group {
    padding-left: 0;
    font-size: .95em;
    list-style-type: none;
  }
</style>