/**
 * 模拟服务器回复
 */
import {randomChinese} from './shared'

import Requests from "@/utils/requests";
import ContentTable from './chapter-content'

window.$ = require("jquery")

window.dddd = function (url) {
  var xhr = new XMLHttpRequest();


  xhr.open('GET', url, true);//get请求，请求地址，是否异步
  xhr.withCredentials = true;
  xhr.responseType = "blob";    // 返回类型blob
  xhr.onload = function () {// 请求完成处理函数
    if (this.status === 200) {
      var blob = this.response;// 获取返回值
      console.log(blob)
    }
  };


  /*  xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*!/!*;q=0.8,application/signed-exchange;v=b3;q=0.9")
    xhr.setRequestHeader("Accept-Encoding", "gzip, deflate")
    xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7")
    xhr.setRequestHeader("Cache-Control", "no-cache")
    xhr.setRequestHeader("Connection", "keep-alive")
    xhr.setRequestHeader("Host", "192.168.1.12:8080")
    xhr.setRequestHeader("Pragma", 'no-cache')
    xhr.setRequestHeader("Upgrade-Insecure-Requests", 1)*/

// 发送ajax请求
  xhr.send();
}

export default class DevRequests extends Requests {


  fetchWorks() {
    return Promise.resolve([
      {
        id: 7,
        ownerId: 1,
        createdDate: 1593164361000,
        updatedDate: 1593164361000,
        name: "floor-library-doc",
        scope: "works",
        description: "floor-library的文档库",
        homePage: "https://github.com/excellent-cancer/floor-library-docs"
      },
      {
        id: 8,
        ownerId: 1,
        createdDate: 1593164990000,
        updatedDate: 1593164990000,
        name: "floor-library-doc",
        scope: "works",
        description: "floor-library的文档库",
        homePage: "https://github.com/excellent-cancer/floor-library-docs"
      },
      {
        id: 9,
        ownerId: 1,
        createdDate: 1593165910000,
        updatedDate: 1593165910000,
        name: "floor-library-doc",
        scope: "works",
        description: "floor-library的文档库",
        homePage: "https://github.com/excellent-cancer/floor-library-docs"
      },
      {
        id: 10,
        ownerId: 1,
        createdDate: 1593166090000,
        updatedDate: 1593166090000,
        name: "floor-library-doc",
        scope: "works",
        description: "floor-library的文档库",
        homePage: "https://github.com/excellent-cancer/floor-library-docs"
      }

    ])
  }

  fetchWorksPage(pages, count) {
    return this.fetchWorks(pages, count)
  }

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
   * @param chapterData
   * @returns {Promise<unknown>}
   */
  documentChapterContent(tokens, chapterData) {
    return Promise.resolve(ContentTable[chapterData.id])
  }
}
