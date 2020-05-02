<template>
  <v-app id="app">
    <Navigation/>

    <v-content>
      <TypeButton :msg='greetText' @click="onTypeButtonClicked">
      </TypeButton> 

      <ResetButton v-model="greetText"/>

      <ImagePlace/>
    </v-content>

  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
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
    },
  })
  export default class App extends Vue {

    public colums: any = null;
    private yaml_url: string = '@/data.yaml';
    public greetText: string = "Hello";

    public onTypeButtonClicked(){
        this.greetText = "こんにちは";
    }

    public created(){
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
