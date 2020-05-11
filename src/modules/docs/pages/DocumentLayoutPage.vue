<template>
  <v-app>

    <!-- header容器组件：输入需要的组件进行展示 -->
    <v-app-bar app clipped-right clipped-left>

      <!-- logo位 -->
      <v-toolbar-title class="header-logo"
                       @click="$router.push('/')"
                       v-text="user">
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>

      <v-btn icon large>
        <v-avatar size="32px" item>
          <v-img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="Vuetify"></v-img>
        </v-avatar>
      </v-btn>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

    </v-app-bar>

    <router-view name="left"></router-view>

    <router-view name="right"></router-view>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app padless height="32px">
      <v-col class="text-center" style="padding: 4px 0 4px 0" cols="12" >
        {{ new Date().getFullYear() }} — <strong>{{organization}}</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: "DocumentLayout",
    data() {
      return {
        user: this.$settings.getSetting("user.name"),
        avatar: this.$settings.getSetting("user.avatar"),
        copyright: this.$settings.getSetting("user.copyright"),
        organization: this.$settings.getSetting("user.organization")
      }
    }
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