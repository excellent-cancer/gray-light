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
   * @param pages
   * @param count
   */
  documentRepositoriesSet(tokens, pages, count) {
    unsupported(tokens, pages, count)
  }

  /**
   * 根据用户信息与文档仓库id，获取具体文档仓库
   *
   * @param tokens
   * @param id 文档仓库Id
   */
  documentRepository(tokens, id) {
    unsupported(tokens, id)
  }

  /**
   *
   *
   * @param tokens
   * @param catalogsId
   */
  documentChapters(tokens, catalogsId) {
    unsupported(tokens, catalogsId)
  }

  documentChapterContent(tokens, chapterId) {
    unsupported(tokens, chapterId)
  }


  $extractData(response, resolve, reject) {
    let code = String(response.code)
    switch (code) {
      case "0":
        return resolve(response.data)
      default:
        return reject(response.msg)
    }
  }

}

function unsupported() {
  throw new Error("This function is unsupported")
}
