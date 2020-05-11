import Vue from 'vue'
import App from "@/components/App"

/** 加载插件 **/

import './plugins/element'
import './plugins/coverflow/'
import './plugins/transitions'
import './plugins/markdown-it/'
import './plugins/scroll-to/'

/** 设置Vue对象 **/

import Settings from "./utils/settings";
import Requests from "@/utils/requests";
import Tokens from "@/utils/tokens";
import Hooks from "@/utils/hooks"
import runSettings from '@/resource/dev/settings'

const meta = {
  settings: Settings.settingsFromJson(runSettings),
  requests: Requests.requestsFromProfile(runSettings.meta),
  tokens: Tokens.tokensFromPolicy(),
  hooks: Hooks.hooksFromProfile(runSettings.meta, Vue)
}

Vue.config.productionTip = false
Vue.prototype.$settings = meta.settings
Vue.prototype.$requests = meta.requests
Vue.prototype.$tokens = meta.tokens
Vue.prototype.$hooks = meta.hooks

import initRouter from './router/global-router'

import $ from 'jquery'
import vuetify from './plugins/vuetify';

window.jquery = $

new Vue({
  router: initRouter(meta),
  vuetify,
  render: h => h(App)
}).$mount("#app")
