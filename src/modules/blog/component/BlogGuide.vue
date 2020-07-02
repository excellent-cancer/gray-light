<template>
  <v-card v-if="isLoadedShared" height="fit-content">
    <v-navigation-drawer right width="20rem">


      <v-list>
        <v-list-item>
          <v-list-item-avatar size="100">
            <v-img src="https://avatars3.githubusercontent.com/u/21330518?s=60&u=13697a46d7d432b5eedb5cefb1d7ec57c8806f5e&v=4"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">XyParaCrim</v-list-item-title>
            <v-list-item-subtitle>xylome@qq.com</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>


      <v-divider></v-divider>

      <v-subheader class="mb-0" style="height: 32px">
        <v-icon>mdi-domain</v-icon>
      </v-subheader>

      <v-list dense>

        <v-list-item>
          <v-list-item-title>数据库</v-list-item-title>

          <v-list-item-icon>
            <v-badge
                    :content="messages"
                    :value="messages"
                    color="green"
                    overlap
            >
              <!-- <v-icon>mdi-book</v-icon>-->
            </v-badge>
          </v-list-item-icon>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>java</v-list-item-title>

          <v-list-item-icon>
            <v-badge
                    :content="messages"
                    :value="messages"
                    color="green"
                    overlap
            >
              <!-- <v-icon>mdi-book</v-icon>-->
            </v-badge>
          </v-list-item-icon>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-subheader class="mb-0" style="height: 32px">
        <v-icon>mdi-tag</v-icon>
      </v-subheader>

      <v-row class="ml-3 mt-1 mb-1">
        <v-chip label
                x-small
                class="ma-1"
                :color="t.color"
                text-color="white"
                v-for="t in tags"
                :key="t.name">
          {{t.name}}
        </v-chip>
      </v-row>


    </v-navigation-drawer>

  </v-card>
</template>

<script>
  import SharedBlogs from "@/modules/blog/mixins/shared-blog"

  export default {
    name: "BlogGuide",

    mixins: [SharedBlogs],

    data() {
      return {
        messages: 44
      }
    },

    computed: {
      tags() {
        return this.isLoadedShared ? this.status.tags : []
      }
    }
  }
</script>

<style scoped>

</style>