/**
 * 封装文档相关的服务器交互功能
 */

/**
 * 组件路由守卫函数，用于路由到组件前加载文档仓库。
 * 指定的文档仓库是由路由参数Id提供的，即to.params.id
 *
 * @param to
 * @param from
 * @param next
 */
export function loadDocsRepositoryWhenRouting(to, from, next) {
  const tokens = to.meta.tokens
  const requests = to.meta.requests

  requests.documentRepository(tokens, to.params.id)
    .then(
      result =>
        next(
          vm =>
            vm.acceptCatalogs(result)
        )
    )
}