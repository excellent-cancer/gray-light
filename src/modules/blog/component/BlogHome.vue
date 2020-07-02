<template>
  <v-container v-if="isLoadedShared">

    <v-card style="margin-bottom: 10px"
            class="mx-auto"
            v-for="blog in blogs"
            :key="blog.blog.id">

      <v-card-title>
        <a style="text-decoration: underline;color: black;" @click="to(blog.blog.id)">
          {{blog.blog.title}}
        </a>
      </v-card-title>

      <v-card-text>
        well meaning and kindly."a benevolent smile"
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>

        <v-icon class="mr-1">mdi-clock</v-icon>
        <span class="subheading mr-4">{{date(blog.blog.updatedDate)}}</span>

        <!--        <v-icon class="mr-1">mdi-eye</v-icon>

                <span class="subheading mr-4 text&#45;&#45;primary">115</span>-->

        <template v-if="blog.tags.length > 0">
          <v-icon class="mr-1">mdi-tag</v-icon>

          <v-chip label
                  x-small
                  class="ml-1"
                  :color="t.color"
                  text-color="white"
                  v-for="t in blog.tags"
                  :key="t.name">
            {{t.name}}
          </v-chip>
          <!--<span class="subheading">{{blog.tags.map(t => t.name).join("、")}}</span>-->
        </template>

      </v-card-actions>
    </v-card>

    <v-pagination style="margin-top: 20px"
                  @next="next"
                  @input="input"
                  @previous="previous"
                  :total-visible="7"
                  v-model="page"
                  :length="total">
    </v-pagination>

  </v-container>
</template>

<script>
  import SharedWorks from "@/modules/works/mixins/shared-works"

  export default {
    name: "BlogHome",

    mixins: [SharedWorks],

    data() {
      return {
        page: 1
      }
    },

    computed: {
      total() {
        return this.isLoadedShared ? this.status.blogPages : 0
      },
      blogs() {
        return this.isLoadedShared ? this.status.blogs : []
      }
    },

    methods: {
      to(id) {
        this.$router.push({ path: `/blog/${id}` })
      },

      next() {

      },
      input(value) {
        if (this.isLoadedShared) {
          this.status.resetBlog(value)
        }
      },
      previous() {

      },

      date(time) {
        let date = new Date(time)

        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDay()

        return year + "-" + (month < 10 ? "0" + month : month) + "-" + (day < 10 ? "0" + day : day)
      }
    }
  }
</script>

<style scoped>

</style>