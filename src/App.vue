<template>
  <v-app id="app" dark>
    <Navigation :genre_list="genre_list" />

    <v-content>
      <v-container>
        <router-view></router-view>

        <!--
        <UploadPlace :upload_endpoint='base_endpoint + put_registe'/>
        <ImagePlace :urls='show_urls' />
        -->
      </v-container>
    </v-content>

  </v-app>
</template>

<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator';

  import { getAllGenre } from '@/common/Api';
  import Navigation from '@/components/Navigation.vue';

  @Component({
    components: {
      Navigation,
    },
  })

  export default class App extends Vue {
    private genre_list: string[] = new Array();

    @Watch('this.$route')
    onRouterChanged(to: string, from: string) {
      console.log(this.$route.params.genre)
    }

    public created(){
      this.genre_list = getAllGenre()
    }
  }

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
