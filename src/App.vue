<template>
  <div id="app">

    <h1> Header </h1>

    <img alt="Vue logo" src="./assets/logo.png">

    <p>{{greetText}}</p>

    <p> <TypeButton :msg='greetText' @click="onTypeButtonClicked">konomi</TypeButton> </p>

    <p> <ResetButton v-model="greetText"></ResetButton> </p>

    <p> <ImagePlace></ImagePlace> </p>

  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import TypeButton from '@/components/TypeButton.vue';
  import ResetButton from '@/components/ResetButton.vue';
  import ImagePlace from '@/components/ImagePlace.vue';

  @Component({
    components: {
      TypeButton,
      ResetButton,
      ImagePlace,
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
