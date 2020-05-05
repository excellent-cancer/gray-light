import ResorucesUtils from '@/utils/resource-utils'

const FILE_NAME = "requests"

export default class Requests {

  constructor(settings) {
    this.settings = settings
  }

  static requestsFromProfile(settings) {
    const profile = settings.profile
    const ProfileRequests = ResorucesUtils.loadResource(profile, FILE_NAME)

    return new ProfileRequests(settings)
  }

  // 请求封装

  /**
   * 根据用户信息，获取文档仓库
   *
   * @param tokens
   * @param from
   * @param count
   */
  documentRepositories(tokens, from, count) {
    unsupported(tokens, from, count)
  }
}

function unsupported() {
  throw new Error("This function is unsupported")
}
