/**
 * 简单实现身份保存
 */
class Tokens {

  constructor() {
    this.tokensValues = new Map()
    this.saveUserId(1)
  }

  saveUserId(id) {
    this.tokensValues.set("user_id", id)
  }

  getUserId() {
    return this.tokensValues.get("user_id")
  }

  static tokensFromPolicy() {
    return new Tokens()
  }

}

export default Tokens