import AlignCenterLayout from "@/components/AlignCenterLayout";
import BlogHome from "@/modules/blog/component/BlogHome";
import BlogGuide from "@/modules/blog/component/BlogGuide";
import {applyStatus} from "@/modules/blog/mixins/shared-blog";
import BlogStatus from "@/modules/blog/shared/blog-status";
import Article from "@/modules/blog/component/Article"
import ArticleGuide from "@/modules/blog/component/ArticleGuide";

export default {
  path: '/blog',
  component: AlignCenterLayout,
  children: [
    {
      path: '/',
      components: {
        default: BlogHome,
        right: BlogGuide
      },
      beforeEnter(to, from, next) {
        BlogStatus.create(1)
          .then(status => {
            applyStatus(to, status)
            next()
          })
          .catch(error =>
            next(Error(error))
          )
      }
    },
    {
      path: ':id',
      props: true,
      components: {
        right: ArticleGuide,
        default: Article
      },
      beforeEnter(to, from, next) {
        BlogStatus.createForOne(to.params.id)
          .then(status => {
            to.params.status = status
            next()
          })
          .catch(error =>
            next(Error(error))
          )
      }
    }
  ]
}