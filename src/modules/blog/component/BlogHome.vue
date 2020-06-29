<template>
  <v-container>

    <v-card style="margin-bottom: 10px" class="mx-auto">

      <v-card-title><a style="text-decoration: underline;color: black;">Word of the Day</a></v-card-title>
      <v-card-text>
        well meaning and kindly."a benevolent smile"
      </v-card-text>


      <v-divider></v-divider>

      <v-card-actions>

        <v-chip color="transparent">
          <v-icon left>mdi-clock</v-icon>
          2018年09月25日
        </v-chip>

        <v-chip color="transparent">
          <v-icon left>mdi-eye</v-icon>
          115次
        </v-chip>

        <v-chip color="transparent">
          <v-icon left>mdi-tag</v-icon>
          java、js
        </v-chip>
      </v-card-actions>
    </v-card>

    <v-pagination style="margin-top: 20px"
            v-model="page"
            :length="6">
    </v-pagination>

  </v-container>
</template>

<script>
  export default {
    name: "BlogHome",
    data() {
      return {
        page: 1
      }
    }
  }
</script>

<style scoped>

</style>