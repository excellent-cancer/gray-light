<template>
  <li>
    <section>

      <p class="aside-section-item">{{catalog.title}}<span v-if="loading" class="el-icon-loading"></span></p>

      <template v-if="isCatalogsGroup">

        <aside-container lazy></aside-container>

      </template>

      <template v-if="isChaptersGroup">


        <ul v-if="notEmptyChapters" class="aside-headline-group">

          <aside-chapter v-for="(c, index) in chapters"
                                    :key="index"
                                    :id="hash(catalog, c)"
                                    :chapter="c">
          </aside-chapter>

        </ul>

      </template>

      <template v-if="isEmptyGroup">

        <!-- nothing to show -->

      </template>

    </section>
  </li>
</template>

<script>
  import AsideContainer from "@/modules/docs/components/AsideContainer";
  import AsideChapter from "@/modules/docs/components/AsideChapter";

  export default {
    name: "AsideCatalog",

    inject: ['activeChapter'],

    props: {
      catalog: Object
    },

    data() {
      return {
        loaded: false,
        fontColor: "#2c3e50",
        activeFontColor: "#409eef",
        chapters: [],
        chapterCount: 0
      }
    },

    computed: {
      loading() {
        return !this.loaded
      },
      notEmptyChapters() {
        return this.chapterCount > 0
      },

      /* 计算是否子元素是目录、文章或是其他 */

      isCatalogsGroup() {
        return this.catalog.folder === "CATALOG"
      },

      isChaptersGroup() {
        return this.catalog.folder === "CHAPTER"
      },

      isEmptyGroup() {
        return this.catalog.folder === "EMPTY"
      }
    },

    mounted() {
      if (!this.loaded) {
        if (this.isEmptyGroup) {
          this.loaded = true
        } else {
          this.loadChapters()
        }
      }
    },

    methods: {
      loadChapters() {
        const requests = this.$requests
        const tokens = this.$tokens

        requests.documentChapters(tokens, this.catalog.id)
          .then(
            chapters => {
              for (let i = 0; i < chapters.length; i++) {
                if (i > 0) {
                  chapters[i - 1].next = this.hash(this.catalog, chapters[i])
                  chapters[i].previous = this.hash(this.catalog, chapters[i - 1])
                }
              }

              for (let c of chapters) {
                this.chapters.push(c)
                this.chapterCount++
              }
            }
          )
          .catch(
            e => this.$message.error(e)
          )
          .finally(
            () =>
              this.loaded = true
          )
      },

      hash(catalog, chapter) {
        return this.activeChapter.hash(catalog, chapter)
      }
    },

    components: {
      AsideContainer,
      AsideChapter
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