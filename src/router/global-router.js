import VueRouter from 'vue-router'
import Vue from 'vue'

// import TopLayout from '../modules/docs/components/TopLayout.vue'
import Home from '../Home.vue'
import LayoutContainer from "../modules/docs/components/LayoutContainer";

Vue.use(VueRouter)

const globalRouter = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/user', component: LayoutContainer }
  ]
})

export default globalRouter