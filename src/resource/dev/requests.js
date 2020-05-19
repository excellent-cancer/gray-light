/**
 * 模拟服务器回复
 */
import {randomChinese} from './shared'

import Requests from "@/utils/requests";
import ContentTable from './chapter-content'

export default class DevRequests extends Requests {

  /**
   * 随机返回指定数目的仓库
   *
   * @param tokens
   * @param from
   * @param count
   * @returns {Promise<[]>}
   */
  documentRepositoriesSet(tokens, from, count) {
    const repositories = []
    for (let i = 0; i < count; i++) {
      repositories.push({
        id: i + from,
        title: (i + from) + randomChinese(10, 16),
        description: randomChinese(50, 100)
      })
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(repositories), 2000)
    })
  }

  /**
   * 返回文档具体章节与题目数
   *
   * @param tokens
   * @param id
   */
  documentRepository(tokens, id) {
    console.log(id)
    return Promise.resolve([
      {
        data: {
          id: 1,
          title: "动态规划",
          folder: "CHAPTER",
        },
        chapters: [
          {
            data: {id: 1, title: "按既定顺序创建目标数组", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"}
          },
          {
            data: {id: 2, title: "最长快乐前缀", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"}
          }
        ],
      },
      {
        data: {
          id: 2,
          title: "搜索",
          folder: "CHAPTER",
        },
        chapters: [
          {
            data: {id: 3, title: "检查网格中是否存在有效路径", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"}
          },
          {
            data: {id: 4, title: "最大得分的路径数目", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"}
          }
        ]
      }
    ])
  }

  /**
   * 根据目录ID，获取该目录下的所有文章
   *
   * @deprecated
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
    return Promise.resolve(ContentTable[chapterId])
  }
}
