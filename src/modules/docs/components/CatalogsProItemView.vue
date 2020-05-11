<template>

  <v-list-item v-if="isEmptyGroup">
    <v-list-item-content>
      <v-list-item-title v-text="catalog.title"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>

  <sub-catalogs-item-view v-else :catalog="catalog"></sub-catalogs-item-view>

</template>

<script>
  import SubCatalogsItemView from "@/modules/docs/components/SubCatalogsItemView";

  export default {
    name: "CatalogsPreItemView",

    props: {
      catalog: Object,
    },

    computed: {
      isEmptyGroup() {
        return this.catalog.folder === "EMPTY"
      }
    },

    components: {
      SubCatalogsItemView,
    }
  }
</script>

<style scoped>

</style>