<template>
  <v-app id="app" dark>
    <Navigation :genre_list="genre_list" v-model="selected_genre"/>

    <v-content>
      <v-container>
        {{ selected_genre }}

        <UploadPlace v-if="is_upload==true" :upload_endpoint='base_endpoint + put_registe'/>

        <ImagePlace v-if="is_upload==false" :urls='show_urls' />
      </v-container>
    </v-content>

  </v-app>
</template>

<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator';

  import axios from 'axios';

  import UploadPlace from '@/components/UploadPlace.vue';
  import ImagePlace from '@/components/ImagePlace.vue';
  import Navigation from '@/components/Navigation.vue';

  @Component({
    components: {
      UploadPlace,
      ImagePlace,
      Navigation,
    },
  })

  export default class App extends Vue {
    private base_endpoint:  string = 'https://img-database.herokuapp.com/'
    //private base_endpoint:  string = 'http://localhost:8080/'
    //private base_endpoint:  string = 'https://img-database.herokuapp.com/'

    private get_all_image:  string = 'all_image'
    private get_image:      string = 'images'
    private get_all_genre:  string = 'all_genre'
    private put_registe:    string = 'registe'

    private show_urls: string[] = new Array();
    private genre_list: string[] = new Array();

    public is_upload: boolean = false
    public selected_genre: ( string | null ) = null

    private getAllImageUrl() {
      var urls = new Array();
      axios.get(this.base_endpoint + this.get_all_image)
      .then(res => {
        if (res.status === 200) {
          for (var i in res.data) {
            urls.push( res.data[i]['url'] )
          }
        }
      })
      .catch(error => {
          console.log(error);
      })
      return urls
    }

    private getImageUrl(attribute: string) {
      var urls = new Array();
      axios.get(this.base_endpoint + this.get_image, {
        params: {
          primary: attribute
        }
      })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          for (var i in res.data) {
            urls.push( res.data[i]['url'] )
          }
        }
      })
      .catch(error => {
          console.log(error);
      })
      return urls
    }

    private getAllGenre() {
      var genres = new Array()
      axios.get(this.base_endpoint + this.get_all_genre)
      .then(res => {
        if (res.status === 200) {
          for (var i in res.data) {
            genres.push( res.data[i]['Extracted'] )
          }
        }
      })
      .catch(error => {
          console.log(error);
      })
      return genres
    }

    @Watch('selected_genre')
    onTextChanged(new_selected: string, oldText: string) {
      this.show_urls = this.getImageUrl(new_selected)
    }

    public created(){
      this.show_urls = this.getAllImageUrl()
      this.genre_list = this.getAllGenre()
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
