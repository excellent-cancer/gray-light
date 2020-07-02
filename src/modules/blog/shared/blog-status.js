import Vue from 'vue'


function requests() {
  return Vue.prototype.$requests
}

function blogId(blog) {
  return blog == null ? null : blog.blog.id
}

const COUNT = 10

export default class BlogStatus {

  constructor() {
    this.tags = []
    this.blogs = []
    this.blogTotal = 0
    this.blogPages = 0
    this.selectedBlogId = null
    this.selectedBlogItmes = []
    this.selectedBlogHash = {}
  }

  applyBlogs(pageResponse) {
    this.blogs = pageResponse.items
    this.blogTotal = pageResponse.total
    this.blogPages = Math.ceil(pageResponse.total / COUNT)
  }

  applyTags(pageResponse) {
    this.tags = pageResponse.items
  }

  applyReset() {
    this.selectedBlogId = null
    this.selectedBlogItmes = []
    this.selectedBlogHash = {}
  }

  reset(page, count) {
    return Promise.all(Array.of(
      requests().fetchBlogPro(null, page, count).then(response => this.applyBlogs(response)),
      requests().fetchTags().then(response => this.applyTags(response))
    )).then(() => this.applyReset())
  }

  resetOne(id) {
    return requests().fetchOneBlog(id)
      .then(blog => { this.selectBlog(blog)})
  }

  resetBlog(page) {
    requests().fetchBlogPro(null, page, COUNT).then(response => this.applyBlogs(response))
  }

  selectBlog(blog) {
    let id = blogId(blog)
    if (id == null) {
      this.selectedBlogId = null
    } else {
      if (this.selectedBlogHash[id] == null) {
        this.selectedBlogItmes.push(new BlogStore(blog))
        this.selectedBlogHash[id] = this.selectedBlogItmes.length - 1
      }
      this.selectedBlogId = id
    }
  }

  getSelectedBlogStore() {
    return this.getBlogStore(this.selectedBlogId)
  }

  getBlogStore(id) {
    return this.selectedBlogHash[id] != null ? this.selectedBlogItmes[this.selectedBlogHash[id]] : null
  }

  existsSelectedBlog() {
    return this.selectedBlogId != null
  }

  static create(page) {
    let status = new BlogStatus()

    return new Promise(resolve => {
      status.reset(page, COUNT).then(() => resolve(status))
    })
  }


  static createForOne(id) {
    let status = new BlogStatus()

    return new Promise(resolve => {
      status.resetOne(id).then(() => resolve(status))
    })
  }

}

class BlogStore {
  constructor(blog) {
    this.blog = blog
    this.loaded = false
    this.headlines = []
    this.content = null
    this.scrollId = null

    requests().loadContent(blog.blog.downloadLink)
      .then(content => {
        this.content = content
        this.loaded = true
        if (this.callback != null) {
          this.callback(this)
          this.callback = null
        }
      })
  }


  get isLoaded() {
    return this.loaded
  }

  get createdDate() {
    return new Date(this.blog.blog.createdDate).toLocaleString()
  }

  get updatedDate() {
    return new Date(this.blog.blog.updatedDate).toLocaleString()
  }

  get id() {
    return blogId(this.blog)
  }

  acceptHeadlines(headlines) {
    for (let h of headlines) {
      this.headlines.push(h)
    }
  }

  ifLoaded(callback) {
    if (this.loaded) {
      callback(this)
    } else {
      this.callback = callback
    }
  }

  scrollTo(scroll) {
    this.scrollId = scroll == null ? null : scroll.id
  }
}
