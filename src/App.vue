<template>
  <v-app id="app">
    <Navigation/>

    <v-content>
      <TypeButton :msg='greetText' @click="onTypeButtonClicked">
        konomi
      </TypeButton> 

      <ResetButton v-model="greetText"/>

      <ImagePlace/>
    </v-content>

  </v-app>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TypeButton from '@/components/TypeButton.vue';
  import ResetButton from '@/components/ResetButton.vue';
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
    public greetText: string = "Hello";

    public onTypeButtonClicked(){
        this.greetText = "こんにちは";
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
