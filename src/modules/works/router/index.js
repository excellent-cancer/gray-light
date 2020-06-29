import AlignCenterLayout from "@/components/AlignCenterLayout";
import WorksGuide from "@/modules/works/component/WorksGuide";
import WorksOverview from "@/modules/works/component/WorksOverview";
import WorksStatus from "@/modules/works/shared/works-status";

import {applyStatus} from "@/modules/works/mixins/shared-works";

export default {
  path: '/works',
  component: AlignCenterLayout,
  children: [
    {
      path: '/',
      components: {
        default: WorksOverview,
        left: WorksGuide
      },
      props: true,
      beforeEnter(to, from, next) {
        WorksStatus.create()
          .then(status => {
            applyStatus(to, status)
            next()
          })
          .catch(error =>
            next(Error(error))
          )
      }
    }
  ]
}