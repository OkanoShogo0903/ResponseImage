<template>
  <v-app id="app">
    <Navigation/>

    <v-content>
      <TypeButton :msg='greetText' @click="onTypeButtonClicked">
      </TypeButton> 

      <ResetButton v-model="greetText"/>
      <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

      <ImagePlace :urls='show_urls' />
    </v-content>

  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import axios from 'axios';
  import vue2Dropzone from 'vue2-dropzone';
  import 'vue2-dropzone/dist/vue2Dropzone.min.css';

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
    private get_all_image:  string = 'all_image'
    private get_image:      string = 'images'
    private put_registe:    string = 'registe'

    private show_urls: string[] = new Array();

    public character: ( string | null ) = null
    public attributes: ( string | null )[] = ["あいさつ", null, null] 

    private dropzoneOptions: any = {
      url: 'http://localhost:8080/' + this.put_registe + '?character=' + this.character + '&primary=' + this.attributes[0] + '&secondary=' + this.attributes[1] + '&tertiary=' + this.attributes[2],
      method: 'put'
    }
    // paramName: 'hoge'
    //params: {"attributes": this.attributes}

    public colums: any = null;
    public greetText: string = "Hello";

    public onTypeButtonClicked(){
        this.greetText = "こんにちは";
    }

    private getAllImage() {
      axios.get(this.base_endpoint + this.get_all_image)
      .then(res => {
        if (res.status === 200) {
          for (var i in res.data) {
            this.show_urls.push( res.data[i]['url'] )
          }
        }
      })
      .catch(error => {
          console.log(error);
      })
    }

    private getImage(attribute: string) {
      axios.get(this.base_endpoint + this.get_image, {
        params: {
          primary: attribute
        }
      })
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log(res.data)
          // res.data
        }
      })
      .catch(error => {
          console.log(error);
      })
    }

    public created(){
      // Get all image.
      //this.getImage('flatter')
      //this.getAllImage()

      //this.attributes = data
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
