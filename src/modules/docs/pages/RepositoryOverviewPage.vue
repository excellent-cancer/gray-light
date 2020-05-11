<template>
  <div class="height"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <v-carousel height="100%"
                cycle
                show-arrows-on-hover>
      <v-carousel-item v-for="(item,i) in repositories"
                       :key="i"
                       :to="to(item.id)">
        <v-card>

          <div class="height">
            <div class="height background-x"></div>

            <div class="headline">
              <v-row justify="center" align="center">
                <v-col cols="6">
                  <v-row justify="center" align="center">
                    <v-card-title>{{item.title}}</v-card-title>
                  </v-row>
                  <v-row justify="center" align="center">
                    <v-card-subtitle>{{item.description}}</v-card-subtitle>
                  </v-row>
                </v-col>

              </v-row>
            </div>

          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </div>

</template>

<script>
  export default {
    name: "RepositoryOverviewPage",

    data() {
      return {
        repositories: [],
        repositoriesCount: 0,
        loading: true
      }
    },

    mounted() {
      const tokens = this.$tokens
      const requests = this.$requests

      requests.documentRepositoriesSet(tokens, 0, 10)
        .then(this.loadedRepositories)
        .catch(this.$message.error)
        .finally(this.loaded)
    },

    methods: {
      loadedRepositories(repositories) {
        this.repositories = repositories
      },
      loaded() {
        this.loading = false
      },
      to(id) {
        return `/document/chapter/${id}`
      }
    }
  }
</script>

<style scoped>

  .height {
    height: calc(100vh - 98px);
  }

  .background-x {
    display: flex;
    opacity: 0.3;
    background-image: url("../../../assets/31585071810_.pic_hd.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
  }

  .headline {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
  }
</style>