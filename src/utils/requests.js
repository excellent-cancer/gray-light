import ResourcesUtils from '@/utils/resource-utils'

const FILE_NAME = "requests"

export default class Requests {

  constructor(settings, tokens) {
    this.settings = settings
    this.tokens = tokens
  }

  static requestsFromProfile(settings, tokens) {
    const profile = settings.profile
    const ProfileRequests = ResourcesUtils.loadResource(profile, FILE_NAME)

    return new ProfileRequests(settings, tokens)
  }

  /**
   * 获取用户的所有works项目
   */
  fetchWorks(pages, count) {
    unsupported(pages, count)
  }

  /**
   * 根据分页获取用户的所有works项目
   */
  fetchWorksPage(pages, count) {
    unsupported(pages, count)
  }

  /**
   * 根据worksId获取works的所有文档
   * @param worksId
   */
  fetchDocumentByWorks(worksId) {
    unsupported(worksId)
  }

  /**
   * 根据docsId获取文档项目结构
   *
   * @param docsId
   */
  fetchDocumentTree(docsId) {
    unsupported(docsId)
  }

  /**
   * 根据分页、worksId获取works的所有文档
   *
   * @param worksId
   * @param pages
   * @param count
   */
  fetchDocumentPageByWorks(worksId, pages, count) {
    unsupported(worksId, pages, count)
  }

  /**
   * 获取笔记
   */
  fetchNote() {
    unsupported()
  }

  /**
   * 根据分页获取笔记
   *
   * @param pages
   * @param count
   */
  fetchNotePage(pages, count) {
    unsupported(pages, count)
  }

  /**
   * 根据noteId获取笔记项目结构
   *
   * @param noteId
   */
  fetchNoteTree(noteId) {
    unsupported(noteId)
  }

  /**
   * 根据使用的tags，返回博客
   *
   * @param tags
   * @param pages
   * @param count
   */
  fetchBlog(tags, pages, count) {
    unsupported(tags, pages, count)
  }

  /**
   * 获取所属者所有用用过的标签
   *
   * @param pages
   * @param count
   */
  fetchTags(pages, count) {
    unsupported(pages, count)
  }

  /**
   * 根据link获取文件内容
   *
   * @param link
   */
  loadContent(link) {
    unsupported(link)
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

  documentChapterContent(tokens, chapterData) {
    unsupported(tokens, chapterData)
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
