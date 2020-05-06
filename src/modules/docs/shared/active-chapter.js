/**
 * 在文档页面中，一些组件需要共享激活的文档信息，例如文档状态、内容渲染缓存、markdown标题解析等。
 *
 * ActiveChapter封装相关功能
 */


export default class ActiveChapter {
  constructor(loadChapterContent, on, emit) {
    this.activeId = null
    this.loadChapterContent = loadChapterContent
    this.chapterTable = {}
    this.chapterCellItems = []
    this.on = on
    this.emit = emit
  }

  inactive() {
    this.activeId = null
  }

  isActive(id) {
    return arguments.length > 0 ? id === this.activeId : this.activeId != null
  }

  initActiveId(activeId, chapter, callback) {
    this.loadChapterContent(activeId, chapter)
      .then(
        () => {
          callback()
          this.activeId = activeId
        }
      )
  }

  setActiveId(activeId) {
    this.activeId = activeId
  }

  headlines(id) {
    return this.chapterCellItems[this.chapterTable[id]].headlines
  }

  content() {
    return this.chapterCellItems[this.chapterTable[this.activeId]].content
  }

  cacheContent(activeID, chapter, content) {
    let index = this.chapterTable[activeID]
    if (index != null) {
      let chapterCell = this.chapterCellItems[index]

      chapterCell.id = activeID
      chapterCell.content = content
      chapterCell.headlines = []
      chapterCell.chapter = chapter
    } else {
      let chapterCell = {}

      chapterCell.id = activeID
      chapterCell.content = content
      chapterCell.headlines = []
      chapterCell.chapter = chapter

      this.chapterCellItems.push(chapterCell)
      this.chapterTable[activeID] = this.chapterCellItems.length - 1
    }
  }

  hash(catalog, chapter) {
    return catalog.id*31 + chapter.id
  }

  chapterCell() {
    return this.activeId != null ? this.chapterCellItems[this.chapterTable[this.activeId]] : null
  }

  allChapterCell() {
    return this.chapterCellItems
  }

  chapter() {
    return this.chapterCell().chapter
  }

}