/**
 * 模拟服务器回复
 */

import $ from 'jquery'
import Requests from "@/utils/requests";
import ContentTable from '../dev/chapter-content'

export default class DevRequests extends Requests {

  /**
   * 随机返回指定数目的仓库
   *
   * @param tokens
   * @param pages
   * @param count
   * @returns {Promise<[]>}
   */
  documentRepositoriesSet(tokens, pages, count) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/owner/docs?pages=${pages}&count=${count}`,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        success: response => this.$extractData(response, resolve, reject),
        error(xhr, errorType, error) {
          reject('Ajax request error, errorType: ' + errorType + ', error: ' + error)
        }
      })
    })
  }

  /**
   * 返回文档具体章节与题目数
   *
   * @param tokens
   * @param id
   */
  documentRepository(tokens, id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `http://localhost:8080/owner/docs/tree?id=${id}`,
        type: 'get',
        dataType: 'json',
        contentType: "application/json",
        success: response => this.$extractData(response, resolve, reject),
        error(xhr, errorType, error) {
          reject('Ajax request error, errorType: ' + errorType + ', error: ' + error)
        }
      })
    })
  }

  /**
   * 根据目录ID，获取该目录下的所有文章
   *
   * @param tokens
   * @param catalogsId
   * @returns {Promise<({id: number, title: string}|{id: number, title: string})[]>|Promise<*[]>|Promise<{id: number, title: string}[]>}
   */
  documentChapters(tokens, catalogsId) {
    if (catalogsId === 1) {
      return new Promise(resolve => {
        setTimeout(
          () => resolve([
            {id: 1, title: "按既定顺序创建目标数组", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"},
            {id: 2, title: "最长快乐前缀", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"}
          ]),
          2000
        )
      })
    }
    if (catalogsId === 2) {
      return new Promise(resolve => {
        setTimeout(
          () => resolve([
            {id: 3, title: "检查网格中是否存在有效路径", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"},
            {id: 4, title: "最大得分的路径数目", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"}
          ]),
          2000
        )
      })
    }
    return Promise.resolve([])
  }

  /**
   * 根据文章ID，返回文章内容
   *
   * @param tokens
   * @param chapterId
   * @returns {Promise<unknown>}
   */
  documentChapterContent(tokens, chapterId) {
    chapterId = Number(chapterId) % 4
    return Promise.resolve(ContentTable[chapterId + 1])
  }
}

