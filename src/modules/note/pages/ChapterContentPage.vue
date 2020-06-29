<template>
  <v-content v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             style="padding: 0">
    <markdown-it-vue :request="request"
                     @replaced="replaced"
                     @scroll="scroll"
                     class="main-markdown"/>

    <template v-if="isActive">
      <footer class="main-markdown-footer main-item">
        <div class="main-markdown-footer-message">

        <span style="font-weight: 500;color: #3eaf7c;">Created: </span>
          <span style="font-weight: 400;color: #aaa;">{{chapterStore.createdDate}}</span>
          <el-divider direction="vertical"></el-divider>
          <span style="font-weight: 500;color: #3eaf7c;">Last Updated: </span>
          <span style="font-weight: 400;color: #aaa;">{{chapterStore.updatedDate}}</span>
        </div>
      </footer>

      <el-divider class="main-item"></el-divider>

      <div class="main-item" style="padding-top: 1rem">
        <el-button type="text" icon="el-icon-arrow-left" @click="previous">上一页</el-button>
        <el-button style="float: right" type="text" @click="next">下一页<i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </div>
    </template>
  </v-content>

</template>

<script>
  import SharedDocumentStatus from "@/modules/note/mixins/shared-note"

  export default {
    name: "MainContainer",

    mixins: [SharedDocumentStatus],

    data() {
      return {
        chapterStore: null,
        request: null
      }
    },

    watch: {
      "status.activeChapterId"() {
        this.chapterStore = this.status.getActiveChapterStore()
        this.request = null
        if (this.chapterStore != null) {
          this.chapterStore.ifLoaded(store => {
            this.request = {
              id: store.id, content: store.content
            }
          })
        }
      }
    },

    computed: {
      isActive() {
        return this.status != null ? this.status.existsActiveChapter() : false
      },
      loading() {
        return this.isActive && !this.chapterStore.isLoaded
      }
    },

    methods: {
      previous() {
/*        const chapter = this.chapter
        if (chapter.previous != null) {
          this.activeChapter.emit(chapter.previous.toString())
        }*/
      },
      next() {
/*        const chapter = this.chapter
        if (chapter.next != null) {
          this.activeChapter.emit(chapter.next.toString())
        }*/
      },
      replaced(request, headlines) {
        let store = this.status.getChapterStore(request.id)
        if (store != null) {
          store.acceptHeadlines(headlines)
        }
      },
      scroll(request, scroll) {
        let store = this.status.getChapterStore(request.id)
        if (store != null) {
          store.scrollTo(scroll)
        }
      }
    }
  }
</script>

<style scoped>
  .main-markdown {
    max-width: 740px;
    padding: 2rem 2.5rem;
    margin: 4.6rem auto 0;
  }

  .main-markdown-footer {
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow: auto;
  }

  .main-markdown-footer-message {
    float: right;
    font-size: .9em;
  }

  .main-item {
    max-width: 740px;
    margin: 0 auto;
  }

</style>