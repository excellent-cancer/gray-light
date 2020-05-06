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
        title: (i + from) + getRandomName(randomAccess(10, 16)),
        description: getRandomName(randomAccess(50, 100))
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
        id: 1,
        title: "动态规划",
        folder: "CHAPTER"
      },
      {
        id: 2,
        title: "搜索",
        folder: "CHAPTER"
      }
    ])
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
            {id: 3, title: "检查网格中是否存在有效路径", createdDate: "2020-3-17 20:54:07", updatedDate: "2020-3-17 20:54:07"}
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

function randomAccess(min, max) {
  return Math.floor(Math.random() * (min - max) + max)
}

// 解码
function decodeUnicode(str) {
  //Unicode显示方式是\u4e00
  str = "\\u" + str
  str = str.replace(/\\/g, "%");
  //转换中文
  str = unescape(str);
  //将其他受影响的转换回原来
  str = str.replace(/%/g, "\\");
  return str;
}

/*
*@param Number NameLength 要获取的名字长度
*/
function getRandomName(NameLength) {
  let name = ""
  for (let i = 0; i < NameLength; i++) {
    let unicodeNum = ""
    unicodeNum = randomAccess(0x4e00, 0x9fa5).toString(16)
    name += decodeUnicode(unicodeNum)
  }
  return name
}