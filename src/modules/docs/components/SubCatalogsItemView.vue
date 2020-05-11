<template>
  <v-list-group :sub-group="sub" no-action append-icon="" value="true">

    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title v-text="catalog.title"></v-list-item-title>
      </v-list-item-content>
    </template>

    <template v-if="isChaptersGroup">
      <v-list-item v-for="(c, i) in chapters"
                   :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="c.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-if="!sub && isCatalogsGroup">

      <sub-catalogs-item-view v-for="(c, i) in chapters"
                              :key="i"
                              sub
                              :catalog="c">
      </sub-catalogs-item-view>

    </template>

  </v-list-group>
</template>

<script>
  export default {
    name: "SubCatalogsItemView",

    props: {
      catalog: Object,
      sub: Boolean
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

    data() {
      return {
        loaded: false,
        chapters: [],
        chapterCount: 0
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
        return catalog.id*31 + chapter.id
      }
    },
  }
</script>

<style scoped>

</style>