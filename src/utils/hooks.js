import ResourceUtils from './resource-utils'

const FILE_NAME = "hooks"

const EVENTS = {
  LOAD_OWNER_DETAIL: "loadOwnerDetails"
}

const Hooks = {
  hooksFromProfile(settings, Vue) {
    const options = { methods: {} }
    for (let event of Object.values(EVENTS)) {
      options.methods[event] = function () {
        this.$emit(event, ...arguments)
      }
    }

    const eventBus = new Vue(options)
    const register = ResourceUtils.loadResource(settings.profile, FILE_NAME)

    // 注册事件
    register(EVENTS, eventBus)

    return eventBus;
  }
}



export default Hooks