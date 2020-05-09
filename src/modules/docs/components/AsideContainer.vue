<template>
  <transition name="bounce">

    <aside style="width: 20rem;" class="el-aside layout-aside-wrapper">

      <ul class="aside-container">

        <aside-catalog v-for="(section, sectionIndex) in catalogs"
                       :key="sectionIndex"
                       :catalog="section">
        </aside-catalog>

      </ul>

    </aside>

  </transition>

</template>

<script>
  import AsideCatalog from "@/modules/docs/components/AsideCatalog";

  export default {
    name: "AsideContainer",

    props: {
      /**
       * catalogs = [
       *  { id: 1, title: "标题", folder: "" }
       * ]
       */
      catalogs: {
        type: Array,
        default() {
          return Array.of()
        }
      },
      lazy: Boolean
    },

    data() {
      return {
        active: -1,
        fontColor: "#2c3e50",
        activeFontColor: "#409eef"
      }
    },

    methods: {
      hash(sectionIndex, headlineIndex) {
        return sectionIndex * 31 + headlineIndex
      }
    },

    components: {
      AsideCatalog
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

  .bounce-enter-active {
    animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>