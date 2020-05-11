import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/modules/home/Home.vue"
import DocsRouter from '@/modules/docs/router'

export default function initRouter(meta) {
  Vue.use(VueRouter)

  const routerOptions = {
    routes: [
      {path: '/', component: Home, meta},
      DocsRouter
    ]
  }

  return new VueRouter(routerOptions)
}
