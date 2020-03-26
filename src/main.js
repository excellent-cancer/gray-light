import Vue from 'vue'
import App from './App.vue'

/** 加载插件 **/

import './plugins/element'
import './plugins/coverflow'
import './plugins/transitions'

/** 设置Vue对象 **/

import Settings from "./utils/settings";
import runSettings from '././resource/dev/settings'

Vue.config.productionTip = false
Vue.prototype.$settings = Settings.fromJson(runSettings)

new Vue({
  render: h => h(App),
}).$mount('#app')
