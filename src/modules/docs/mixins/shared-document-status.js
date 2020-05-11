export default {

  beforeRouteEnter(to, from, next) {
    next(
      vm => {
        vm.sharedDocument.status = to.params.documentStatus
        window.documentStatus = to.params.documentStatus
      }
    )
  },

  beforeRouteUpdate(to, from, next) {
    this.vm.sharedDocument.status.reset(to.params.id)
      .then(
        () => {
          next()
        }
      )
      .cache(error => next(Error(error)))
  },

  data() {
    return {
      sharedDocument: {
        status: null
      }
    }
  },

  computed: {
    status() {
      return this.sharedDocument.status
    }
  },

  provide() {
    return {
      sharedDocument: this.sharedDocument
    }
  }

}