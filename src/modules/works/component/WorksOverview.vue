<template>

  <v-container v-if="isLoadedShared" style="padding-top: 0; padding-left: 50px">

    <v-toolbar color="elevation-0">

      <v-toolbar-title><h1>{{selectedWorks.name}}</h1></v-toolbar-title>

      <v-chip class="ma-2"
              color="green"
              text-color="black"
              label>
        {{selectedWorks.scope}}
      </v-chip>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 large
                 v-bind="attrs"
                 v-on="on"
                 color="black"
                 :href="selectedWorks.homePage"
                 target="_blank">
            <v-icon>mdi-github</v-icon>
          </v-btn>
        </template>
        <span>Github</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 large
                 v-bind="attrs"
                 v-on="on"
                 color="black"
                 :href="`${selectedWorks.homePage}/releases`"
                 target="_blank">
            <v-icon>mdi-format-list-checks</v-icon>
          </v-btn>
        </template>
        <span>Releases</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
                 large
                 v-bind="attrs"
                 v-on="on"
                 color="black"
                 :href="`${selectedWorks.homePage}/issues`"
                 target="_blank">
            <v-icon>mdi-bug</v-icon>
          </v-btn>
        </template>
        <span>Releases</span>
      </v-tooltip>

      <template v-slot:extension>
        <v-tabs v-model="tab"
                background-color="green lighten-5"
                color="light-green darken-4"
                active-class="white black--text"
                slider-size="4">
          <v-tab v-for="item in items"
                 :key="item.tab">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item key="概览">


        <v-card style="margin-top: 20px;" flat>
          <v-card-text><blockquote class="blockquote">{{selectedWorks.description}}</blockquote></v-card-text>

        </v-card>


      </v-tab-item>
      <v-tab-item key="文档库">

        <v-card style="margin-top: 20px;"
                v-for="d in docs"
                :key="d.id">
          <v-card-title>{{d.name}}</v-card-title>

          <v-card-text>
            {{d.description}}
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                       large
                       dark
                       v-bind="attrs"
                       v-on="on"
                       color="black"
                       :to="`/docs/${d.id}`">
                  <v-icon>mdi-book-open-page-variant</v-icon>
                </v-btn>
              </template>
              <span>Read</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon
                       large
                       v-bind="attrs"
                       v-on="on"
                       color="black"
                       :href="d.homePage"
                       target="_blank">
                  <v-icon>mdi-github</v-icon>
                </v-btn>
              </template>
              <span>Github</span>
            </v-tooltip>
          </v-card-actions>

        </v-card>

      </v-tab-item>
    </v-tabs-items>

  </v-container>

</template>

<script>

  import SharedWorks from "@/modules/works/mixins/shared-works"

  export default {

    mixins: [SharedWorks],

    computed: {
      selectedWorks() {
        return this.isLoadedShared ? this.status.getWorksSelectedItem() : null
      }
    },

    watch: {
      selectedWorks(value) {
        if (value != null && this.isLoadedShared) {
          this.$requests.fetchDocumentByWorks(value.id)
            .then(docs => this.docs = docs)
        }
      }
    },

    data: () => ({
      tab: null,
      items: [
        {tab: '概览'},
        {tab: '文档库'}
      ],
      docs: []
    }),
  }
</script>

<style scoped>

  @font-face {
    font-family: 'logo-font';
    src: url('../../../fonts/logo.ttf') format('TrueType'),
    url('../../../fonts/logo.woff') format('woff'),
    url('../../../fonts/logo.eot') format('embedded-opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  .header-logo {
    font-family: logo-font, serif;
    float: left;
    line-height: 3.4rem;
    font-size: 1.7rem;
  }

</style>