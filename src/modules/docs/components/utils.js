export default {

  md() {
    const Config = require('markdown-it-chain')

    const config = new Config()

    config.plugin("highlight-lines")
      .use(require('./hightline'))
      .end()

    return config.toMd(require('markdown-it'))
  }

}