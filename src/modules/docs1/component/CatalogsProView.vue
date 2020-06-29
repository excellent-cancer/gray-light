<template>
  <v-list dense >
    <catalogs-pro-item-view v-for="(c, i) in catalogs"
                            :key="i"
                            :catalog="c">
    </catalogs-pro-item-view>

  </v-list>
</template>

<script>
  import CatalogsProItemView from "@/modules/docs/component/CatalogsProItemView";

  export default {
    name: "CatalogsProView",
    components: {CatalogsProItemView},
    props: {
      /**
       * catalogs = [
       *  { id: 1, title: "标题", folder: "" }
       * ]
       */
      catalogs: {
        type: Array,
        default() {
          return Array.of()
        }
      }
    },

    data() {
      return {
        items: [
          {
            action: 'local_activity',
            title: 'Attractions',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'restaurant',
            title: 'Dining',
            active: true,
            items: [
              { title: 'Breakfast & brunch' },
              { title: 'New American' },
              { title: 'Sushi' },
            ],
          },
          {
            action: 'school',
            title: 'Education',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'directions_run',
            title: 'Family',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'healing',
            title: 'Health',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'content_cut',
            title: 'Office',
            items: [
              { title: 'List Item' },
            ],
          },
          {
            action: 'local_offer',
            title: 'Promotions',
            items: [
              { title: 'List Item' },
            ],
          },
        ],
      }
    }
  }
</script>

<style scoped>

</style>