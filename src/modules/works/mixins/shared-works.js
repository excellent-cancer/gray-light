export default {

  beforeRouteEnter(to, from, next) {
    next(vm => vm.sharedWorks.status = to.params.status)
  },

  beforeRouteUpdate(to, from, next) {
    this.vm.sharedWorks.status.reset(to.params.id)
      .then(next)
      .cache(next)
  },

  data() {
    return {
      sharedWorks: {
        status: null
      }
    }
  },

  computed: {
    status() {
      return this.sharedWorks.status
    },
    isLoadedShared() {
      return this.sharedWorks.status != null
    }
  },

  provide() {
    return {
      sharedWorks: this.sharedWorks
    }
  }

}

export function applyStatus(to, status) {
  to.params.status = status
}