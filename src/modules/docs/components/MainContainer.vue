<template>
  <el-main class="layout-main-wrapper">

    <markdown-it-vue class="main-markdown" :content="source" />

    <footer class="main-markdown-footer main-item">

      <div class="main-markdown-footer-message">

        <span style="font-weight: 500;
    color: #3eaf7c;">Last Updated: </span>
        <span style="font-weight: 400;color: #aaa;">2020-3-17 20:54:07</span>
        <el-divider direction="vertical"></el-divider>
        <span style="font-weight: 500;
    color: #3eaf7c;">Last Updated: </span>
        <span style="font-weight: 400;color: #aaa;">2020-3-17 20:54:07</span>
      </div>

    </footer>

    <el-divider class="main-item"></el-divider>

    <div class="main-item" style="padding-top: 1rem">
      <el-button  type="text" icon="el-icon-arrow-left">上一页</el-button>
      <el-button style="float: right" type="text">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
    </div>
  </el-main>
</template>

<script>

  export default {
    name: "MainContainer",

    props: {
      source: String
    },
  }
</script>

<style scoped>
  .layout-main-wrapper {
    padding: 0 0 2rem 20rem;
    display: block;
  }

  .main-markdown {
    max-width: 740px;padding: 2rem 2.5rem;margin: 4.6rem auto 0;
  }

  .main-markdown-footer {
    padding-top: 1rem;
    padding-bottom: 1rem;
    overflow: auto;
  }

  .main-markdown-footer-message {
    float: right;
    font-size: .9em;
  }

  .main-item {
    max-width: 740px;
    margin: 0 auto;
  }

</style>