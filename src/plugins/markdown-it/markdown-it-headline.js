export default function (md, opts) {

  const originalHeadingOpen = md.renderer.rules.heading_open

  md.renderer.rules.heading_open = function (tokens, idx, options, env, render) {
    const tagToken = tokens[idx]
    const token = tokens[idx + 1]
    const level = parseInt(tagToken.tag.substr(1))

    if (level < opts.level) {
      let title = token.children
        .filter(t => ['text', 'code_inline'].includes(t.type))
        .reduce((acc, t) => acc + t.content, '')

      let id = opts.hash(env.headlines.length + 1)

      tagToken.attrSet("id", id)

      env.headlines.push({ title, level, id })
    }

    return originalHeadingOpen != null ? originalHeadingOpen.apply(this, arguments) : render.renderToken(tokens, idx, options, env, render)
  }

}
