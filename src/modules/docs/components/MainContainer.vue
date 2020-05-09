<template>
  <el-main class="layout-main-wrapper">

    <markdown-it-vue v-for="chapterCell in chapterCellItems"
                     :key="chapterCell.id"
                     v-show="chapterCell.id === activeID"
                     v-extract="handleExtractHeadline"
                     :content="chapterCell.content"
                     :options="options"
                     class="main-markdown"/>

    <template v-if="isActive">
      <footer class="main-markdown-footer main-item">
        <div class="main-markdown-footer-message">

        <span style="font-weight: 500;
    color: #3eaf7c;">Created: </span>
          <span style="font-weight: 400;color: #aaa;">{{chapter.createdDate}}</span>
          <el-divider direction="vertical"></el-divider>
          <span style="font-weight: 500;color: #3eaf7c;">Last Updated: </span>
          <span style="font-weight: 400;color: #aaa;">{{chapter.updatedDate}}</span>
        </div>
      </footer>

      <el-divider class="main-item"></el-divider>

      <div class="main-item" style="padding-top: 1rem">
        <el-button type="text" icon="el-icon-arrow-left" @click="previous">上一页</el-button>
        <el-button style="float: right" type="text" @click="next">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </div>
    </template>


  </el-main>
</template>

<script>
  export default {
    name: "MainContainer",

    inject: ["activeChapter"],


    data() {
      return {
        options: {
          githubToc: {
            tocFirstLevel: 2,
            tocLastLevel: 2,
            tocClassName: 'toc',
            anchorLinkSymbol: '#',
            anchorLinkSpace: true,
            anchorClassName: 'anchor',
            anchorLinkSymbolClassName: 'octicon octicon-link'
          }
        },
        chapterCellItems: this.activeChapter.allChapterCell()
      }
    },

    computed: {
      activeID() {
        return this.activeChapter.activeId
      },
      isActive() {
        return this.activeChapter.isActive()
      },
      chapter() {
        return this.activeChapter.chapter()
      }
    },

    methods: {
      handleExtractHeadline(title) {
        this.activeChapter.chapterCell().headlines.push({title, href: "#" + title})
      },
      previous() {
        const chapter = this.chapter
        if (chapter.previous != null) {
          this.activeChapter.emit(chapter.previous.toString())
        }
      },
      next() {
        const chapter = this.chapter
        if (chapter.next != null) {
          this.activeChapter.emit(chapter.next.toString())
        }
      }
    },

    directives: {
      extract: {
        bind(el, binding, vnode) {
          const markdownItVue = vnode.componentInstance
          const extract = binding.value

          markdownItVue.use(function markdownItTitle(md) {
            const originalHeadingOpen = md.renderer.rules.heading_open

            md.renderer.rules.heading_open = function (tokens, idx) {
              const tagToken = tokens[idx]
              const token = tokens[idx + 1]
              const level = parseInt(tagToken.tag.substr(1))

              if (level === 2) {
                let title = token.children
                  .filter(t => ['text', 'code_inline'].includes(t.type))
                  .reduce((acc, t) => acc + t.content, '')

                extract(title)
              }

              return originalHeadingOpen.apply(this, arguments)
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .layout-main-wrapper {
    padding: 0 0 2rem 20rem;
    display: block;
  }

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