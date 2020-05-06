<template>
  <el-container>

    <!-- 文档头部 -->

    <header-container :items="headerItems"></header-container>

    <el-container>

      <!-- 文章导航 -->

      <aside-container :catalogs="catalogs"></aside-container>

      <!-- 文章展示 -->

      <main-container ref="main"></main-container>

    </el-container>

  </el-container>
</template>

<script>
  import HeaderContainer from "./HeaderContainer.vue"
  import AsideContainer from "./AsideContainer.vue"
  import MainContainer from "./MainContainer.vue"
  import ActiveChapter from "@/modules/docs/shared/active-chapter";
  import {loadDocsRepositoryWhenRouting} from "@/modules/docs/shared/docs-requests";

  export default {
    name: "DocumentLayout",

    provide() {
      return {
        activeChapter: this.activeChapter
      }
    },

    beforeRouteEnter: loadDocsRepositoryWhenRouting,

    beforeRouteUpdate: loadDocsRepositoryWhenRouting,

    data() {
      return {
        catalogs: null,
        activeChapter: new ActiveChapter(this.loadChapterContent, this.$on.bind(this), this.$emit.bind(this)),
        headerItems: [
          <el-link type="primary">主要链接</el-link>,
          <el-link type="primary">主要链接</el-link>,
          <el-link type="primary">主要链接</el-link>
        ]
      }
    },

    methods: {
      /**
       * 根据chapterID，从服务器加载文章内容
       *
       * @param activeID
       * @param chapter 文章
       * @returns {Promise<void>}
       */
      loadChapterContent(activeID, chapter) {
        return new Promise(resolve => {
          const requests = this.$requests
          const tokens = this.$tokens

          requests.documentChapterContent(tokens, chapter.id)
            .then(
              content => {
                this.acceptChapterContent(activeID, chapter, content, resolve)
              }
            )
            .catch(
              error => {
                this.$message.error(error)
              }
            )
        })
      },
      /**
       * 接收新的文章内容，根据ID缓存文章内容，成功缓存后调用callback
       *
       * @param activeID
       * @param chapter
       * @param content 文章内容
       * @param callback 成功callback
       */
      acceptChapterContent(activeID, chapter, content, callback) {
        const activeChapter = this.activeChapter
        activeChapter.cacheContent(activeID, chapter, content)
        callback()
      },
      /**
       * 接收由路由进入此组件时，传入的文档目录数组
       *
       * @param catalogs 目录数组
       */
      acceptCatalogs(catalogs) {
        this.catalogs = catalogs
      }
    },

    components: {
      HeaderContainer,
      AsideContainer,
      MainContainer
    }
  }
</script>

<style scoped>

</style>