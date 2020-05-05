export default function (events, bus) {

  bus.$on(events.LOAD_OWNER_DETAIL, function (callback) {
    const tokens = this.$tokens
    tokens.saveUserId(1)
    callback.call()
  })

}