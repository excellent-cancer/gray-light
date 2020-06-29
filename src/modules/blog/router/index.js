import AlignCenterLayout from "@/components/AlignCenterLayout";
import BlogHome from "@/modules/blog/component/BlogHome";
import BlogGuide from "@/modules/blog/component/BlogGuide";

export default {
  path: '/blog',
  component: AlignCenterLayout,
  children: [
    {
      path: '/',
      components: {
        default: BlogHome,
        right: BlogGuide
      }
    }/*,
    {
      path: '/article',
      components: {
        default:
      }
    }*/
  ]
}