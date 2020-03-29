import Vue from 'vue'
// import App from './App.vue'

/** 加载插件 **/

import './plugins/element'
import './plugins/coverflow/'
import './plugins/transitions'
import './plugins/markdown-it-vue'

/** 设置Vue对象 **/

import Settings from "./utils/settings";
import runSettings from '././resource/dev/settings'

Vue.config.productionTip = false
Vue.prototype.$settings = Settings.fromJson(runSettings)

import router from './router/global-router'

new Vue({
  router,
  render(h) {
    return h('div', { attrs: { id: 'app' }}, [ h('RouterView') ])
  }
}).$mount('#app')
