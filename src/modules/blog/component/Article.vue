<template>
  <v-content v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             style="padding: 0">

    <markdown-it-vue
            :request="request"
            @replaced="replaced"
            @scroll="scroll"
            class="main-markdown"/>

    <template v-if="!loading && store != null">
      <footer class="main-markdown-footer main-item">
        <div class="main-markdown-footer-message">

          <span style="font-weight: 500;color: #3eaf7c;">Created: </span>
          <span style="font-weight: 400;color: #aaa;">{{store.createdDate}}</span>
          <el-divider direction="vertical"></el-divider>
          <span style="font-weight: 500;color: #3eaf7c;">Last Updated: </span>
          <span style="font-weight: 400;color: #aaa;">{{store.updatedDate}}</span>
        </div>
      </footer>


    </template>
  </v-content>
</template>

<script>
  import SharedBlog from '@/modules/blog/mixins/shared-blog'

  export default {
    name: "Article",

    mixins: [SharedBlog],

    data() {
      return {
        store: null,
        request: null
      }
    },

    watch: {
      "status.selectedBlogId"() {
        this.store = this.status.getSelectedBlogStore()
        this.request = null
        if (this.store != null) {
          this.store.ifLoaded(store => {
            this.request = this.$markdown.request(store.id, store.content)
          })
        }
      }
    },

    computed: {
      isActive() {
        return this.status != null ? this.status.existsSelectedBlog() : false
      },
      loading() {
        return this.isActive && !this.store.isLoaded
      }
    },

    methods: {
      replaced(request, headlines) {
        let store = this.status.getSelectedBlogStore(request.id)
        if (store != null) {
          store.acceptHeadlines(headlines)
        }
      },
      scroll(request, scroll) {
        let store = this.status.getSelectedBlogStore(request.id)
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
    margin: 0 auto 0;
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