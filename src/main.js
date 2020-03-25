import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import Transitions from 'vue2-transitions'
import coverflow from 'vue-coverflow'

Vue.component(coverflow.name, coverflow)
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Transitions)

new Vue({
  render: h => h(App),
}).$mount('#app')
