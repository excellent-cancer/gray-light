<template>
  <el-container class="home-navigation-wrapper">

    <el-main class="home-navigation-main">

      <slide-y-up-transition :duration="1000" @afterEnter="played">
        <el-container v-show="play">

          <el-header class="home-navigation-avatar-wrapper">
            <el-avatar class="home-navigation-avatar" :src="avatar"></el-avatar>
          </el-header>

          <el-main class="home-navigation-show-wrapper">
            <h1 class="home-navigation-show">{{user}}</h1>
          </el-main>

          <el-footer class="home-navigation-menu-wrapper">
            <el-button-group>
              <coverflow :coverList="navItems"
                         :coverWidth="navItemWidth"
                         :index="navIndex"
                         @select="to">
              </coverflow>
            </el-button-group>
          </el-footer>

        </el-container>
      </slide-y-up-transition>

    </el-main>

    <el-footer class="home-navigation-footer">{{copyright}}</el-footer>

  </el-container>
</template>

<script>
  import playItem from '../../mixins/PlayItem'

  export default {

    mixins: [ playItem ],

    data() {
      const navItems = this.$settings.getSetting("nav.items")

      return {
        user: this.$settings.getSetting("user.name"),
        avatar: this.$settings.getSetting("user.avatar"),
        copyright: this.$settings.getSetting("user.copyright"),
        duration: this.$settings.getSettingOrDefault("nav.duration", 2000),
        navItems: navItems,
        navIndex: ~~(navItems.length/2),
        navItemWidth: this.$settings.getSettingOrDefault("nav.width", 200)
      }
    },

    methods: {
      to(index) {
        const navItem = this.navItems[index];
        if (navItem.disable) {
          this.showUnsupportedFeatureMessage(navItem)
        } else {
          this.$router.push(navItem.to)
        }
      },

      showUnsupportedFeatureMessage(navItem) {
        this.$message.error({
          message: `${navItem.title}尚未支持，敬请期待`,
          duration: 1000,
          showClose: true
        })
      }
    }
  }
</script>

<style scoped>
  .home-navigation-wrapper {
    z-index: 100;
    min-height: 100vh;
    padding: 2rem 10rem 2rem 10rem;
  }

  .home-navigation-footer {
    text-align: center;
    height: 1rem;
    letter-spacing: 0.2rem;
    line-height: 1rem;
    font-size: 0.6rem;
    opacity: 0.75;
    text-transform: uppercase;
    color: #ffffff;
  }

  .home-navigation-main {
    padding: 0;
    align-items: center;
    justify-content: space-between;
    display: flex;
    overflow: hidden;
  }

  .home-navigation-avatar-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8rem
  }

  .home-navigation-avatar {
    z-index: 3;
    width: 6rem;
    height: 6rem;
    line-height: 6rem;
  }

  .home-navigation-show-wrapper {
    text-align: center;
    line-height: 10rem;
    overflow: hidden;
  }

  .home-navigation-show {
    font-family: logo-font,serif;
    font-size: 5rem;
    letter-spacing: 0.5rem;
    color: #ffffff;
    font-weight: 600;
  }

  .home-navigation-menu-wrapper {
    display: flex; align-items: center; justify-content: center; margin-top: 4rem
  }
  @font-face {
    font-family: 'logo-font';
    src: url('../../fonts/logo.ttf') format('TrueType'),
    url('../../fonts/logo.woff') format('woff'),
    url('../../fonts/logo.eot') format('embedded-opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
</style>