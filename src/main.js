import Vue from 'vue'
// import App from './App.vue'

/** 加载插件 **/

import './plugins/element'
import './plugins/coverflow/'
import './plugins/transitions'
import './plugins/markdown-it-vue'

/** 设置Vue对象 **/

import Settings from "./utils/settings";
import Requests from "@/utils/requests";
import Tokens from "@/utils/tokens";
import Hooks from "@/utils/hooks"
import runSettings from '@/resource/dev/settings'

Vue.config.productionTip = false
Vue.prototype.$settings = Settings.settingsFromJson(runSettings)
Vue.prototype.$requests = Requests.requestsFromProfile(runSettings.meta)
Vue.prototype.$tokens = Tokens.tokensFromPolicy()
Vue.prototype.$hooks = Hooks.hooksFromProfile(runSettings.meta, Vue)

import router from './router/global-router'
import App from './components/App.vue'

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
