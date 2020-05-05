export default {

  loadResource(profile, file) {
    return require(`@/resource/${profile}/${file}`).default
  }


}