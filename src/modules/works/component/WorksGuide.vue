<template>
  <v-navigation-drawer permanent v-if="isLoadedShared">
    <v-list nav dense>
      <v-list-item-group v-model="selected">
        <v-list-item
                v-for="item in worksItems"
                :key="item.id"
                link
                active-class="white--text black">
          <v-list-item-content>
            <v-list-item-title class="repository-title">{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

  import SharedWorks from "@/modules/works/mixins/shared-works"

  export default {
    name: "WorksGuide",

    mixins: [SharedWorks],

    computed: {
      worksItems() {
        return this.isLoadedShared ? this.status.worksItems : []
      },

      selected: {
        get() {
          return this.isLoadedShared ? this.status.getWorksSelectedIndex() : 0
        },
        set(i) {
          if (this.isLoadedShared) {
            this.status.setWorksSelected(i)
          }
        }
      }
    }
  }
</script>

<style scoped>

  .repository-title {
    font-size: 15px;
    font-weight: 700;
  }

</style>