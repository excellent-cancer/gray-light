export default {

  loadResource(profile, file) {
    return require(`@/resource/${profile}/${file}`).default
  },


  paramsToString(params) {
    return Object.entries(params).map(entry => `${entry[0]}=${entry[1]}`).join("&")
  }

}