import Requests from "@/utils/requests";

export default class DevRequests extends Requests {

  /**
   * 随机返回指定数目的仓库
   *
   * @param tokens
   * @param from
   * @param count
   * @returns {Promise<[]>}
   */
  documentRepositories(tokens, from, count) {
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

}

function randomAccess(min,max){
  return Math.floor(Math.random() * (min - max) + max)
}

// 解码
function decodeUnicode(str) {
  //Unicode显示方式是\u4e00
  str = "\\u"+str
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
function getRandomName(NameLength){
  let name = ""
  for(let i = 0;i<NameLength;i++){
    let unicodeNum  = ""
    unicodeNum = randomAccess(0x4e00,0x9fa5).toString(16)
    name += decodeUnicode(unicodeNum)
  }
  return name
}