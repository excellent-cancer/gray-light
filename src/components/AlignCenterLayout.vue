<template>
  <v-app>

    <!-- header容器组件：输入需要的组件进行展示 -->
    <v-app-bar app clipped-right clipped-left>

      <v-container class="pa-0 d-flex align-center">
        <!-- logo位 -->
        <v-toolbar-title class="header-logo"
                         @click="$router.push('/')"
                         v-text="user">
        </v-toolbar-title>

        <v-spacer></v-spacer>

      </v-container>

    </v-app-bar>


    <v-content>
      <v-container style="margin-top: 40px" class="d-flex justify-space-between">
        <router-view name="left"></router-view>
        <router-view></router-view>
        <router-view name="right"></router-view>
      </v-container>
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
    name: "AlignCenterLayout",
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
    src: url('../fonts/logo.ttf') format('TrueType'),
    url('../fonts/logo.woff') format('woff'),
    url('../fonts/logo.eot') format('embedded-opentype');
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