<template>
  <v-navigation-drawer clipped app width="20rem">
    <ul class="catalogs-container">

      <catalogs-item-view v-for="(c, i) in catalogs"
                          :key="i"
                          :catalog="c">
      </catalogs-item-view>
    </ul>
  </v-navigation-drawer>
</template>

<script>
  import CatalogsItemView from "@/modules/docs/components/CatalogsItemView";
  import SharedDocumentStatus from "@/modules/docs/mixins/shared-document-status"

  export default {
    name: "CatalogsView",

    mixins: [SharedDocumentStatus],

    computed: {
      catalogs() {
        return this.sharedDocument.status == null ? [] : this.sharedDocument.status.catalogs
      }
    },

    components: {
      CatalogsItemView
    }
  }
</script>

<style scoped>
  .catalogs-container {
    padding: 1.5rem 0;
    margin: 0;
    list-style-type: none;
    line-height: 1.7;
  }
</style>