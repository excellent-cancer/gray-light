<script>
  export default {
    name: "MarkdownItOverride",

    props: {
      chapterCell: Object
    },


    render(h) {
      const chapterCell = this.chapterCell
      const cache = this.cache || (this.cache = {})

      if (this.chapterCell != null) {
        if (cache[chapterCell.id] == null) {
          let options = {
            key: chapterCell.id,
            props: {
              content: chapterCell.content
            },
            class: ["main-markdown"],
            directives: [
              {
                name: "extract",
                value: this.handleExtractHeadline
              }
            ]
          }

          cache[chapterCell.id] = h("markdown-it-vue", options)
        }

        return cache[chapterCell.id]
      } else {
        return null
      }
    },

    methods: {
      handleExtractHeadline(title) {
        this.chapterCell.headlines.push({title, href: "#" + title})
      }
    },

    directives: {
      extract: {
        bind(el, binding, vnode) {
          const markdownItVue = vnode.componentInstance
          const extract = binding.value

          if (!markdownItVue.extracted) {
            console.log("bind")
            markdownItVue.$watch("content", console.log)
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

                  // vm.headlines.push({title, href: "#" + title})
                }

                return originalHeadingOpen.apply(this, arguments)
              }
            })
            markdownItVue.extracted = true
          }

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
</style>