<template>
  <el-container class="symbol-el-container" style="padding: 2rem 10rem 2rem 10rem">

    <el-main style="padding: 0;align-items: center;
    justify-content: space-between;
    display: flex;">

      <slide-y-up-transition :duration="1000" @afterEnter="hh">
        <el-container v-show="isShow">
          <el-header style="display: flex;align-items: center;justify-content: center;height: 8rem">
            <el-avatar style="width: 6rem;
    height: 6rem;
    line-height: 6rem;" src="https://avatars3.githubusercontent.com/u/21330518?s=60&u=13697a46d7d432b5eedb5cefb1d7ec57c8806f5e&v=4"></el-avatar>
          </el-header>
          <el-main style="text-align: center;line-height: 10rem;">
            <h1 style="font-size: 2.25rem;
    letter-spacing: 0.5rem;margin: 0 0 1rem 0;
    text-transform: uppercase;color: #ffffff;
    font-weight: 600;">XyParaCrim</h1>
          </el-main>
          <el-footer style="display: flex; align-items: center; justify-content: center; margin-top: 4rem">
            <el-button-group>
              <coverflow :coverList="coverList" :coverWidth="100" :index="2"></coverflow>
            </el-button-group>
          </el-footer>
        </el-container>
      </slide-y-up-transition>

    </el-main>
    <el-footer style="text-align: center;height: 1rem;letter-spacing: 0.2rem;line-height: 1rem;
    font-size: 0.6rem;
    opacity: 0.75;
    text-transform: uppercase;color: #ffffff;
}">Copyright (c) 2019 excellent-cancer</el-footer>

  </el-container>
</template>

<script>
  import reactor from '../assets/react.png'
  import vue from '../assets/vue.png'
  import webpack from '../assets/webpack.png'
  import yarn from '../assets/Yarn.png'
  import node from '../assets/nodejs.png'

  export default {
    name: "Symbol",
    props: {
      isShow: Boolean
    },

    data () {
      return {
        show: false,
        coverList: [
          {
            cover: reactor,
            title: 'React'
          }, {
            cover: vue,
            title: 'Vue'
          }, {
            cover: webpack,
            title: 'Webpack'
          }, {
            cover: yarn,
            title: 'Yarn'
          }, {
            cover: node,
            title: 'Node'
          }
        ]
      }
    },
    mounted() {
      window.xx = () => this.show = !this.show;
    },

    methods: {
      hh() {
        this.$emit('hh')
      }
    }
  }
</script>

<style scoped>

/*  .el-header {
    background-color: #B3C0D1;
  }

  .el-footer {
    background-color: #5daf34;
  }

  .el-main {
    background-color: #E9EEF3;
  }*/
/*  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }*/

  .symbol-el-container {
    min-height: 100vh;
    z-index: 100;
  }

  .symbol-el-footer {
    transition: transform 0.325s ease-in-out, filter 0.325s ease-in-out, opacity 0.325s ease-in-out;
    width: 100%;
    max-width: 100%;
    margin-top: 2rem;
    text-align: center;
  }

  .symbol-el-header {
    display: flex;
    align-items: center;
    max-width: 100%;
    text-align: center;

  }

/*  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }*/
</style>