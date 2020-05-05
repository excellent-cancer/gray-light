import Vue from "vue"
import VueRouter from "vue-router"

import Home from "@/modules/home/Home.vue"
import DocumentLayout from "@/modules/docs/components/DocumentLayout"
import RepositoriesContainer from "@/modules/docs/components/RepositoriesContainer"

Vue.use(VueRouter)

const globalRouter = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/docs-repo/', component: RepositoriesContainer },
    { path: '/document/:id', component: DocumentLayout }
  ]
})

export default globalRouter