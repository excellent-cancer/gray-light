export default {

  beforeRouteEnter(to, from, next) {
    next(vm => vm.sharedBlogs.status = to.params.status)
  },

  beforeRouteUpdate(to, from, next) {
    this.vm.sharedBlogs.status.reset(to.params.id)
      .then(next)
      .cache(next)
  },

  data() {
    return {
      sharedBlogs: {
        status: null
      }
    }
  },

  computed: {
    status() {
      return this.sharedBlogs.status
    },
    isLoadedShared() {
      return this.sharedBlogs.status != null
    }
  },

  provide() {
    return {
      sharedBlogs: this.sharedBlogs
    }
  }

}

export function applyStatus(to, status) {
  to.params.status = status
}