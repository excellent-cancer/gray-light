<template>
  <li>
    <section>

      <p class="aside-section-item"
         v-text="catalog.data.title">
      </p>

      <!-- 父目录 -->
      <template v-if="isCatalogsGroup">

      </template>

      <!-- 章节目录 -->
      <template v-if="isChaptersGroup">

        <ul v-if="notEmptyChapters" class="aside-headline-group">

          <chapter-catalogs-item-view v-for="(c, index) in catalog.chapters"
                         :key="index"
                         :chapter="c">
          </chapter-catalogs-item-view>

        </ul>

      </template>

      <!-- 空目录的情况 -->
      <template v-if="isEmptyGroup">
      </template>

    </section>
  </li>
</template>

<script>
  import ChapterCatalogsItemView from "@/modules/note/component/ChapterCatalogsItemView";

  export default {
    name: "CatalogsItemView",

    props: {
      catalog: Object
    },

    computed: {
      notEmptyChapters() {
        return this.catalog.chapters != null
      },

      /* 计算是否子元素是目录、文章或是其他 */

      isCatalogsGroup() {
        return this.catalog.data.folder === "CATALOG"
      },

      isChaptersGroup() {
        return this.catalog.data.folder === "CHAPTER"
      },

      isEmptyGroup() {
        return this.catalog.data.folder === "EMPTY"
      }
    },

    components: {
      ChapterCatalogsItemView
    }
  }
</script>

<style scoped>
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
</style>