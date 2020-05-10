<template>
  <v-app id="app">
    <Navigation :genre_list="genre_list" v-model="selected_genre"/>

    <v-content>
      <vue-dropzone v-if="dropzoneOptions" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

      {{ selected_genre }}

      <TypeButton :msg='greetText' @click="onTypeButtonClicked">
      </TypeButton> 
      <!--
      <UploadPage :upload_url='registe_url'/>
      -->

      <ResetButton v-model="greetText"/>

      <ImagePlace :urls='show_urls' />
    </v-content>

  </v-app>
</template>

<script lang="ts">
  import { Component, Watch, Vue } from 'vue-property-decorator';

  import axios from 'axios';
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'

  import ResetButton from '@/components/ResetButton.vue';
  import TypeButton from '@/components/TypeButton.vue';
  import ImagePlace from '@/components/ImagePlace.vue';
  import Navigation from '@/components/Navigation.vue';

  @Component({
    components: {
      TypeButton,
      ResetButton,
      ImagePlace,
      Navigation,
      vueDropzone: vue2Dropzone,
    },
  })

  export default class App extends Vue {
    //private base_endpoint:  string = 'https://img-database.herokuapp.com/'
    private base_endpoint:  string = 'http://localhost:8080/'
    //private base_endpoint:  string = 'https://img-database.herokuapp.com/'

    private get_all_image:  string = 'all_image'
    private get_image:      string = 'images'
    private get_all_genre:  string = 'all_genre'
    private put_registe:    string = 'registe'

    private show_urls: string[] = new Array();
    private genre_list: string[] = new Array();

    public selected_genre: ( string | null ) = null

    public character: ( string | null ) = null
    public attributes: ( string | null )[] = ["あいさつ", null, null] 

    public registe_url: string = this.base_endpoint + this.put_registe + '?character=' + this.character + '&primary=' + this.attributes[0] + '&secondary=' + this.attributes[1] + '&tertiary=' + this.attributes[2]
    // paramName: 'hoge'
    //params: {"attributes": this.attributes}
    //
    public dropzoneOptions: any = {
      url: this.registe_url,
      method: 'put',
      maxFilesize: 5,
    }

    public colums: any = null;
    public greetText: string = "Hello";

    public onTypeButtonClicked(){
        this.greetText = "こんにちは";
    }

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
      //this.show_urls = this.getAllImageUrl()
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
  margin-top: 60px;
}
</style>
