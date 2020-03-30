<template>
  <el-aside width="20rem" class="layout-aside-wrapper">

    <ul class="aside-container">

      <li v-for="(section, sectionIndex) in items" :key="sectionIndex">

        <section>

          <p class="aside-section-item">{{section.title}}</p>

          <ul v-if="section.items != null" class="aside-headline-group">

            <aside-container-headline v-for="(headline, headlineIndex) in section.items"
                                      :key="headlineIndex"
                                      :id="hash(sectionIndex, headlineIndex)"
                                      :active-id="active"
                                      :headline="headline"
                                      @select="handleHeadlineSelect"
                                      @unselect="handleHeadlineUnselect">
            </aside-container-headline>

            <!--<li v-for="(headline, headlineIndex) in section.items"
                :key="headlineIndex"
                @mouseenter="onMouseEnter(sectionIndex, headlineIndex)"
                @focus="onMouseEnter(sectionIndex, headlineIndex)"
                @blur="onMouseLeave(sectionIndex, headlineIndex)"
                @mouseleave="onMouseLeave(sectionIndex, headlineIndex)">

              <a :href="headline.href"
                 @click="onSelectHeadline(sectionIndex, headlineIndex)"
                 class="aside-headline-item">
                {{headline.title}}
              </a>

              <ul v-if="headline.items != null" v-show="active === hash(sectionIndex, headlineIndex)" class="aside-sub-headline-group">

                <li v-for="(subHeadline, subHeadlineIndex) in headline.items" :key="subHeadlineIndex">

                  <a :href="subHeadline.href" class="aside-headline-item">{{subHeadline.title}}</a>

                </li>

              </ul>

            </li>-->

          </ul>

        </section>

      </li>

    </ul>

  </el-aside>
</template>

<script>
  import AsideContainerHeadline from "./AsideContainerHeadline.vue";

  export default {
    name: "AsideContainer",

    props: {
      /**
       * items = [
       *  title: "标题",
       *  items: [
       *    {
       *      title: "标题",
       *      href: "链接",
       *      items: []
       *    }
       *  ]
       * ]
       */
      items: Array
    },

    data() {
      return {
        active: -1,
        fontColor: "#2c3e50",
        activeFontColor: "#409eef"
      }
    },

    methods: {

      handleHeadlineSelect(id) {
        if (this.active === (this.active = id)) {
          this.active = -1
        }
      },

      handleHeadlineUnselect() {
        this.active = -1
      },

      hash(sectionIndex, headlineIndex) {
        return sectionIndex*31 + headlineIndex
      }
    },

    components: {
      AsideContainerHeadline
    }
  }
</script>

<style scoped>
  .layout-aside-wrapper {
    font-size: 16px;
    background-color: #fff;
    position: fixed;
    z-index: 10;
    margin: 0;
    top: 3.6rem;
    left: 0;
    bottom: 0;
    box-sizing: border-box;
    border-right: 1px solid #eaecef;
    overflow-y: auto;
  }


  .aside-container {
    padding: 1.5rem 0;
    margin: 0;
    list-style-type: none;
    line-height: 1.7;
  }

  .aside-section-item {
    color: #2c3e50;
    transition: color .15s ease;
    font-size: 1.1em;
    font-weight: 700;
    padding: .35rem 1.5rem .35rem 1.25rem;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
    border-left: .25rem solid transparent;
  }

  .aside-headline-group {
    padding: 0;
    margin: 0;
    list-style-type: none;
    line-height: 1.7;

    transition: height .1s ease-out;
    font-size: .95em;
    overflow: hidden;
  }

  .aside-headline-item {
    text-decoration: none;
    font-size: 1em;
    font-weight: 400;
    display: block !important;
    color: #2c3e50;
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