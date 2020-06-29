<template>
  <v-card height="fit-content">
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

      <v-subheader><v-icon>mdi-domain</v-icon></v-subheader>

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

      <v-subheader><v-icon>mdi-tag</v-icon></v-subheader>

      <v-chip label small
              class="ma-2"
              color="grey darken-4"
              text-color="white">
        Ranee
      </v-chip>

      <v-chip label small
              class="ma-2"
              color="grey lighten-4">
        Premium
      </v-chip>

      <v-chip label small
              class="ma-2"
              color="grey darken-4"
              text-color="white">
        Y
      </v-chip>

      <v-chip label small
              class="ma-2"
              color="grey lighten-4">
        Ye
      </v-chip>

      <v-chip label small
              class="ma-2"
              color="grey darken-4"
              text-color="white">
        Confirmed
      </v-chip>

      <v-chip label small
              class="ma-2"
              color="grey lighten-4">
        Confirmed
      </v-chip>

      <!--    <v-card
                  class="mx-auto"
                  max-width="344"
          >
            <v-card-text>
              <div>Word of the Day</div>
              <p class="display-1 text&#45;&#45;primary">
                be•nev•o•lent
              </p>
              <p>adjective</p>
              <div class="text&#45;&#45;primary">
                well meaning and kindly.<br>
                "a benevolent smile"
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                      text
                      color="deep-purple accent-4"
              >
                Learn More
              </v-btn>
            </v-card-actions>
          </v-card>-->

      <!--    <v-list nav dense>
            <v-list-item-group v-model="i">
              <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      link
                      active-class="white&#45;&#45;text black">
                <v-list-item-content>
                  <v-list-item-title style="    font-size: 15px;
          font-weight: 700;">{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>-->
    </v-navigation-drawer>

  </v-card>
</template>

<script>
  export default {
    name: "BlogGuide",
    data() {
      return{
        messages: 44,
        item: 0,
        items: [
          { text: 'My Files', icon: 'mdi-folder' },
          { text: 'Shared with me', icon: 'mdi-account-multiple' },
          { text: 'Starred', icon: 'mdi-star' },
          { text: 'Recent', icon: 'mdi-history' },
          { text: 'Offline', icon: 'mdi-check-circle' },
          { text: 'Uploads', icon: 'mdi-upload' },
          { text: 'Backups', icon: 'mdi-cloud-upload' },
        ],
      }
    }
  }
</script>

<style scoped>

</style>