<template>

</template>

<template>
  <v-app id="app">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <h1> Header </h1>

      <img alt="Vue logo" src="./assets/logo.png">

      <p> {{greetText}} </p>

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
