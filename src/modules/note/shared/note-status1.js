import ArticleStore from "@/utils/article-manager/article-store";
import ArticleManager from "@/utils/article-manager/article-manager";
//import Vue from 'vue'


class NoteStore extends ArticleStore {

  constructor(manager, note) {
    super(manager);
    this.note = note
  }

  downloadLink() {
    return this.note.data.downloadLink
  }

  get createdDate() {
    return new Date(this.note.data.createdDate).toLocaleString()
  }

  get updatedDate() {
    return new Date(this.note.data.updatedDate).toLocaleString()
  }

  get id() {
    return this.note.data.uid
  }

}

class NoteStatus extends ArticleManager {

  constructor(requests) {
    super(requests);
    this.on("reset", this.applyReset.bind(this))
  }

  createStore(note) {
    return new NoteStore(this, note)
  }

  applyReset(noteId, catalogs) {
    this.noteId = noteId
    this.catalogs = catalogs
  }

  setActiveChapter(note) {
    if (note == null) {
      this.activeArticleId = null
    } else {
      this.setActive(note.data.uid)
    }
  }

  isActiveChapter(note) {
    return this.isActive(note.data.uid)
  }

  existsActiveChapter() {
    return this.existsActive()
  }

  getActiveChapterStore() {
    return this.getActiveStore()
  }

  getChapterStore(id) {
    return this.getStore(id)
  }
}

