/**
 * 在文档页面中，一些组件需要共享激活的文档信息，例如文档状态、内容渲染缓存、markdown标题解析等。
 *
 * ActiveChapter封装相关功能
 */
import Vue from 'vue'


export default class DocumentStatus {

  constructor() {
    this.events = new Vue()
  }

  reset(repositoryId) {
    // todo
    const tokens = this.events.$tokens
    const requests = this.events.$requests

    return new Promise((resolve, reject) => {

      requests.documentRepository(tokens, repositoryId)
        .then(catalogs => {
          prototypeIt(this, repositoryId, catalogs)
          resolve()
        })
        .catch(reject)
    })
  }

  setActiveChapter(chapter) {
    if (chapter == null) {
      this.activeChapterId = null
    } else {
      if (this.chapterStoreHash[chapter.id] == null) {
        this.chapterStoreItems.push(new ChapterStore(chapter))
        this.chapterStoreHash[chapter.id] = this.chapterStoreItems.length - 1
      }

      this.activeChapterId = chapter.id
    }

  }

  isActiveChapter(chapter) {
    return this.activeChapterId === chapter.id
  }

  existsActiveChapter() {
    return this.activeChapterId != null
  }

  getActiveChapterStore() {
    return this.getChapterStore(this.activeChapterId)
  }

  getChapterStore(id) {
    return this.chapterStoreHash[id] != null ? this.chapterStoreItems[this.chapterStoreHash[id]] : null
  }

  static create(repositoryId) {
    let status = new DocumentStatus()


    return new Promise((resolve, reject) => {
      status.reset(repositoryId)
        .then(() => resolve(status))
        .catch(reject)
    })
  }
}

class ChapterStore {

  constructor(chapter) {
    this.chapter = chapter
    this.loaded = false
    this.headlines = []
    this.content = null
    this.scrollId = null

    const tokens = Vue.prototype.$tokens
    const requests = Vue.prototype.$requests

    requests.documentChapterContent(tokens, chapter.id)
      .then(content => {
        this.content = content
        this.loaded = true
        if (this.callback != null) {
          this.callback(this)
          this.callback = null
        }
      })
      //.finally(() => this.loaded = true)
  }

  get isLoaded() {
    return this.loaded
  }

  get createdDate() {
    return this.chapter.createdDate
  }

  get updatedDate() {
    return this.chapter.updatedDate
  }

  get id() {
    return this.chapter.id
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

function prototypeIt(status, repositoryId, catalogs) {
  status.repositoryId = repositoryId
  status.catalogs = catalogs
  status.activeChapterId = null
  status.chapterStoreHash = {}
  status.chapterStoreItems = []


}