import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/modules/home/Home.vue"
import DocumentLayout from "@/modules/docs/components/DocumentLayout"
import RepositoriesContainer from "@/modules/docs/components/RepositoriesContainer"



export default function initRouter(meta) {
  Vue.use(VueRouter)

  const routerOptions = {
    routes: [
      {path: '/', component: Home, meta },
      {path: '/docs-repo/', component: RepositoriesContainer, meta },
      {path: '/document/:id', component: DocumentLayout, meta }
    ]
  }

  return new VueRouter(routerOptions)
}
