import MarkdownItVue from './markdown-it-vue'
import Vue from 'vue'

Vue.component(MarkdownItVue.name, MarkdownItVue)

Vue.prototype.$markdown = {}

Vue.prototype.$markdown.request = function(id, content) {
  return {
    id,
    content
  }
}