<template>
  <el-container>

    <div class="repositories">

      <el-row v-for="(repo, i) in repositories"
              :key="i"
              v-infinite-scroll="load"
              infinite-scroll-disabled="disabled"
              style="margin-bottom: 2rem"
              type="flex"
              justify="center">

        <el-col :span="12">
          <el-card>
            <template v-if="repo.description != null">
              <div slot="header" class="clearfix">
                <el-button @click="forwardDocumentPage(repo)" style="padding: 3px 0" type="text">{{repo.title}}
                </el-button>
              </div>
              <p>{{repo.description}}</p>
            </template>
            <template v-else>
              <div class="clearfix">
                <el-button @click="forwardDocumentPage(repo)" style="padding: 3px 0" type="text">{{repo.title}}
                </el-button>
              </div>
            </template>
          </el-card>
        </el-col>

      </el-row>

    </div>

    <el-footer style="float: bottom; text-align: center">
      <i v-if="loading" class="el-icon-loading"></i>
    </el-footer>

    <el-backtop></el-backtop>

  </el-container>
</template>

<script>
  import 'animate.css'

  export default {
    name: "RepositoriesContainer",

    data() {
      return {
        headerItems: [],
        countPerLoad: this.$settings.getSettingOrDefault("document-repository.loadPerLoad", 10),
        loading: false,
        repositories: [],
        repositoriesCount: 0,
        loadFailed: false
      }
    },

    computed: {
      noMore() {
        return this.repositoriesCount >= 20 || this.loadFailed
      },
      disabled() {
        return this.loading || this.noMore
      }
    },

    mounted() {
      if (this.repositoriesCount === 0) {
        this.load()
      }
    },

    methods: {
      load() {
        this.loading = true
        const requests = this.$requests

        requests.documentRepositoriesSet(this.$tokens, this.repositoriesCount + 1, this.countPerLoad)
          .then(this.loadedRepositories)
          .catch(this.failedRepositories)
          .finally(() => this.loading = false)
      },
      loadedRepositories(repositories) {
        for (let repo of repositories) {
          this.repositories.push({...repo})
        }
        this.repositoriesCount++
      },
      failedRepositories(e) {
        this.loadFailed = true
        this.$message.error(e)
      },
      forwardDocumentPage(repo) {
        this.$router.push({path: `/document/${repo.id}`})
      }
    }
  }
</script>

<style scoped>

  .repositories {
    overflow: auto;
    padding-top: 4.6rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>