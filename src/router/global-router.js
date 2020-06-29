import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/modules/home/Home.vue"
import DocsRouter from '@/modules/docs/router'
import WorksRouter from '@/modules/works/router'
import BlogRouter from '@/modules/blog/router'
import NoteRouter from '@/modules/note/route'

export default function initRouter(meta) {
  Vue.use(VueRouter)

  const routerOptions = {
    routes: [
      {path: '/', component: Home, meta},
      WorksRouter,
      DocsRouter,
      BlogRouter,
      NoteRouter
    ]
  }

  return new VueRouter(routerOptions)
}
