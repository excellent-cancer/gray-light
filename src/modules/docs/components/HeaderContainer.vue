<!-- header容器组件：输入需要的组件进行展示 -->

<script>

  export default {
    name: "HeaderContainer",

    props: {
      // 需要在header展示的组件
      items: Array
    },

    render() {
      return (
        <el-header height="3.4rem" class="layout-header-wrapper">
          <div class="header-container">
            <ul class="header-nav-items">
              {this.items.map(item => <li class="header-nav-item">{item}</li>)}
            </ul>
          </div>
        </el-header>
      )
    }
  }
</script>
<style scoped>

  .header-nav-item {
    float: left;
    list-style: none;
    position: relative;
    margin: 0 0 0 0.5rem;
  }

  .header-nav-items {
    float: right;
    line-height: 3.2rem;
    background: transparent;
    padding: 0;
    margin: 0;
  }

  .layout-header-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    right: 0;
    height: 3.6rem;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
  }

  .header-container {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: .9rem;
    position: absolute;
    right: 1.5rem;
    display: flex;
    height: 100%;
    background-color: #fff;
  }
</style>