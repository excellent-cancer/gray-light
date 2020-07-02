export default class ArticleStore {

  constructor(manager) {
    this.manager = manager
    this.loaded = false
    this.headlines = []
    this.content = null
    this.scrollId = null
    this.callback = null
  }

  downloadLink() {
    throw Error()
  }

  loadContent() {
    this.manager.requests.loadContent(this.downloadLink())
      .then(content => {
        this.content = content
        this.loaded = true
        if (this.callback != null) {
          this.callback(this)
          this.callback = null
        }
      })
  }

  get isLoaded() {
    return this.loaded
  }

  acceptHeadlines(headlines) {
    for (let h of headlines) {
      this.headlines.push(h)
    }
  }

  ifLoaded(callback) {
    if (this.loaded) {
      callback(this)
    } else {
      this.callback = callback
    }
  }

  scrollTo(scroll) {
    this.scrollId = scroll == null ? null : scroll.id
  }

}