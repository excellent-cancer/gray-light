import Events from 'events'


export default class ArticleManager extends Events {

  constructor(requests) {
    super()
    this.requests = requests
    this.on("reset", reset.bind(this))
  }

  /**
   *
   * @param input
   * @return {ArticleStore}
   */
  createStore(input) {
    throw Error(input)
  }

  setActive(id, input) {
    if (this.articleStoreHash[id] == null) {
      let store = this.createStore(input)
      store.loadContent()
      this.articleStoreItems.push(store)
    }

    this.activeArticleId = id
  }

  isActive(id) {
    return this.activeArticleId === id
  }

  existsActive() {
    return this.activeArticleId != null
  }

  getActiveStore() {
    return this.getStore(this.activeArticleId)
  }

  getStore(id) {
    return this.articleStoreHash[id] != null ? this.articleStoreItems[this.articleStoreHash[id]] : null
  }

}

function reset() {
  this.activeArticleId = null
  this.articleStoreHash = {}
  this.articleStoreItems = []
}