import BaseLayout from "@/components/BaseLayout";
import RepositoryOverviewPage from "@/modules/note/pages/RepositoryOverviewPage";
import CatalogsViewPage from "@/modules/note/pages/CatalogsViewPage";
import HeadlineViewPage from "@/modules/note/pages/HeadlineViewPage";
import ChapterContentPage from "@/modules/note/pages/ChapterContentPage";
import NoteStatus from "@/modules/note/shared/note-status";

export default {

  path: "/note",

  component: BaseLayout,

  children: [
    {
      path: '/',
      components: {
        default: RepositoryOverviewPage
      }
    },
    {
      path: ':id',
      props: true,
      components: {
        left: CatalogsViewPage,
        right: HeadlineViewPage,
        default: ChapterContentPage
      },
      beforeEnter(to, from, next) {
        NoteStatus.create(to.params.id)
          .then(
            status => {
              to.params.documentStatus = status
              next()
            }
          )
          .catch(
            error =>
              next(Error(error))
          )
      }
    }
  ]

}