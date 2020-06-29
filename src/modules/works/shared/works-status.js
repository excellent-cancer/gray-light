
import Vue from 'vue'

//const tokens =  Vue.prototype.$tokens
// const requests = Vue.prototype.$requests

function requests() {
  return Vue.prototype.$requests
}

export default class WorksStatus {


  constructor() {
    this.worksItems = []
    this.worksSelected = 0
    this.worksSelectedItem = null
  }

  setWorksSelected(selected) {
    this.worksSelected = selected
    this.worksSelectedItem = this.worksItems[selected]
  }

  getWorksSelectedIndex() {
    return this.worksSelected
  }

  getWorksSelectedItem() {
    return this.worksSelectedItem
  }

  // http请求

  fetchWorks() {
    return requests()
      .fetchWorks()
      .then(worksItems => {
        this.worksItems = worksItems
        this.setWorksSelected(0)
      })
  }

  static create() {
    return new Promise((resolve) => {
      let status = new WorksStatus()

      status.fetchWorks().then(() => resolve(status))
    })

  }

}